import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FinanceContext = createContext(null);

const initialTransactions = [
  {
    id: 1,
    date: "2026-01-05",
    description: "Salary",
    amount: 6000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-01-08",
    description: "Freelance UX",
    amount: 1200,
    category: "Freelance",
    type: "income",
  },
  {
    id: 3,
    date: "2026-01-12",
    description: "Groceries",
    amount: 320,
    category: "Groceries",
    type: "expense",
  },
  {
    id: 4,
    date: "2026-01-18",
    description: "Rent",
    amount: 1400,
    category: "Rent",
    type: "expense",
  },
  {
    id: 5,
    date: "2026-02-03",
    description: "Salary",
    amount: 6000,
    category: "Salary",
    type: "income",
  },
  {
    id: 6,
    date: "2026-02-10",
    description: "Utilities",
    amount: 220,
    category: "Utilities",
    type: "expense",
  },
  {
    id: 7,
    date: "2026-02-13",
    description: "Dining Out",
    amount: 180,
    category: "Food",
    type: "expense",
  },
  {
    id: 8,
    date: "2026-03-01",
    description: "Salary",
    amount: 6200,
    category: "Salary",
    type: "income",
  },
  {
    id: 9,
    date: "2026-03-05",
    description: "Gym",
    amount: 68,
    category: "Health",
    type: "expense",
  },
  {
    id: 10,
    date: "2026-03-16",
    description: "Shopping",
    amount: 530,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 11,
    date: "2026-03-22",
    description: "Bonus",
    amount: 500,
    category: "Bonus",
    type: "income",
  },
];

export const FinanceProvider = ({ children }) => {
  const [role, setRole] = useState(
    () => localStorage.getItem("financeRole") || "Viewer",
  );
  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem("financeTransactions");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Transaction parse failed", e);
    }
    return initialTransactions;
  });

  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("financeDarkMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("financeRole", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("financeTransactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("financeDarkMode", darkMode.toString());
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item)),
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    let results = [...transactions];
    if (searchFilter.trim()) {
      const term = searchFilter.toLowerCase();
      results = results.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term) ||
          t.date.toLowerCase().includes(term),
      );
    }
    if (typeFilter !== "all") {
      results = results.filter((t) => t.type === typeFilter);
    }
    if (categoryFilter !== "all") {
      results = results.filter((t) => t.category === categoryFilter);
    }
    return results;
  }, [transactions, searchFilter, typeFilter, categoryFilter]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + +t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + +t.amount, 0);
    const balance = income - expense;
    const savingsRate =
      income > 0
        ? Math.max(0, Math.min(100, ((income - expense) / income) * 100))
        : 0;
    return { income, expense, balance, savingsRate };
  }, [transactions]);

  const monthlyTrend = useMemo(() => {
    const byMonth = {};
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!byMonth[month]) byMonth[month] = { income: 0, expense: 0 };
      if (t.type === "income") {
        byMonth[month].income += +t.amount;
      } else {
        byMonth[month].expense += +t.amount;
      }
    });
    return Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, { income, expense }]) => ({ month, income, expense }));
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const cat = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        cat[t.category] = (cat[t.category] || 0) + +t.amount;
      });
    const totalExpense = Object.values(cat).reduce((acc, n) => acc + n, 0);
    return Object.entries(cat)
      .sort((a, b) => b[1] - a[1])
      .map(([category, value]) => ({
        category,
        value,
        percent: totalExpense ? Math.round((value / totalExpense) * 100) : 0,
      }));
  }, [transactions]);

  const highestSpendingCategory = categoryBreakdown.length
    ? categoryBreakdown[0]
    : null;

  return (
    <FinanceContext.Provider
      value={{
        role,
        setRole,
        transactions,
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
        totals,
        monthlyTrend,
        categoryBreakdown,
        highestSpendingCategory,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};

export default FinanceContext;
