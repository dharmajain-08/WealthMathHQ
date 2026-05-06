/**
 * Financial calculation utilities for WealthMathHQ
 */

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

// 1. Compound Inflation
export const calculateCompoundInflation = (
  principal: number,
  monthlySIP: number,
  annualReturn: number,
  inflationRate: number,
  years: number,
  frequency: number = 12 // Compounding frequency per year
) => {
  const data = [];
  const r = annualReturn / 100;
  const i = inflationRate / 100;
  
  for (let year = 0; year <= years; year++) {
    // Principal growth with compounding
    const principalGrowth = principal * Math.pow(1 + r / frequency, frequency * year);
    
    // SIP growth
    let sipGrowth = 0;
    if (monthlySIP > 0 && year > 0) {
      const monthlyRate = r / 12;
      const totalMonths = year * 12;
      sipGrowth = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    }
    
    const nominalValue = principalGrowth + sipGrowth;
    const investedAmount = principal + monthlySIP * 12 * year;
    
    // Inflation adjustment: Fixing the zero inflation bug by ensuring we handle i=0
    const realValue = i === 0 ? nominalValue : nominalValue / Math.pow(1 + i, year);
    const wealthGained = nominalValue - investedAmount;
    
    data.push({
      year,
      nominalValue: Math.round(nominalValue),
      realValue: Math.round(realValue),
      investedAmount: Math.round(investedAmount),
      wealthGained: Math.round(wealthGained),
      inflationLoss: Math.round(nominalValue - realValue)
    });
  }
  
  return data;
};

// 2. Goal Planner
export const calculateGoalPlanner = (
  targetToday: number,
  currentSavings: number,
  expectedReturn: number,
  inflationRate: number,
  years: number
) => {
  const i = inflationRate / 100;
  const r = expectedReturn / 100;
  const monthlyRate = r / 12;
  const totalMonths = years * 12;
  
  const futureGoal = targetToday * Math.pow(1 + i, years);
  const futureSavings = currentSavings * Math.pow(1 + r, years);
  const shortfall = Math.max(0, futureGoal - futureSavings);
  
  let requiredSIP = 0;
  if (shortfall > 0 && monthlyRate > 0) {
    requiredSIP = shortfall * (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (1 + monthlyRate);
  } else if (shortfall > 0) {
    requiredSIP = shortfall / totalMonths;
  }

  const requiredLumpsum = shortfall / Math.pow(1 + r, years);
  
  const projections = [];
  for (let year = 0; year <= years; year++) {
     const currentCorpus = currentSavings * Math.pow(1 + r, year) + 
       (requiredSIP > 0 ? requiredSIP * ((Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate) * (1 + monthlyRate) : 0);
     const inflationAdjustedGoal = targetToday * Math.pow(1 + i, year);
     
     projections.push({
       year,
       corpus: Math.round(currentCorpus),
       target: Math.round(inflationAdjustedGoal)
     });
  }
  
  return {
    futureGoal,
    requiredSIP,
    requiredLumpsum,
    projections
  };
};

// 3. SIP Step-Up
export const calculateSIPStepUp = (
  initialSIP: number,
  annualStepUp: number,
  expectedReturn: number,
  years: number,
  inflationRate: number = 0
) => {
  const r = expectedReturn / 100 / 12;
  const s = annualStepUp / 100;
  let corpusStepUp = 0;
  let corpusFlat = 0;
  let totalInvestedStepUp = 0;
  const data = [];

  for (let year = 1; year <= years; year++) {
    const currentYearSIP = initialSIP * Math.pow(1 + s, year - 1);
    for (let month = 1; month <= 12; month++) {
      corpusStepUp = (corpusStepUp + currentYearSIP) * (1 + r);
      corpusFlat = (corpusFlat + initialSIP) * (1 + r);
      totalInvestedStepUp += currentYearSIP;
    }
    
    data.push({
      year,
      stepUpCorpus: Math.round(corpusStepUp),
      flatCorpus: Math.round(corpusFlat),
      investedStepUp: Math.round(totalInvestedStepUp),
      investedFlat: Math.round(initialSIP * 12 * year),
      realValue: Math.round(corpusStepUp / Math.pow(1 + inflationRate / 100, year))
    });
  }

  return data;
};

// 4. Loan Amortization with Part Payments
export interface PartPayment {
  year: number;
  amount: number;
}

export const calculateLoanAmortization = (
  loanAmount: number,
  interestRate: number,
  tenureYears: number,
  partPayments: PartPayment[],
  benefitType: 'REDUCE_TENURE' | 'REDUCE_EMI' = 'REDUCE_TENURE'
) => {
  const r = interestRate / 100 / 12;
  let currentTenureMonths = tenureYears * 12;
  let emi = loanAmount * r * Math.pow(1 + r, currentTenureMonths) / (Math.pow(1 + r, currentTenureMonths) - 1);
  
  let balance = loanAmount;
  let totalInterest = 0;
  let totalPaid = 0;
  let monthsCount = 0;
  const schedule: any[] = [];
  const monthlySchedule: any[] = [];
  
  // Base case (no part payments)
  const baseTotalInterest = (emi * currentTenureMonths) - loanAmount;

  while (balance > 0 && monthsCount < 600) { // Max 50 years to prevent infinite loops
    monthsCount++;
    const interest = balance * r;
    let principal = emi - interest;
    
    if (principal > balance) principal = balance;
    
    balance -= principal;
    totalInterest += interest;
    totalPaid += principal + interest;

    const currentEmi = emi;

    monthlySchedule.push({
      month: monthsCount,
      year: Math.ceil(monthsCount / 12),
      balance: Math.round(balance),
      principalPaid: Math.round(principal),
      interestPaid: Math.round(interest),
      emi: Math.round(currentEmi)
    });

    // Check for part payment in this month (end of year)
    if (monthsCount % 12 === 0 || balance <= 0) {
      const year = Math.ceil(monthsCount / 12);
      const pp = partPayments.find(p => p.year === year);
      
      if (pp && balance > 0) {
        const actualPP = Math.min(pp.amount, balance);
        balance -= actualPP;
        totalPaid += actualPP;
        
        // Record part payment in monthly schedule
        const lastEntry = monthlySchedule[monthlySchedule.length - 1];
        lastEntry.principalPaid += Math.round(actualPP);
        lastEntry.isPartPayment = true;

        if (benefitType === 'REDUCE_EMI' && balance > 0) {
          const remainingMonths = currentTenureMonths - monthsCount;
          if (remainingMonths > 0) {
            emi = balance * r * Math.pow(1 + r, remainingMonths) / (Math.pow(1 + r, remainingMonths) - 1);
          }
        }
      }
      
      schedule.push({
        year,
        balance: Math.round(balance),
        principalPaid: Math.round(totalPaid - totalInterest),
        interestPaid: Math.round(totalInterest),
        emi: Math.round(emi)
      });
    }

    if (balance <= 0) break;
  }

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    baseTotalInterest: Math.round(baseTotalInterest),
    interestSaved: Math.round(baseTotalInterest - totalInterest),
    monthsToClose: monthsCount,
    schedule,
    monthlySchedule
  };
};

// 5. SWP (Systematic Withdrawal Plan)
export const calculateSWP = (
  initialCorpus: number,
  monthlyWithdrawal: number,
  expectedReturn: number,
  withdrawalIncrease: number // Annual increase in withdrawal %
) => {
  const r = expectedReturn / 100 / 12;
  const s = withdrawalIncrease / 100;
  let balance = initialCorpus;
  let totalWithdrawn = 0;
  let currentWithdrawal = monthlyWithdrawal;
  const schedule = [];

  for (let year = 1; year <= 40; year++) {
    let yearWithdrawn = 0;
    let yearReturn = 0;
    
    for (let month = 1; month <= 12; month++) {
      const interest = balance * r;
      yearReturn += interest;
      balance = balance + interest - currentWithdrawal;
      yearWithdrawn += currentWithdrawal;
      totalWithdrawn += currentWithdrawal;
      
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }
    
    schedule.push({
      year,
      openingBalance: Math.round(balance + yearWithdrawn - yearReturn),
      returnEarned: Math.round(yearReturn),
      withdrawn: Math.round(yearWithdrawn),
      closingBalance: Math.round(balance)
    });
    
    if (balance <= 0) break;
    currentWithdrawal *= (1 + s);
  }

  return {
    totalWithdrawn: Math.round(totalWithdrawn),
    yearsLasted: schedule.length,
    schedule
  };
};

// 6. FD & RD
export const calculateFixedDeposit = (
  principal: number,
  rate: number,
  tenureYears: number,
  compoundingFrequency: number = 4 // Quarterly by default
) => {
  const r = rate / 100;
  const n = compoundingFrequency;
  const maturityValue = principal * Math.pow(1 + r/n, n * tenureYears);
  const totalInterest = maturityValue - principal;
  const effectiveYield = (Math.pow(maturityValue / principal, 1/tenureYears) - 1) * 100;
  
  const schedule = [];
  for (let y = 1; y <= tenureYears; y++) {
    const v = principal * Math.pow(1 + r/n, n * y);
    schedule.push({
      year: y,
      maturityValue: Math.round(v),
      interest: Math.round(v - principal)
    });
  }

  return {
    maturityValue: Math.round(maturityValue),
    totalInterest: Math.round(totalInterest),
    effectiveYield,
    schedule
  };
};

export const calculateRecurringDeposit = (
  monthlyDeposit: number,
  rate: number,
  tenureYears: number
) => {
  const r = rate / 100 / 4; // FD/RD usually quarterly compounding in India
  const n = tenureYears * 12;
  
  // Simple approximation for RD maturity used by many banks: 
  // M = P * ( (1+i)^n - 1 ) / ( 1 - (1+i)^(-1/3) ) 
  // But a more standard way is summing monthly growths
  let maturityValue = 0;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = tenureYears * 12;
  const invested = monthlyDeposit * totalMonths;
  
  for (let i = 1; i <= totalMonths; i++) {
    maturityValue += monthlyDeposit * Math.pow(1 + rate/100/4, 4 * (totalMonths - i + 1)/12);
  }

  const totalInterest = maturityValue - invested;
  
  return {
    maturityValue: Math.round(maturityValue),
    totalInvested: invested,
    totalInterest: Math.round(totalInterest),
  };
};

// 7. CAGR Reverse
export const calculateCAGRReverse = (
  currentAmount: number,
  targetAmount: number,
  years: number
) => {
  const cagr = (Math.pow(targetAmount / currentAmount, 1 / years) - 1) * 100;
  
  const schedule = [];
  for (let y = 0; y <= years; y++) {
    schedule.push({
      year: y,
      requiredValue: Math.round(currentAmount * Math.pow(1 + cagr/100, y)),
      equityValue: Math.round(currentAmount * Math.pow(1.12, y)),
      fdValue: Math.round(currentAmount * Math.pow(1.07, y))
    });
  }
  
  return {
    cagr,
    schedule
  };
};

// 8. EMI vs Invest
export const calculateEMIvsInvest = (
  outstandingLoan: number,
  loanRate: number,
  remainingTenureYears: number,
  extraAmount: number,
  investmentReturn: number
) => {
  // Option A: Prepay Loan
  const loanR = loanRate / 100 / 12;
  const n = remainingTenureYears * 12;
  const emi = outstandingLoan * loanR * Math.pow(1 + loanR, n) / (Math.pow(1 + loanR, n) - 1);
  
  // New tenure after prepayment
  let balance = outstandingLoan - extraAmount;
  let monthsCount = 0;
  let totalInterestWithPrepay = 0;
  while (balance > 0 && monthsCount < n) {
    monthsCount++;
    const interest = balance * loanR;
    const principal = emi - interest;
    balance -= Math.min(principal, balance);
    totalInterestWithPrepay += interest;
  }
  
  const originalTotalInterest = (emi * n) - outstandingLoan;
  const interestSaved = originalTotalInterest - totalInterestWithPrepay;
  
  // Option B: Invest Extra Amount
  const investR = investmentReturn / 100;
  const futureValueInvestment = extraAmount * Math.pow(1 + investR, remainingTenureYears);
  
  return {
    originalTotalInterest: Math.round(originalTotalInterest),
    interestSaved: Math.round(interestSaved),
    futureValueInvestment: Math.round(futureValueInvestment),
    netGainInvest: Math.round(futureValueInvestment - interestSaved)
  };
};

// 9. FIRE Number
export const calculateFIRENumber = (
  monthlyExpenses: number,
  inflationRate: number,
  expectedReturn: number,
  swr: number,
  currentAge: number,
  retirementAge: number,
  currentSavings: number
) => {
  const yearsToRetire = retirementAge - currentAge;
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
  const fireCorpus = (futureMonthlyExpenses * 12) / (swr / 100);
  
  // Required SIP to reach fireCorpus
  const r = expectedReturn / 100 / 12;
  const n = yearsToRetire * 12;
  const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetire);
  const shortfall = Math.max(0, fireCorpus - futureValueOfSavings);
  
  let requiredSIP = 0;
  if (shortfall > 0 && r > 0) {
    requiredSIP = shortfall * (r / (Math.pow(1 + r, n) - 1)) / (1 + r);
  } else if (shortfall > 0) {
    requiredSIP = shortfall / n;
  }

  return {
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses),
    fireCorpus: Math.round(fireCorpus),
    requiredSIP: Math.round(requiredSIP),
    yearsToRetire
  };
};
