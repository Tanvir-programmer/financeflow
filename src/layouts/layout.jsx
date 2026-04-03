import Navbar from "../components/Navbar"; // Adjust path as needed
import { Outlet } from "react-router";
import { FinanceProvider } from "../context/FinanceContext";

const Layout = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </FinanceProvider>
  );
};

export default Layout;
