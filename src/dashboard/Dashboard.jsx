import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

const Dashboard = () => {
  const {
    totals,
    monthlyTrend,
    categoryBreakdown,
    filteredTransactions,
    transactions,
    role,
    setSearchFilter,
    setTypeFilter,
    setCategoryFilter,
  } = useFinance();

  const recentTransactions = filteredTransactions.slice(0, 6);

  const highestCategory = categoryBreakdown[0] || null;

  const formatMonthLabel = (monthString) => {
    const [year, month] = monthString.split("-");
    const date = new Date(`${year}-${month}-01`);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "2-digit",
    }).format(date);
  };

  const monthlyChartData = Object.values(
    transactions.reduce((acc, transaction) => {
      const month = transaction.date.slice(0, 7);
      if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
      if (transaction.type === "income") {
        acc[month].income += +transaction.amount;
      } else {
        acc[month].expense += +transaction.amount;
      }
      return acc;
    }, {}),
  )
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      ...item,
      balance: item.income - item.expense,
      monthLabel: formatMonthLabel(item.month),
    }));

  const totalExpense = categoryBreakdown.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const pieColors = [
    "#fb7185",
    "#facc15",
    "#38bdf8",
    "#8b5cf6",
    "#0ea5e9",
    "#4ade80",
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Total Balance
          </span>
          <p className="mt-2 text-3xl font-bold">
            {formatMoney(totals.balance)}
          </p>
          <p className="text-xs text-slate-500">
            Income {formatMoney(totals.income)} • Expenses{" "}
            {formatMoney(totals.expense)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Total Income
          </span>
          <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-300">
            {formatMoney(totals.income)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Total Expenses
          </span>
          <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-300">
            {formatMoney(totals.expense)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Savings Rate
          </span>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-300">
            {totals.savingsRate.toFixed(1)}%
          </p>
          <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 dark:bg-emerald-400"
              style={{ width: `${totals.savingsRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Income · Expenses · Balance Trend
              </h2>
              <p className="text-sm text-slate-500">
                Monthly performance across income, expenses, and net balance.
              </p>
            </div>
          </div>
          <div className="h-72 mt-4">
            {monthlyChartData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                  />
                  <Tooltip
                    formatter={(value) => formatMoney(value)}
                    contentStyle={{ borderRadius: "12px", border: "none" }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Income"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    name="Expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Balance"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-500">No trend data yet.</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Spending breakdown
          </h2>
          {categoryBreakdown.length ? (
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1fr] items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      dataKey="value"
                      nameKey="category"
                      innerRadius={58}
                      outerRadius={90}
                      paddingAngle={4}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell
                          key={`slice-${entry.category}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <div className="text-center text-sm text-slate-500">Total</div>
                <div className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {formatMoney(totalExpense)}
                </div>
                <div className="text-center text-xs uppercase tracking-widest text-slate-500">
                  Expense total
                </div>
                <div className="space-y-3">
                  {categoryBreakdown.slice(0, 6).map((item, index) => (
                    <div
                      key={item.category}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="inline-flex h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: pieColors[index % pieColors.length],
                        }}
                      />
                      <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                        {item.category}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {formatMoney(item.value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No expense categories yet.
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Recent transactions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by description/category/date"
              onChange={(e) => setSearchFilter(e.target.value)}
              className="input input-bordered w-full max-w-xs text-sm"
            />
            <select
              onChange={(e) => setTypeFilter(e.target.value)}
              className="select select-bordered text-sm"
            >
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered text-sm"
            >
              <option value="all">All categories</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Rent">Rent</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Bonus">Bonus</option>
              <option value="Food">Food</option>
            </select>
          </div>
        </div>

        {recentTransactions.length ? (
          <div className="overflow-x-auto mt-4">
            <table className="table w-full text-sm">
              <thead className="text-left">
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td>{t.date}</td>
                    <td>{t.description}</td>
                    <td>{t.category}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          t.type === "income"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td>{formatMoney(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No transactions matched your filters yet.
          </p>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Key insights
        </h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <div className="text-xs text-slate-500 uppercase">
              Highest spending category
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {highestCategory
                ? `${highestCategory.category} (${formatMoney(highestCategory.value)})`
                : "No expenses yet"}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <div className="text-xs text-slate-500 uppercase">
              Month-over-month change
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {monthlyTrend.length >= 2
                ? (() => {
                    const last = monthlyTrend[monthlyTrend.length - 1].value;
                    const prev = monthlyTrend[monthlyTrend.length - 2].value;
                    const change = prev
                      ? ((last - prev) / Math.abs(prev)) * 100
                      : 0;
                    return (
                      <span
                        className={`${change >= 0 ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {change.toFixed(1)}%
                      </span>
                    );
                  })()
                : "Not enough months"}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <div className="text-xs text-slate-500 uppercase">
              Net saving vs month average
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {monthlyTrend.length
                ? (() => {
                    const avg =
                      monthlyTrend.reduce((s, v) => s + v.value, 0) /
                      monthlyTrend.length;
                    const current = monthlyTrend[monthlyTrend.length - 1].value;
                    const diff = current - avg;
                    return (
                      <span>
                        {diff >= 0 ? "+" : ""}
                        {formatMoney(diff)}
                      </span>
                    );
                  })()
                : "TBD"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
