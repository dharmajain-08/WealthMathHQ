import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { 
  NumericInput, 
  InputSlider, 
  KpiCard, 
  Accordion, 
  Button 
} from '../../components/ui';
import { calculateSIPStepUp, formatCurrency, formatPercent } from '../../lib/calculations';
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
import { BarChart3, TrendingUp, Zap, FileText, Download, PieChart as PieIcon } from 'lucide-react';
import { exportToExcel } from '../../lib/exports';

export const SIPStepUpView = () => {
  const [initialSIP, setInitialSIP] = useState(10000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(20);
  const [inflationRate, setInflationRate] = useState(6);

  const data = useMemo(() => {
    return calculateSIPStepUp(initialSIP, annualStepUp, expectedReturn, years, inflationRate);
  }, [initialSIP, annualStepUp, expectedReturn, years, inflationRate]);

  const last = data[data.length - 1];
  const wealthGained = last.stepUpCorpus - last.flatCorpus;
  const extraInvested = last.investedStepUp - last.investedFlat;
  const inflationLoss = last.stepUpCorpus - last.realValue;

  const pieData = [
    { name: 'Invested Amount', value: last.investedStepUp, color: '#94a3b8' },
    { name: 'Estimated Returns', value: last.stepUpCorpus - last.investedStepUp, color: '#10b981' },
    ...(inflationRate > 0 ? [{ name: 'Inflation Loss', value: inflationLoss, color: '#f43f5e' }] : []),
  ];

  return (
    <CalculatorLayout
      title="SIP Step-Up Calculator"
      description="Model how increasing your SIP by 5-10% every year—matching your salary increments—dramatically accelerates your wealth creation."
      breadcrumb="SIP Step Up"
      inputs={
        <>
          <NumericInput 
            label="Initial Monthly SIP" 
            value={initialSIP} 
            onChange={setInitialSIP} 
            tooltip="The starting monthly investment amount."
          />
          <InputSlider 
            label="Annual Step-Up (%)" 
            value={annualStepUp} 
            onChange={setAnnualStepUp} 
            min={0} 
            max={30} 
            step={1} 
            tooltip="Increase your SIP every year to match salary hikes and beat inflation."
          />
          <InputSlider 
            label="Expected Return (p.a.)" 
            value={expectedReturn} 
            onChange={setExpectedReturn} 
            min={1} 
            max={30} 
            step={0.5} 
            tooltip="The average annual growth rate you expect over the long term."
          />
          <InputSlider 
            label="Investment Period" 
            value={years} 
            onChange={setYears} 
            min={1} 
            max={40} 
            suffix=" yrs" 
            tooltip="The total number of years you plan to stay invested."
          />
          <InputSlider 
            label="Inflation Rate (p.a.)" 
            value={inflationRate} 
            onChange={setInflationRate} 
            min={0} 
            max={15} 
            step={0.5} 
            tooltip="Estimated annual price rise. Higher inflation reduces your future purchasing power."
          />
        </>
      }
      exports={(clientName) => (
        <>
          <Button 
            variant="secondary" 
            icon={Download} 
            onClick={() => exportToExcel({
              title: "SIP Step-Up Wealth Analysis",
              clientName,
              summary: [
                { label: "Initial SIP", value: formatCurrency(initialSIP) },
                { label: "Annual Increment", value: formatPercent(annualStepUp) },
                { label: "Final Corpus", value: formatCurrency(last.stepUpCorpus) },
                { label: "Real Value", value: formatCurrency(last.realValue) },
                { label: "Extra Wealth vs Flat SIP", value: formatCurrency(wealthGained) }
              ],
              tableHeaders: ["Year", "Step-Up Corpus", "Real Value", "Flat Corpus", "Invested (Step-Up)", "Invested (Flat)"],
              tableData: data.map(d => [d.year, d.stepUpCorpus, d.realValue, d.flatCorpus, d.investedStepUp, d.investedFlat])
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
                  <filter id="shadowSIP" height="200%">
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
                  filter="url(#shadowSIP)"
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
                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Wealth Goal</span>
                <span className="text-brand-navy font-black text-lg">{formatCurrency(last.stepUpCorpus)}</span>
             </div>
             {inflationRate > 0 && (
               <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Inflation Loss</span>
                  <span className="text-red-600 font-black">-{formatCurrency(inflationLoss)}</span>
               </div>
             )}
          </div>
        </div>
      }
      kpiCards={
        <div id="quick-ref" className="grid grid-cols-1 gap-4 w-full">
          <KpiCard 
            label="Estimated Corpus" 
            value={formatCurrency(last.stepUpCorpus)} 
            description={`Wealth with ${annualStepUp}% increment`}
            variant="primary"
            icon={TrendingUp}
          />
          <KpiCard 
            label="Real Value" 
            value={formatCurrency(last.realValue)} 
            description={`Adjusted for ${inflationRate}% inflation`}
            variant="success"
          />
          <KpiCard 
            label="Flat Portfolio" 
            value={formatCurrency(last.flatCorpus)} 
            description="Wealth without any Step-Up"
            variant="default"
          />
        </div>
      }
      insightStrip={`By increasing your SIP by just ${annualStepUp}% every year, you accumulate ${formatCurrency(wealthGained)} more than a flat SIP. However, due to ${inflationRate}% inflation, your purchasing power will be ${formatCurrency(last.realValue)}.`}
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
               name="Nominal Corpus"
               dataKey="stepUpCorpus" 
               fill="#4f46e5" 
               radius={[6, 6, 0, 0]}
               barSize={32}
               activeBar={{ fill: '#3730a3', stroke: '#4f46e5', strokeWidth: 2 }}
               animationDuration={1500}
             />
             <Bar 
               name="Real Power"
               dataKey="realValue" 
               fill="#10b981" 
               radius={[6, 6, 0, 0]}
               barSize={16}
               opacity={0.6}
               activeBar={{ opacity: 1 }}
               animationDuration={1500}
             />
             <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
           </BarChart>
        </ResponsiveContainer>
      }
      details={
         <Accordion title="Year-on-Year Growth Table">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-muted uppercase text-[10px] font-bold tracking-widest">
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Monthly SIP</th>
                      <th className="py-3 px-4">Invested (Step-Up)</th>
                      <th className="py-3 px-4">Step-Up Corpus</th>
                      <th className="py-3 px-4">Flat Corpus</th>
                      <th className="py-3 px-4">Premium Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.filter((_, i) => {
                      if (years <= 15) return true;
                      if (years <= 25) return i % 2 === 0 || i === years - 1;
                      return i % Math.floor(years / 10) === 0 || i === years - 1;
                    }).map((row) => (
                      <tr key={row.year} className="border-b border-brand-bg hover:bg-brand-bg-alt transition-colors">
                        <td className="py-3 px-4 font-bold text-brand-navy">{row.year}</td>
                        <td className="py-3 px-4 text-xs font-bold text-brand-muted">{formatCurrency(initialSIP * Math.pow(1 + annualStepUp/100, row.year-1))}</td>
                        <td className="py-3 px-4 text-brand-muted">{formatCurrency(row.investedStepUp)}</td>
                        <td className="py-3 px-4 font-bold text-brand-primary">{formatCurrency(row.stepUpCorpus)}</td>
                        <td className="py-3 px-4 text-brand-muted font-medium">{formatCurrency(row.flatCorpus)}</td>
                        <td className="py-3 px-4 text-brand-secondary font-black">+{formatCurrency(row.stepUpCorpus - row.flatCorpus)}</td>
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
