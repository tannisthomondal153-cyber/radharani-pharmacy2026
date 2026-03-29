import { Cross, Menu, Phone, Pill, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function Header({ onNavigate, currentPath }: HeaderProps) {
  const { settings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (currentPath !== "/") {
      onNavigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", action: () => scrollTo("hero") },
    { label: "Doctors", action: () => scrollTo("doctors") },
    { label: "Payments", action: () => scrollTo("payments") },
    { label: "Location", action: () => scrollTo("location") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/85 border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-md shadow-emerald-900/20">
              <Cross size={18} className="text-white fill-white" />
            </div>
            <div className="text-left">
              <span
                className="block font-bold text-slate-900 text-sm leading-tight"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Radharani Pharmacy
              </span>
              <span className="block text-xs text-emerald-600 leading-tight">
                Chemist &amp; Druggist
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={link.action}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone1.replace(/\s/g, "")}`}
              className="pulse-cta hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Phone size={15} />
              <span>{settings.phone1}</span>
            </a>
            <button
              type="button"
              className="md:hidden text-slate-700 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-slate-100">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={link.action}
                className="block w-full text-left px-2 py-2.5 text-sm font-medium text-slate-700 hover:text-emerald-600"
              >
                {link.label}
              </button>
            ))}
            <a
              href={`tel:${settings.phone1.replace(/\s/g, "")}`}
              className="mt-2 flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl w-full justify-center"
            >
              <Phone size={15} />
              {settings.phone1}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
