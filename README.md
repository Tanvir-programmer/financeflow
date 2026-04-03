# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Finance Dashboard Assignment - Details

### Overview

- Built with React + Vite + Tailwind/daisyUI.
- Uses `Context` for global state (`src/context/FinanceContext.jsx`).
- Simulates role-based UI: `Admin` vs `Viewer`.
- Local storage persists role, transactions, dark mode.

### Key Features Implemented

- Dashboard: total balance, income, expense, savings rate cards
- Monthly time-series trend bars
- Expense category breakdown bars
- Transactions list with search/filter/sort
- Admin-only add/edit/delete transactions
- Insights page with spending patterns and net saving narrative
- Dark mode toggle
- Responsive layout and no-data states

### Folder structure

- `src/context/FinanceContext.jsx`: state and data operations
- `src/components/Navbar.jsx`: role switcher + dark mode
- `src/dashboard/Dashboard.jsx`: overview and recent transactions
- `src/Transactions/Transactions.jsx`: CRUD table and filters
- `src/insights/Insights.jsx`: analysis and observations

### How to run

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

### Notes

- The app is intentionally static/mock data-first with no backend.
- Addition: saving into local storage for improved demo flow.
- Good candidate for future optional enhancements (CSV export, charts library, REST API).
