import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

const Insights = () => {
  // Destructure data from your context
  const { totals, monthlyTrend = [], categoryBreakdown = [] } = useFinance();

  // Helper for progress bar colors
  const getBarColor = (index) => {
    const colors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8 font-sans text-slate-900">
      {/* 1. Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Financial Insights
        </h1>
        <p className="text-slate-500 mt-1">
          Detailed analysis of your monthly performance.
        </p>
      </div>

      {/* 2. Main Comparison Chart Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-6">Income vs Expenses</h2>

        {/* CRITICAL: This div MUST have a height for ResponsiveContainer to work */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTrend}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                height={40}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={35}
              />
              <Bar
                dataKey="expense"
                name="Expenses"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Spending Breakdown Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-6">Category Spending Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {categoryBreakdown.length > 0 ? (
            categoryBreakdown.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    {item.icon || "💰"} {item.category}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {formatMoney(item.value)} •{" "}
                    <span className="text-slate-900 font-bold">
                      {item.percent}%
                    </span>
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: getBarColor(index),
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">
              No category data available.
            </p>
          )}
        </div>
      </div>

      {/* 4. Bottom Grid: Progress & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Savings Progress Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Savings Target Progress
          </h2>
          <div className="flex justify-between items-end mb-3">
            <span className="text-2xl font-black text-slate-900">
              Goal: $10,000
            </span>
            <span className="text-emerald-600 font-bold">65% Progress</span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-emerald-500 rounded-full w-[65%] shadow-inner" />
          </div>
          <p className="text-xs text-slate-500">
            Current Contributions:{" "}
            <span className="font-bold text-slate-700">$6,500.00</span>
          </p>
        </div>

        {/* Alert Card */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
          <h2 className="text-rose-900 font-bold mb-2">Top Spending Alert</h2>
          <p className="text-sm text-rose-800/80 leading-relaxed">
            <span className="font-bold text-rose-600">ALERT:</span> Your
            subscription spending is 25% higher than last month.
          </p>
          <button className="mt-4 w-full py-2 bg-white border border-rose-200 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-all">
            Review Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Insights;
