import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

const Insights = () => {
  const { totals, monthlyTrend, highestSpendingCategory } = useFinance();

  const trendUp =
    monthlyTrend.length >= 2
      ? monthlyTrend[monthlyTrend.length - 1].value -
        monthlyTrend[monthlyTrend.length - 2].value
      : 0;

  return (
    <section className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Financial Insights
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Real-time analysis of your spending and savings behavior.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Top Category"
          value={highestSpendingCategory?.category || "N/A"}
          subValue={formatMoney(highestSpendingCategory?.value || 0)}
          color="indigo"
        />
        <StatCard
          label="Current Balance"
          value={formatMoney(totals.balance)}
          subValue="Available Funds"
          color="emerald"
        />
        <StatCard
          label="Trend"
          value={trendUp >= 0 ? "Improving" : "Declining"}
          subValue={`${trendUp >= 0 ? "+" : ""}${formatMoney(trendUp)} vs last month`}
          color={trendUp >= 0 ? "emerald" : "rose"}
          isTrend
          positive={trendUp >= 0}
        />
      </div>

      {/* Main Chart Section */}
      <div className="p-6 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Performance Over Time
          </h2>
          <p className="text-sm text-slate-500">
            Monthly net-worth progression
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#chartGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Smart Summary</h2>
          <div className="space-y-4">
            <NarrativeItem
              text={`Your savings rate is ${totals.savingsRate.toFixed(1)}%`}
              subtext={
                totals.savingsRate > 20
                  ? "Excellent! Above the 20% rule."
                  : "Try to reach 20% for optimal growth."
              }
            />
            <NarrativeItem
              text={`Income vs Expenses`}
              subtext={
                totals.income >= totals.expense
                  ? `You kept ${formatMoney(totals.income - totals.expense)} in surplus this period.`
                  : "You spent more than you earned."
              }
            />
          </div>
        </div>

        <div className="p-6 bg-indigo-50 dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">
            Recommendation
          </h2>
          <p className="text-indigo-800/80 dark:text-slate-300 leading-relaxed">
            Based on your spending in{" "}
            <span className="font-bold">
              {highestSpendingCategory?.category}
            </span>
            , cutting back by just 10% could increase your annual savings by{" "}
            {formatMoney((highestSpendingCategory?.value || 0) * 0.1 * 12)}.
          </p>
        </div>
      </div>
    </section>
  );
};

/* Helper Components for cleaner code */
const StatCard = ({ label, value, subValue, color, isTrend, positive }) => (
  <div className="group p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
      {label}
    </h3>
    <div className="flex flex-col">
      <span className={`text-2xl font-bold text-slate-800 dark:text-slate-100`}>
        {value}
      </span>
      <span
        className={`text-sm mt-1 font-medium ${isTrend ? (positive ? "text-emerald-500" : "text-rose-500") : "text-slate-500"}`}
      >
        {subValue}
      </span>
    </div>
  </div>
);

const NarrativeItem = ({ text, subtext }) => (
  <div className="flex gap-3">
    <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
    <div>
      <p className="font-medium text-slate-100">{text}</p>
      <p className="text-sm text-slate-400">{subtext}</p>
    </div>
  </div>
);

export default Insights;
