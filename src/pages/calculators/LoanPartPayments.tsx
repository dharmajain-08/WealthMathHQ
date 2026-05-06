import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { 
  NumericInput, 
  InputSlider, 
  KpiCard, 
  Accordion, 
  Button 
} from '../../components/ui';
import { calculateLoanAmortization, formatCurrency, PartPayment } from '../../lib/calculations';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Home, Trash2, Plus, FileText, Download, PieChart as PieIcon } from 'lucide-react';
import { exportToExcel } from '../../lib/exports';

export const LoanPartPaymentsView = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [partPayments, setPartPayments] = useState<PartPayment[]>([]);
  const [benefitType, setBenefitType] = useState<'REDUCE_TENURE' | 'REDUCE_EMI'>('REDUCE_TENURE');
  const [newPPYear, setNewPPYear] = useState(1);
  const [newPPAmount, setNewPPAmount] = useState(100000);

  const result = useMemo(() => {
    return calculateLoanAmortization(loanAmount, interestRate, tenureYears, partPayments, benefitType);
  }, [loanAmount, interestRate, tenureYears, partPayments, benefitType]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#4f46e5' },
    { name: 'Interest', value: result.totalInterest, color: '#f97316' },
  ];

  const addPartPayment = () => {
    if (newPPYear > 0 && newPPAmount > 0) {
      setPartPayments(prev => [...prev, { year: newPPYear, amount: newPPAmount }].sort((a,b) => a.year - b.year));
    }
  };

  const removePP = (year: number) => {
    setPartPayments(prev => prev.filter(p => p.year !== year));
  };

  return (
    <CalculatorLayout
      title="Loan + Part Payments"
      description="Don't just pay EMIs. Track interest savings and see your loan tenure collapse through strategic prepayments."
      breadcrumb="Loan Part Payments"
      outputs={
        <div className="flex flex-col items-center">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                   <filter id="shadowLoan" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="2" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  filter="url(#shadowLoan)"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)} 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-2 w-full">
             <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Total Repayment</span>
                <span className="text-brand-navy font-black">{formatCurrency(loanAmount + result.totalInterest)}</span>
             </div>
          </div>
        </div>
      }
      inputs={
        <>
          <NumericInput 
            label="Loan Amount" 
            value={loanAmount} 
            onChange={setLoanAmount} 
            tooltip="The total initial principal amount borrowed."
          />
          <InputSlider 
            label="Interest Rate" 
            value={interestRate} 
            onChange={setInterestRate} 
            min={5} 
            max={18} 
            step={0.1} 
            tooltip="Annual interest rate (reducing balance) charged by the bank."
          />
          <InputSlider 
            label="Tenure (Years)" 
            value={tenureYears} 
            onChange={setTenureYears} 
            min={1} 
            max={30} 
            suffix=" yrs" 
            tooltip="The original duration of your loan in years."
          />
          
          <div className="pt-6 border-t border-brand-border">
            <h4 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">Benefit Strategy</h4>
            <div className="flex space-x-2">
              <button 
                onClick={() => setBenefitType('REDUCE_TENURE')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${benefitType === 'REDUCE_TENURE' ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-muted hover:bg-brand-border'}`}
              >
                Reduce Tenure
              </button>
              <button 
                onClick={() => setBenefitType('REDUCE_EMI')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${benefitType === 'REDUCE_EMI' ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-muted hover:bg-brand-border'}`}
              >
                Reduce EMI
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border">
             <h4 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">Manage Part Payments</h4>
             <div className="space-y-3 mb-4">
                {partPayments.map(pp => (
                   <div key={pp.year} className="flex justify-between items-center bg-brand-bg p-3 rounded-xl border border-brand-border">
                     <div>
                        <p className="text-[10px] font-bold text-brand-primary uppercase">End of Year {pp.year}</p>
                        <p className="text-sm font-black text-brand-navy">{formatCurrency(pp.amount)}</p>
                     </div>
                     <button onClick={() => removePP(pp.year)} className="p-2 text-brand-danger hover:bg-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-2 mb-2">
                <input 
                  type="number" 
                  placeholder="Year" 
                  value={newPPYear} 
                  onChange={e => setNewPPYear(Number(e.target.value))} 
                  className="bg-white border border-brand-border p-2 rounded-lg text-sm font-bold w-full"
                />
                <input 
                  type="number" 
                  placeholder="Amount" 
                  value={newPPAmount} 
                  onChange={e => setNewPPAmount(Number(e.target.value))} 
                  className="bg-white border border-brand-border p-2 rounded-lg text-sm font-bold w-full"
                />
             </div>
             <Button variant="secondary" className="w-full" icon={Plus} onClick={addPartPayment}>Add Part Payment</Button>
          </div>
        </>
      }
      kpiCards={
        <>
          <KpiCard 
            label="Monthly EMI" 
            value={formatCurrency(result.emi)} 
            description={benefitType === 'REDUCE_EMI' && partPayments.length > 0 ? "Reduced after payments" : "Base EMI amount"}
            variant="primary"
          />
          <KpiCard 
            label="Interest Saved" 
            value={formatCurrency(result.interestSaved)} 
            description="Pure wealth from prepay"
            variant="success"
          />
          <KpiCard 
            label="Loan Over In" 
            value={`${(result.monthsToClose / 12).toFixed(1)} Yrs`} 
            description={result.monthsToClose < tenureYears * 12 ? "Early closure achievement 🚀" : "Standard tenure"}
            variant="default"
          />
        </>
      }
      insightStrip={`By paying ${formatCurrency(partPayments.reduce((s,p)=>s+p.amount, 0))} in part-payments, you save ${formatCurrency(result.interestSaved)} in interest and close your loan ${(tenureYears - result.monthsToClose/12).toFixed(1)} years earlier than expected.`}
      charts={
        <ResponsiveContainer width="100%" height={400}>
           <BarChart data={result.schedule}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
             <XAxis 
               dataKey="year" 
               fontSize={11} 
               tick={{fill: '#64748b', fontWeight: 600}} 
               axisLine={false} 
               tickLine={false}
               dy={10}
             />
             <YAxis 
               tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} 
               fontSize={11} 
               tick={{fill: '#64748b', fontWeight: 600}} 
               axisLine={false} 
               tickLine={false}
             />
             <Tooltip 
               formatter={(val: number) => [formatCurrency(val), ""]}
               contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
               cursor={{ fill: 'rgba(79, 70, 225, 0.05)' }}
             />
             <Bar 
               name="Outstanding Balance"
               dataKey="balance" 
               fill="#4f46e5" 
               radius={[6, 6, 0, 0]}
               barSize={18}
               activeBar={{ fill: '#3730a3', stroke: '#4f46e5', strokeWidth: 1 }}
             />
             <Bar 
               name="Principal Paid"
               dataKey="principalPaid" 
               fill="#10b981" 
               radius={[6, 6, 0, 0]}
               barSize={18}
               activeBar={{ fill: '#065f46', stroke: '#10b981', strokeWidth: 1 }}
             />
             <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
           </BarChart>
        </ResponsiveContainer>
      }
      exports={(clientName) => (
        <>
          <Button 
            variant="secondary" 
            icon={Download} 
            onClick={() => exportToExcel({
              title: "Loan Repayment with Part Payments",
              clientName,
              summary: [
                { label: "Original Loan", value: formatCurrency(loanAmount) },
                { label: "Revised Tenure", value: `${(result.monthsToClose / 12).toFixed(1)} years` },
                { label: "Interest Saved", value: formatCurrency(result.interestSaved) },
                { label: "Total Interest Paid", value: formatCurrency(result.totalInterest) }
              ],
              tableHeaders: ["Month", "Year", "EMI", "Interest Paid", "Principal Paid", "Outstanding Balance", "Part Payment?"],
              tableData: result.monthlySchedule.map(row => [
                row.month,
                row.year,
                row.emi,
                row.interestPaid,
                row.principalPaid,
                row.balance,
                row.isPartPayment ? "Yes" : "No"
              ])
            })} 
            className="text-[10px]"
          >
            Excel Report
          </Button>
        </>
      )}
      details={
        <Accordion title="Monthly Amortization Schedule">
           <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-muted uppercase text-[10px] font-bold tracking-widest">
                      <th className="py-3 px-4">Month</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">EMI</th>
                      <th className="py-3 px-4">Interest</th>
                      <th className="py-3 px-4">Principal</th>
                      <th className="py-3 px-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.monthlySchedule.map((row) => (
                      <tr key={row.month} className={cn("border-b border-brand-bg hover:bg-brand-bg-alt transition-colors", row.isPartPayment && "bg-brand-bg")}>
                        <td className="py-3 px-4 font-bold">{row.month}</td>
                        <td className="py-3 px-4 text-xs text-brand-muted">Yr {row.year}</td>
                        <td className="py-3 px-4 text-brand-muted font-medium">{formatCurrency(row.emi)}</td>
                        <td className="py-3 px-4 text-brand-danger font-medium">{formatCurrency(row.interestPaid)}</td>
                        <td className="py-3 px-4 text-brand-secondary font-bold">
                          {formatCurrency(row.principalPaid)}
                          {row.isPartPayment && <span className="ml-2 inline-block px-1.5 py-0.5 bg-brand-primary text-white text-[8px] rounded uppercase">Prepaiyment</span>}
                        </td>
                        <td className="py-3 px-4 font-black text-brand-navy">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        </Accordion>
      }
    />
  );
};
