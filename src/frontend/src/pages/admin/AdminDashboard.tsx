import {
  Cross,
  FileText,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import DoctorManagement from "./DoctorManagement";
import GlobalSettings from "./GlobalSettings";
import InquiriesTable from "./InquiriesTable";

type Tab = "doctors" | "inquiries" | "settings";

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { isAuthenticated, logout, inquiries } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("doctors");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    onNavigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    onNavigate("/admin");
  };

  const navItems: {
    tab: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { tab: "doctors", label: "Doctors", icon: <Users size={18} /> },
    {
      tab: "inquiries",
      label: "Inquiries",
      icon: <FileText size={18} />,
      badge: inquiries.length,
    },
    { tab: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Cross size={14} className="text-white fill-white" />
          </div>
          <div>
            <p
              className="font-bold text-white text-xs leading-tight"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              Radharani Pharmacy
            </p>
            <p className="text-emerald-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.tab}
            onClick={() => {
              setActiveTab(item.tab);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.tab
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-slate-900 flex-col flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <aside className="relative w-60 bg-slate-900 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            className="md:hidden text-slate-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1
            className="font-bold text-slate-900 capitalize text-lg"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {activeTab === "doctors"
              ? "Doctor Management"
              : activeTab === "inquiries"
                ? "Inquiries & Prescriptions"
                : "Global Settings"}
          </h1>
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="ml-auto text-xs text-slate-500 hover:text-emerald-600 transition-colors"
          >
            View Website →
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "doctors" && <DoctorManagement />}
          {activeTab === "inquiries" && <InquiriesTable />}
          {activeTab === "settings" && <GlobalSettings />}
        </main>
      </div>
    </div>
  );
}
