import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { NumericInput, InputSlider, KpiCard, Button } from '../../components/ui';
import { calculateEMIvsInvest, formatCurrency } from '../../lib/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Scale } from 'lucide-react';

export const EMIvsInvestView = () => {
  const [loan, setLoan] = useState(2500000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(15);
  const [extra, setExtra] = useState(500000);
  const [ret, setRet] = useState(12);

  const result = useMemo(() => calculateEMIvsInvest(loan, rate, tenure, extra, ret), [loan, rate, tenure, extra, ret]);

  const chartData = [
    { name: 'Pay Loan', value: result.interestSaved, label: 'Interest Saved' },
    { name: 'Invest', value: result.futureValueInvestment, label: 'Wealth Generated' }
  ];

  const netDiff = Math.abs(result.netGainInvest);
  const winner = result.netGainInvest > 0 ? 'Investing' : 'Paying Loan';

  return (
    <CalculatorLayout
      title="EMI vs Invest"
      description="Should you use your bonus to prepay your home loan or invest it in an equity SIP? Compare both paths side-by-side."
      breadcrumb="EMI vs Invest"
      inputs={<>
        <NumericInput label="Outstanding Loan" value={loan} onChange={setLoan} />
        <InputSlider label="Loan Interest Rate (%)" value={rate} onChange={setRate} min={5} max={15} step={0.1} />
        <InputSlider label="Remaining Tenure (Yrs)" value={tenure} onChange={setTenure} min={1} max={30} />
        <NumericInput label="Extra Amount Available" value={extra} onChange={setExtra} />
        <InputSlider label="Investment Return (%)" value={ret} onChange={setRet} min={5} max={25} step={0.5} />
      </>}
      kpiCards={<>
        <KpiCard label="Gain if Investing" value={formatCurrency(result.futureValueInvestment)} description="Future value of investment" variant="primary" icon={Scale} />
        <KpiCard label="Gain if Paying Loan" value={formatCurrency(result.interestSaved)} description="Total interest saved" variant="default" />
        <KpiCard label="Net Advantage" value={formatCurrency(netDiff)} description={`${winner} is better`} variant="success" />
      </>}
      insightStrip={`Investing ${formatCurrency(extra)} at ${ret}% return earns you ${formatCurrency(result.futureValueInvestment)}. Paying the loan saves you ${formatCurrency(result.interestSaved)}. ${winner} gives you a net advantage of ${formatCurrency(netDiff)} over ${tenure} years.`}
      charts={<div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="value" name="Financial Impact" barSize={80} radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.name === winner ? '#4f46e5' : '#e2e8f0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>}
    />
  );
};
