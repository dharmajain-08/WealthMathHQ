import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { NumericInput, InputSlider, KpiCard, Accordion, Button } from '../../components/ui';
import { calculateSWP, formatCurrency } from '../../lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet } from 'lucide-react';

export const SWPView = () => {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [ret, setRet] = useState(8);
  const [increase, setIncrease] = useState(5);

  const result = useMemo(() => calculateSWP(corpus, withdrawal, ret, increase), [corpus, withdrawal, ret, increase]);
  const last = result.schedule[result.schedule.length - 1];

  return (
    <CalculatorLayout
      title="SWP Calculator"
      description="Systematic Withdrawal Plan: Estimate how long your retirement corpus can support your lifestyle with increasing withdrawals."
      breadcrumb="SWP"
      inputs={<>
        <NumericInput label="Initial Corpus" value={corpus} onChange={setCorpus} />
        <NumericInput label="Monthly Withdrawal" value={withdrawal} onChange={setWithdrawal} />
        <InputSlider label="Expected Return (p.a.)" value={ret} onChange={setRet} min={4} max={15} step={0.5} />
        <InputSlider label="Annual Withdrawal Increase (%)" value={increase} onChange={setIncrease} min={0} max={12} step={1} />
      </>}
      kpiCards={<>
        <KpiCard label="Corpus Lasts For" value={`${result.yearsLasted} Years`} description={last.closingBalance > 0 ? "Beyond 40 yrs projection" : "Until zero balance"} variant="primary" icon={Wallet} />
        <KpiCard label="Total Withdrawn" value={formatCurrency(result.totalWithdrawn)} description="Total income generated" variant="success" />
        <KpiCard label="Remaining Corpus" value={formatCurrency(last.closingBalance)} description="Estimated balance" variant="default" />
      </>}
      insightStrip={`A ${formatCurrency(withdrawal)}/month withdrawal from ${formatCurrency(corpus)} will last for ${result.yearsLasted} years, accounting for a ${increase}% annual boost in your living expenses.`}
      charts={<div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={result.schedule}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="year" fontSize={11} tick={{fill: '#64748b'}} /> 
            <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} fontSize={11} tick={{fill: '#64748b'}} />
            <Tooltip 
              formatter={(val: number) => formatCurrency(val)} 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
              cursor={{ fill: 'rgba(79, 70, 225, 0.05)' }}
            />
            <Bar dataKey="closingBalance" name="Remaining Corpus" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>}
    />
  );
};
