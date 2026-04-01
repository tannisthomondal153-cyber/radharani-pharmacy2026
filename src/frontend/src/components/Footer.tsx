import { Clock, Cross, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

const WA_LINK =
  "https://wa.me/919831279222?text=Hello%20Radharani%20Pharmacy,%20I%20want%20to%20order%20medicines:%20";

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  const { settings } = useApp();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* About */}
            <motion.div
              variants={columnVariants}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Cross size={14} className="text-white fill-white" />
                </div>
                <span
                  className="font-bold text-white text-sm"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  Radharani Pharmacy
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your trusted neighborhood pharmacy in Kolkata. Providing quality
                medicines and healthcare services since 2025.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={columnVariants}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <h4
                className="font-semibold text-white mb-4 text-sm"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["hero", "doctors", "payments", "location", "contact"].map(
                  (id) => (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(id)}
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors capitalize"
                      >
                        {id === "hero"
                          ? "Home"
                          : id.charAt(0).toUpperCase() + id.slice(1)}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              variants={columnVariants}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <h4
                className="font-semibold text-white mb-4 text-sm"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Prescription Medicines",
                  "OTC Medicines",
                  "Doctor Consultations",
                  "UPI Payments",
                  "WhatsApp Orders",
                  "Home Delivery",
                ].map((s) => (
                  <li key={s} className="text-sm text-slate-400">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={columnVariants}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <h4
                className="font-semibold text-white mb-4 text-sm"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-400">
                    D/5 Shahid Bandhu Nagar Colony, 2no Gate, Near Nag Sweet,
                    Kolkata
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-emerald-500 flex-shrink-0" />
                  <a
                    href={`tel:${settings.phone1.replace(/\s/g, "")}`}
                    className="text-sm text-slate-400 hover:text-emerald-400"
                  >
                    {settings.phone1}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-400 whitespace-pre-line">
                    {settings.businessHours}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Radharani Pharmacy. All rights
              reserved.
            </p>
            <p className="text-xs text-slate-500">
              Licensed Chemist &amp; Druggist | Govt. Approved
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-900/30 transition-colors pulse-cta"
        whileHover={{ y: -4, scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <MessageCircle size={26} className="text-white fill-white" />
      </motion.a>
    </>
  );
}
