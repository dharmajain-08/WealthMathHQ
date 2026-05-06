import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { NumericInput, InputSlider, KpiCard, Button } from '../../components/ui';
import { calculateCAGRReverse, formatCurrency } from '../../lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RotateCcw } from 'lucide-react';

export const CAGRReverseView = () => {
  const [current, setCurrent] = useState(500000);
  const [target, setTarget] = useState(2500000);
  const [years, setYears] = useState(10);

  const { cagr } = useMemo(() => calculateCAGRReverse(current, target, years), [current, target, years]);

  const benchmarks = [
    { name: 'Fixed Deposit', value: 7, label: '7%' },
    { name: 'Equity Avg', value: 12, label: '12%' },
    { name: 'Your Target', value: cagr, label: `${cagr.toFixed(1)}%` }
  ];

  return (
    <CalculatorLayout
      title="CAGR Reverse"
      description="Find the growth rate needed to reach a target amount. Reverse-calculate your investment goals."
      breadcrumb="CAGR Reverse"
      inputs={<>
        <NumericInput label="Current Corpus" value={current} onChange={setCurrent} />
        <NumericInput label="Target Amount" value={target} onChange={setTarget} />
        <InputSlider label="Time Horizon (Years)" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />
      </>}
      kpiCards={<>
        <KpiCard label="Required CAGR" value={`${cagr.toFixed(2)}%`} description="Annual return needed" variant="primary" icon={RotateCcw} />
        <KpiCard label="Multiplication" value={`${(target/current).toFixed(1)}x`} description="Asset growth multiple" variant="default" />
        <KpiCard label="Diff vs 12% Equity" value={`${(cagr - 12).toFixed(1)}%`} description="Alpha required" variant={cagr > 15 ? 'warning' : 'default'} />
      </>}
      insightStrip={`To turn ${formatCurrency(current)} into ${formatCurrency(target)} in ${years} years, you need a compounded annual return of ${cagr.toFixed(2)}%. This is ${cagr > 12 ? 'higher than the typical equity average' : 'within the typical equity return range'}.`}
      charts={<div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
           <BarChart data={benchmarks} layout="vertical" margin={{ left: 100 }}>
             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
             <XAxis type="number" domain={[0, 30]} hide />
             <YAxis dataKey="name" type="category" stroke="#94a3b8" />
             <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
             <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
               {benchmarks.map((entry, index) => (
                 <Cell key={index} fill={entry.name === 'Your Target' ? '#4f46e5' : '#e2e8f0'} />
               ))}
             </Bar>
           </BarChart>
        </ResponsiveContainer>
      </div>}
    />
  );
};
