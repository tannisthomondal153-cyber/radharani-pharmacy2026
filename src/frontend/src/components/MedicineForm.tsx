import {
  CheckCircle,
  FileText,
  Loader2,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const WA_BASE = "https://wa.me/919831279222?text=";

export default function MedicineForm() {
  const { addInquiry } = useApp();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    medicines: "",
    hasPrescription: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addInquiry({
      name: form.name,
      phone: form.phone,
      medicines: form.medicines,
    });
    const text = encodeURIComponent(
      `Hello Radharani Pharmacy, I want to order medicines:\nName: ${form.name}\nPhone: ${form.phone}\nMedicines: ${form.medicines}${form.hasPrescription ? "\n(I have a prescription)" : ""}`,
    );
    setTimeout(() => {
      window.open(WA_BASE + text, "_blank");
      setLoading(false);
      setShowToast(true);
      setForm({ name: "", phone: "", medicines: "", hasPrescription: false });
      setTimeout(() => setShowToast(false), 4000);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-emerald-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Quick Order
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Order Medicines
          </h2>
          <p className="text-slate-500">
            Fill in your details and we'll process your order via WhatsApp
            instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto glass rounded-3xl p-8 shadow-2xl shadow-emerald-900/10 border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="order-name"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="order-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="order-phone"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="order-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="order-medicines"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Medicine Details
              </label>
              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-3 top-3.5 text-slate-400"
                />
                <textarea
                  id="order-medicines"
                  required
                  value={form.medicines}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, medicines: e.target.value }))
                  }
                  placeholder="List the medicines you need..."
                  rows={4}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.hasPrescription}
                onChange={(e) =>
                  setForm((f) => ({ ...f, hasPrescription: e.target.checked }))
                }
                className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-600">
                I have a prescription
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <MessageCircle size={18} />
              )}
              {loading ? "Sending..." : "Send Order via WhatsApp"}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className="fixed top-20 right-4 z-50 bg-white rounded-2xl p-4 shadow-2xl border border-emerald-200 flex items-center gap-3 max-w-sm"
          >
            <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Order Sent!
              </p>
              <p className="text-xs text-slate-500">
                We'll confirm your order shortly via WhatsApp.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
