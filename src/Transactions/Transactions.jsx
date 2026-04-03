import React, { useMemo, useState } from "react";
import { useFinance } from "../context/FinanceContext";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

const Transactions = () => {
  const {
    role,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    searchFilter,
    setSearchFilter,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
  } = useFinance();

  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editing, setEditing] = useState(null);
  const [formState, setFormState] = useState({
    date: "",
    description: "",
    category: "",
    type: "expense",
    amount: "",
  });

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "amount") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      if (sortField === "date") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      const diff = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [filteredTransactions, sortField, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formState.description ||
      !formState.category ||
      !formState.date ||
      !formState.amount
    )
      return;

    const payload = {
      date: formState.date,
      description: formState.description,
      category: formState.category,
      type: formState.type,
      amount: Number(formState.amount),
    };

    if (editing) {
      updateTransaction({ ...payload, id: editing.id });
      setEditing(null);
    } else {
      addTransaction(payload);
    }

    setFormState({
      date: "",
      description: "",
      category: "",
      type: "expense",
      amount: "",
    });
  };

  const startEdit = (tx) => {
    setEditing(tx);
    setFormState({
      date: tx.date,
      description: tx.description,
      category: tx.category,
      type: tx.type,
      amount: tx.amount,
    });
  };

  const clearForm = () => {
    setEditing(null);
    setFormState({
      date: "",
      description: "",
      category: "",
      type: "expense",
      amount: "",
    });
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Transactions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full sm:w-auto">
          <input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search transactions"
            className="input input-bordered w-full text-sm"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="select select-bordered text-sm"
          >
            <option value="all">All type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered text-sm"
          >
            <option value="all">All category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Rent">Rent</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Shopping">Shopping</option>
            <option value="Bonus">Bonus</option>
          </select>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="btn btn-outline btn-sm"
          >
            Sort: {sortField} {sortOrder}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <table className="table w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th
                className="cursor-pointer"
                onClick={() => setSortField("date")}
              >
                Date
              </th>
              <th
                className="cursor-pointer"
                onClick={() => setSortField("description")}
              >
                Description
              </th>
              <th
                className="cursor-pointer"
                onClick={() => setSortField("category")}
              >
                Category
              </th>
              <th
                className="cursor-pointer"
                onClick={() => setSortField("type")}
              >
                Type
              </th>
              <th
                className="cursor-pointer"
                onClick={() => setSortField("amount")}
              >
                Amount
              </th>
              {role === "Admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700"
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
                  {role === "Admin" && (
                    <td className="flex gap-2">
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => startEdit(t)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => deleteTransaction(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "Admin" ? 6 : 5}
                  className="text-center py-6 text-slate-500 dark:text-slate-300"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {role === "Admin" ? (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {editing ? "Edit" : "Add"} transaction
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          >
            <input
              type="date"
              value={formState.date}
              onChange={(e) =>
                setFormState((p) => ({ ...p, date: e.target.value }))
              }
              className="input input-bordered"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={formState.description}
              onChange={(e) =>
                setFormState((p) => ({ ...p, description: e.target.value }))
              }
              className="input input-bordered"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formState.category}
              onChange={(e) =>
                setFormState((p) => ({ ...p, category: e.target.value }))
              }
              className="input input-bordered"
              required
            />
            <select
              value={formState.type}
              onChange={(e) =>
                setFormState((p) => ({ ...p, type: e.target.value }))
              }
              className="select select-bordered"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={formState.amount}
              onChange={(e) =>
                setFormState((p) => ({ ...p, amount: e.target.value }))
              }
              className="input input-bordered"
              required
            />
            <div className="flex gap-2 items-center">
              <button type="submit" className="btn btn-primary">
                {editing ? "Update" : "Add"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-gray-100 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-200">
            Viewer role only has read access. Switch to Admin to add or edit
            transactions.
          </p>
        </div>
      )}
    </section>
  );
};

export default Transactions;
