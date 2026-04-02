import React, { useState } from "react";
import { Eye, ShieldCheck, ChevronDown, Menu, X, Moon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [role, setRole] = useState("Viewer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Transactions", icon: "📋", path: "/transactions" },
    { name: "Insights", icon: "💡", path: "/insights" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo Section */}
          <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-[#f59e0b] rounded-lg shadow-sm">
              <span className="text-sm">💰</span>
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">
              FinanceFlow
            </span>
          </Link>

          {/* Desktop Navigation "Pill" - Smaller Sizing */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#f8fafc] p-1 rounded-xl border border-gray-50">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.name
                    ? "bg-white shadow-sm border border-gray-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2.5">
            {/* Viewer Badge - Compact */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3ff] text-[#7c3aed] rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Eye size={13} />
              {role}
            </div>

            {/* Role Switcher - Compact */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors"
              >
                Switch: {role}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50">
                  <button
                    onClick={() => {
                      setRole("Admin");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-gray-50"
                  >
                    <ShieldCheck size={14} className="text-indigo-500" /> Admin
                  </button>
                  <button
                    onClick={() => {
                      setRole("Viewer");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-gray-50"
                  >
                    <Eye size={14} className="text-purple-500" /> Viewer
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Icon - Small Circle */}
            <button className="p-2 bg-white border border-gray-100 rounded-full text-orange-400 hover:bg-gray-50 shadow-sm">
              <Moon size={16} fill="currentColor" />
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 text-slate-500"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-sm font-medium ${
                activeTab === item.name
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-500"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
