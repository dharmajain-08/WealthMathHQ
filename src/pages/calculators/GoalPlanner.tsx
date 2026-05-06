import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '../../components/layout/CalculatorLayout';
import { 
  NumericInput, 
  InputSlider, 
  KpiCard, 
  Accordion, 
  Button,
  Label
} from '../../components/ui';
import { calculateGoalPlanner, formatCurrency, formatPercent } from '../../lib/calculations';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from 'recharts';
import { Target, FileText, Download, Share2, ChevronDown } from 'lucide-react';
import { exportToExcel } from '../../lib/exports';

export const GoalPlannerView = () => {
  const [targetToday, setTargetToday] = useState(10000000);
  const [currentSavings, setCurrentSavings] = useState(1000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);
  // Removed local clientName state
  const [selectedGoal, setSelectedGoal] = useState("Retirement Corpus");

  const GOAL_PRESETS = [
    { label: "Retirement Corpus", amount: 10000000 },
    { label: "Child Education", amount: 5000000 },
    { label: "Home Down Payment", amount: 2000000 },
    { label: "Car Purchase", amount: 1500000 },
    { label: "Emergency Fund (6m)", amount: 600000 },
    { label: "World Trip", amount: 1000000 },
    { label: "Other Goal", amount: 0 },
  ];

  const result = useMemo(() => {
    return calculateGoalPlanner(targetToday, currentSavings, expectedReturn, inflationRate, years);
  }, [targetToday, currentSavings, expectedReturn, inflationRate, years]);

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    const preset = GOAL_PRESETS.find(p => p.label === goal);
    if (preset && goal !== "Other Goal") {
      setTargetToday(preset.amount);
    }
  };

  return (
    <CalculatorLayout
      title="Goal Planner"
      description="Estimate the SIP or lump sum needed to hit your future financial milestones while accounting for rising costs."
      breadcrumb="Goal Planner"
      inputs={
        <>
          <div className="space-y-4 mb-6">
            <Label className="text-[10px] tracking-[1.5px] font-black text-brand-primary/60 uppercase">Choose Financial Goal</Label>
            <div className="relative">
              <select
                value={selectedGoal}
                onChange={(e) => handleGoalSelect(e.target.value)}
                className="w-full bg-[#f0f7ff] border border-brand-border rounded-xl p-3 text-sm font-bold text-brand-navy outline-none focus:border-brand-primary appearance-none cursor-pointer pr-10"
              >
                {GOAL_PRESETS.map((goal) => (
                  <option key={goal.label} value={goal.label}>
                    {goal.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-brand-primary" />
              </div>
            </div>
          </div>

          <NumericInput 
            label="Target Goal (Today's ₹)" 
            value={targetToday} 
            onChange={setTargetToday} 
            tooltip="The amount this goal costs in today's money."
          />
          <NumericInput 
            label="Current Savings" 
            value={currentSavings} 
            onChange={setCurrentSavings} 
            tooltip="Any existing amount you have already saved for this goal."
          />
          <InputSlider 
            label="Expected Return (p.a.)" 
            value={expectedReturn} 
            onChange={setExpectedReturn} 
            min={1} 
            max={30} 
            step={0.5} 
            tooltip="Expected annual growth of your investments."
          />
          <InputSlider 
            label="Inflation Rate (p.a.)" 
            value={inflationRate} 
            onChange={setInflationRate} 
            min={0} 
            max={15} 
            step={0.5} 
            tooltip="Rate at which prices increase every year."
          />
          <InputSlider 
            label="Years to Goal" 
            value={years} 
            onChange={setYears} 
            min={1} 
            max={40} 
            suffix=" yrs" 
            tooltip="Number of years you have to reach this target."
          />
        </>
      }
      exports={(clientName) => (
        <>
          <Button 
            variant="secondary" 
            icon={Download} 
            onClick={() => exportToExcel({
              title: "Goal Planning Report",
              clientName,
              summary: [
                { label: "Selected Goal", value: selectedGoal },
                { label: "Target (Today's ₹)", value: formatCurrency(targetToday) },
                { label: "Current Savings", value: formatCurrency(currentSavings) },
                { label: "Future Goal (Inf-Adj)", value: formatCurrency(result.futureGoal) },
                { label: "Required SIP", value: formatCurrency(result.requiredSIP) },
              ],
              tableHeaders: ["Year", "Projected Corpus", "Inflation-Adjusted Target"],
              tableData: result.projections.map(p => [p.year, p.corpus, p.target])
            })} 
            className="text-[10px]"
          >
            Excel Report
          </Button>
        </>
      )}
      kpiCards={
        <>
          <KpiCard 
            label="Future Goal Target" 
            value={formatCurrency(result.futureGoal)} 
            description={`Adjusted for ${inflationRate}% inflation`}
            variant="primary"
            icon={Target}
          />
          <KpiCard 
            label="Required Monthly SIP" 
            value={formatCurrency(result.requiredSIP)} 
            description="Invested at return rate"
            variant="success"
          />
          <KpiCard 
            label="Or Lumpsum Today" 
            value={formatCurrency(result.requiredLumpsum)} 
            description="One-time investment"
            variant="default"
          />
        </>
      }
      insightStrip={`To afford something worth ${formatCurrency(targetToday)} today in ${years} years, you'll need ${formatCurrency(result.futureGoal)}. Start a SIP of ${formatCurrency(result.requiredSIP)} to get there without stress.`}
      charts={
        <div className="h-[400px]">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.projections}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="year" fontSize={11} tick={{fill: '#64748b'}} dy={10} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`} fontSize={11} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(val: number) => formatCurrency(val)} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
                <Bar 
                  name="Projected Corpus"
                  dataKey="corpus" 
                  fill="#4f46e5" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar 
                  name="Goal Target (Inf-Adj)"
                  dataKey="target" 
                  fill="#94a3b8" 
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                  opacity={0.3}
                />
              </BarChart>
           </ResponsiveContainer>
        </div>
      }
      details={
        <Accordion title="What does this mean?">
          <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
            <p>1. <strong>Inflation Impact:</strong> Prices double every 10-12 years in India at 6-7% inflation. Your goal amount must account for this.</p>
            <p>2. <strong>Step-Up Strategy:</strong> If {formatCurrency(result.requiredSIP)} feels high, consider a "Step-Up" SIP where you increase contributions as your salary grows.</p>
            <p>3. <strong>Return Variance:</strong> Market returns fluctuate. Aim for a 2-3% buffer in your expected return calculations for safety.</p>
          </div>
        </Accordion>
      }
    />
  );
};
