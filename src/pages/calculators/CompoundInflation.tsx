import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { 
  NumericInput, 
  InputSlider, 
  KpiCard, 
  Accordion, 
  Button 
} from '../../components/ui';
import { calculateCompoundInflation, formatCurrency, formatPercent } from '../../lib/calculations';
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, FileText, Download, PieChart as PieIcon } from 'lucide-react';
import { exportToExcel } from '../../lib/exports';

export const WealthGrowthAnalyserView = () => {
  const [principal, setPrincipal] = useState(100000);
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);
  // Removed local clientName state

  const data = useMemo(() => {
    return calculateCompoundInflation(principal, monthlySIP, annualReturn, inflationRate, years);
  }, [principal, monthlySIP, annualReturn, inflationRate, years]);

  const finalResult = data[data.length - 1];

  const pieData = [
    { name: 'Amount Invested', value: finalResult.investedAmount, color: '#94a3b8' },
    { name: 'Inflation-Adjusted Growth', value: Math.max(0, finalResult.realValue - finalResult.investedAmount), color: '#10b981' },
    { name: 'Purchasing Power Loss', value: finalResult.inflationLoss, color: '#f43f5e' },
  ];

  return (
    <div id="calculator-content">
      <CalculatorLayout
        title="Wealth Growth Analyser"
        description="Understand the true power of compounding by adjusting for inflation. Visualize nominal growth vs. actual purchasing power."
        breadcrumb="Wealth Growth Analyser"
        inputs={
          <>
            <NumericInput 
              label="One-time Investment" 
              value={principal} 
              onChange={setPrincipal} 
              tooltip="The initial principal amount you invest."
            />
            <NumericInput 
              label="Monthly SIP" 
              value={monthlySIP} 
              onChange={setMonthlySIP} 
              tooltip="The amount you plan to invest every month."
            />
            <InputSlider 
              label="Expected Return (p.a.)" 
              value={annualReturn} 
              onChange={setAnnualReturn} 
              min={1} 
              max={30} 
              step={0.5} 
              tooltip="The average annual growth rate you expect."
            />
            <InputSlider 
              label="Inflation Rate (p.a.)" 
              value={inflationRate} 
              onChange={setInflationRate} 
              min={0} 
              max={15} 
              step={0.5} 
              tooltip="Expected annual inflation rate."
            />
            <InputSlider 
              label="Time Period (Years)" 
              value={years} 
              onChange={setYears} 
              min={1} 
              max={40} 
              suffix=" yrs" 
              tooltip="Duration of your investment in years."
            />
          </>
        }
      exports={(clientName) => (
        <>
          <Button 
            variant="secondary" 
            icon={Download} 
            onClick={() => exportToExcel({
              title: "Wealth Growth Analysis (Inflation Adjusted)",
              clientName,
              summary: [
                { label: "One-time Investment", value: formatCurrency(principal) },
                { label: "Monthly SIP", value: formatCurrency(monthlySIP) },
                { label: "Expected Return", value: formatPercent(annualReturn) },
                { label: "Inflation Rate", value: formatPercent(inflationRate) },
                { label: "Final Nominal Value", value: formatCurrency(finalResult.nominalValue) },
                { label: "Real Value (Purchasing Power)", value: formatCurrency(finalResult.realValue) },
              ],
              tableHeaders: ["Year", "Nominal Corpus", "Real Value (Today's ₹)", "Invested Amount", "Inflation Loss"],
              tableData: data.map(d => [d.year, d.nominalValue, d.realValue, d.investedAmount, d.inflationLoss])
            })} 
            className="text-[10px]"
          >
            Excel Report
          </Button>
        </>
      )}
      outputs={
        <div className="flex flex-col items-center">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                   <filter id="shadowPipe" height="200%">
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
                  filter="url(#shadowPipe)"
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
                <span className="text-[10px] font-bold text-brand-muted uppercase">Inflation Impact</span>
                <span className="text-brand-danger font-black">{((finalResult.inflationLoss / finalResult.nominalValue) * 100).toFixed(0)}% Lost</span>
             </div>
          </div>
        </div>
      }
      kpiCards={
        <div className="grid grid-cols-1 gap-4 w-full">
          <KpiCard 
            label="Nominal Wealth" 
            value={formatCurrency(finalResult.nominalValue)} 
            description={`Corpus in ${years} yrs`}
            variant="primary"
            icon={TrendingUp}
          />
          <KpiCard 
            label="Real Value" 
            value={formatCurrency(finalResult.realValue)} 
            description={`Adjusted for ${inflationRate}% inflation`}
            variant="success"
          />
          <KpiCard 
            label="Investment" 
            value={formatCurrency(finalResult.investedAmount)} 
            description="Total principal + SIPs"
            variant="default"
          />
        </div>
      }
      insightStrip={`At ${annualReturn}% return, your money grows to ${formatCurrency(finalResult.nominalValue)}. However, due to ${inflationRate}% inflation, its actual purchasing power will be ${formatCurrency(finalResult.realValue)}. You need to earn at least ${inflationRate}% return just to maintain your current lifestyle.`}
      charts={
        <ResponsiveContainer width="100%" height={400}>
           <BarChart data={data}>
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
               tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`} 
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
               name="Nominal Corpus"
               dataKey="nominalValue" 
               fill="#4f46e5" 
               radius={[6, 6, 0, 0]}
               barSize={32}
               activeBar={{ fill: '#3730a3', stroke: '#4f46e5', strokeWidth: 1 }}
             />
             <Bar 
               name="Real Power"
               dataKey="realValue" 
               fill="#10b981" 
               radius={[6, 6, 0, 0]}
               barSize={32}
               activeBar={{ fill: '#065f46', stroke: '#10b981', strokeWidth: 1 }}
             />
             <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
           </BarChart>
        </ResponsiveContainer>
      }
        details={
          <>
            <Accordion title="Yearly Wealth Projection">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-muted uppercase text-[10px] font-bold tracking-widest">
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Invested</th>
                      <th className="py-3 px-4">Nominal Corpus</th>
                      <th className="py-3 px-4">Real Value (Today's ₹)</th>
                      <th className="py-3 px-4">Inflation Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((d, i) => d.year !== 0 && (i % Math.max(1, Math.floor(years / 10)) === 0 || i === years)).map((row) => (
                      <tr key={row.year} className="border-b border-brand-bg hover:bg-brand-bg-alt transition-colors">
                        <td className="py-3 px-4 font-bold text-brand-navy">{row.year}</td>
                        <td className="py-3 px-4 text-brand-muted">{formatCurrency(row.investedAmount)}</td>
                        <td className="py-3 px-4 font-bold text-brand-primary">{formatCurrency(row.nominalValue)}</td>
                        <td className="py-3 px-4 text-brand-secondary font-bold">{formatCurrency(row.realValue)}</td>
                        <td className="py-3 px-4 text-brand-danger">{formatCurrency(row.inflationLoss)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>
          </>
        }
      />
    </div>
  );
};
