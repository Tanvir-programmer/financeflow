import React from "react";
import { useFinance } from "../context/FinanceContext";

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
    role,
    setSearchFilter,
    setTypeFilter,
    setCategoryFilter,
  } = useFinance();

  const recentTransactions = filteredTransactions.slice(0, 6);

  const highestCategory = categoryBreakdown[0] || null;

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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Monthly trend
          </h2>
          <div className="h-52 mt-4 flex items-end gap-2">
            {monthlyTrend.length ? (
              (() => {
                const values = monthlyTrend.map((item) => item.value);
                const min = Math.min(...values);
                const max = Math.max(...values);
                const range = Math.max(1, max - min);

                return monthlyTrend.map((item) => {
                  const normalized = ((item.value - min) / range) * 100;
                  return (
                    <div
                      key={item.month}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-full rounded-xl transition-all ${item.value >= 0 ? "bg-emerald-400" : "bg-rose-400"}`}
                        style={{ height: `${Math.max(12, normalized)}%` }}
                        title={`${item.month}: ${formatMoney(item.value)}`}
                      ></div>
                      <small className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                        {item.month}
                      </small>
                    </div>
                  );
                });
              })()
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
            <ul className="mt-4 space-y-3">
              {categoryBreakdown.slice(0, 6).map((item) => (
                <li key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{item.category}</span>
                    <span>
                      {formatMoney(item.value)} ({item.pct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${Math.min(100, item.pct)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
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

        {role === "Admin" && (
          <p className="mt-3 text-xs text-blue-600 dark:text-blue-300">
            As Admin you can manage transactions on the Transactions page.
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
