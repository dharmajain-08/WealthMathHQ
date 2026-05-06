import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { NumericInput, InputSlider, KpiCard, Button } from '../../components/ui';
import { calculateFIRENumber, formatCurrency } from '../../lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame } from 'lucide-react';

export const FIRENumberView = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [swr, setSwr] = useState(4);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(50);
  const [currentSavings, setCurrentSavings] = useState(500000);

  const result = useMemo(() => {
    return calculateFIRENumber(monthlyExpenses, inflationRate, expectedReturn, swr, currentAge, retirementAge, currentSavings);
  }, [monthlyExpenses, inflationRate, expectedReturn, swr, currentAge, retirementAge, currentSavings]);

  return (
    <CalculatorLayout
      title="FIRE Number"
      description="Estimate the corpus and monthly investment needed to retire early and live off your portfolio indefinitely."
      breadcrumb="FIRE"
      inputs={<>
        <NumericInput label="Current Monthly Expense" value={monthlyExpenses} onChange={setMonthlyExpenses} />
        <InputSlider label="Inflation Rate (%)" value={inflationRate} onChange={setInflationRate} min={0} max={12} />
        <InputSlider label="Safe Withdrawal Rate (%)" value={swr} onChange={setSwr} min={2} max={6} step={0.1} />
        <div className="grid grid-cols-2 gap-4">
           <NumericInput label="Current Age" value={currentAge} onChange={setCurrentAge} prefix="" suffix="yrs" />
           <NumericInput label="FIRE Age" value={retirementAge} onChange={setRetirementAge} prefix="" suffix="yrs" />
        </div>
        <NumericInput label="Current Savings" value={currentSavings} onChange={setCurrentSavings} />
        <InputSlider label="Pre-Retirement Return (%)" value={expectedReturn} onChange={setExpectedReturn} min={4} max={18} />
      </>}
      kpiCards={<>
        <KpiCard label="FIRE Corpus Needed" value={formatCurrency(result.fireCorpus)} description={`At age ${retirementAge}`} variant="primary" icon={Flame} />
        <KpiCard label="Monthly SIP Required" value={formatCurrency(result.requiredSIP)} description="From today onwards" variant="success" />
        <KpiCard label="Future Monthly Expense" value={formatCurrency(result.futureMonthlyExpenses)} description="Inflation-adjusted" variant="default" />
      </>}
      insightStrip={`To retire in ${result.yearsToRetire} years, you need a corpus of ${formatCurrency(result.fireCorpus)}. This will generate ${formatCurrency(result.futureMonthlyExpenses)} per month at a ${swr.toFixed(1)}% safe withdrawal rate.`}
      charts={<div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ name: 'FIRE Corpus', value: result.fireCorpus }]} margin={{ top: 20 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} />
             <XAxis dataKey="name" hide />
             <YAxis tickFormatter={v => `₹${(v/1e7).toFixed(1)}Cr`} />
             <Tooltip formatter={(v: number) => formatCurrency(v)} />
             <Bar dataKey="value" name="Corpus" fill="#ef4444" barSize={150} radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>}
    />
  );
};
