import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { NumericInput, InputSlider, KpiCard, Button } from '../../components/ui';
import { calculateFixedDeposit, calculateRecurringDeposit, formatCurrency } from '../../lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Banknote } from 'lucide-react';

export const FDRDView = () => {
  const [mode, setMode] = useState<'FD' | 'RD'>('FD');
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(7);
  const [tenure, setTenure] = useState(3);

  const fd = useMemo(() => calculateFixedDeposit(amount, rate, tenure), [amount, rate, tenure]);
  const rd = useMemo(() => calculateRecurringDeposit(amount / 12, rate, tenure), [amount, rate, tenure]); // Example comparison

  const chartData = [
    { name: 'Fixed Deposit', value: fd.maturityValue, interest: fd.totalInterest, principal: amount },
    { name: 'Recurring Deposit*', value: rd.maturityValue, interest: rd.totalInterest, principal: rd.totalInvested }
  ];

  return (
    <CalculatorLayout
      title="FD & RD Calculator"
      description="Compare traditional safe-haven investments. See maturity values, interest earned, and effective annual yields."
      breadcrumb="FD & RD"
      inputs={<>
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setMode('FD')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${mode === 'FD' ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-muted hover:bg-brand-border'}`}>Fixed Deposit</button>
          <button onClick={() => setMode('RD')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${mode === 'RD' ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-muted hover:bg-brand-border'}`}>Recurring Deposit</button>
        </div>
        {mode === 'FD' ? (
          <NumericInput label="Lumpsum Deposit" value={amount} onChange={setAmount} />
        ) : (
          <NumericInput label="Monthly Deposit" value={amount} onChange={setAmount} />
        )}
        <InputSlider label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={3} max={12} step={0.1} />
        <InputSlider label="Tenure (Years)" value={tenure} onChange={setTenure} min={1} max={10} suffix=" yrs" />
      </>}
      kpiCards={<>
        <KpiCard label="Maturity Value" value={formatCurrency(mode === 'FD' ? fd.maturityValue : rd.maturityValue)} description={`After ${tenure} years`} variant="primary" icon={Banknote} />
        <KpiCard label="Total Interest" value={formatCurrency(mode === 'FD' ? fd.totalInterest : rd.totalInterest)} description="Pre-tax earnings" variant="success" />
        <KpiCard label="Effective Yield" value={`${(mode === 'FD' ? fd.effectiveYield : rate).toFixed(2)}%`} description="Annualized growth" variant="default" />
      </>}
      insightStrip={mode === 'FD' 
        ? `Invest ${formatCurrency(amount)} at ${rate}% to get ${formatCurrency(fd.maturityValue)} at maturity. Your money grows at an effective yield of ${fd.effectiveYield.toFixed(2)}% p.a.`
        : `Saving ${formatCurrency(amount)} every month at ${rate}% results in a corpus of ${formatCurrency(rd.maturityValue)}.`}
      charts={<div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
           <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
             <XAxis type="number" hide />
             <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} />
             <Tooltip formatter={(v: number) => formatCurrency(v)} />
             <Legend verticalAlign="top" height={36} />
             <Bar dataKey="principal" name="Total Invested" fill="#94a3b8" barSize={30} radius={[0, 4, 4, 0]} />
             <Bar dataKey="interest" name="Interest Earned" fill="#4f46e5" barSize={30} radius={[0, 4, 4, 0]} />
           </BarChart>
        </ResponsiveContainer>
      </div>}
    />
  );
};
