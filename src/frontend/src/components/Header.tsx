import { Calendar, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const HEALTH_TIPS = [
  "💊 Always complete your antibiotic course as prescribed",
  "🌿 Stay hydrated — drink 8 glasses of water daily",
  "🩺 Schedule regular health check-ups every 6 months",
  "💉 Keep your vaccinations up to date for full protection",
  "🍎 A balanced diet reduces your risk of chronic disease by 80%",
  "😴 Quality sleep of 7-8 hours boosts your immune system",
  "🏃 30 minutes of daily exercise improves heart health significantly",
  "🌞 Vitamin D — spend 15 minutes in sunlight every morning",
  "🧴 Always store medicines away from heat and moisture",
  "❤️ Check your blood pressure regularly — hypertension is silent",
];

export default function Header({ onNavigate, currentPath }: HeaderProps) {
  const { settings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % HEALTH_TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (currentPath !== "/") {
      onNavigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { label: "Home", action: () => scrollTo("hero") },
    { label: "Doctors", action: () => scrollTo("doctors") },
    { label: "Appointments", action: () => scrollTo("appointment-section") },
    { label: "Payments", action: () => scrollTo("payments") },
    { label: "Location", action: () => scrollTo("location") },
    { label: "Contact", action: () => scrollTo("contact") },
    { label: "Reviews", action: () => onNavigate("/reviews") },
    { label: "Blog", action: () => onNavigate("/blog") },
  ];

  const isAdmin = currentPath.startsWith("/admin");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/85 border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
            data-ocid="header.link"
          >
            <img
              src="/assets/1000140718-019d49d7-9b4a-770b-9ad2-98d53769fbb0.png"
              alt="Radharani Pharmacy Logo"
              className="w-9 h-9 object-contain"
            />
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
                data-ocid="header.link"
                className="relative text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("appointment-section")}
              className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
              data-ocid="header.book-appointment"
            >
              <Calendar size={13} />
              Book Appointment
            </button>
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
              data-ocid="header.toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="md:hidden overflow-hidden border-t border-slate-100"
            >
              <div className="pb-4 pt-2">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.label}
                    onClick={link.action}
                    data-ocid="header.link"
                    className="block w-full text-left px-2 py-2.5 text-sm font-medium text-slate-700 hover:text-emerald-600 active:text-emerald-700"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Health Tips Ticker */}
      {!isAdmin && (
        <div className="bg-emerald-600/90 text-white text-xs py-1 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <span className="text-emerald-200 font-semibold whitespace-nowrap">
              Health Tip:
            </span>
            <div className="flex-1 overflow-hidden relative h-5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center whitespace-nowrap"
                >
                  {HEALTH_TIPS[tipIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
