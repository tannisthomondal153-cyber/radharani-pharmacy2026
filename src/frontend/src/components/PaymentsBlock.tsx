import { CheckCircle, Copy, CreditCard, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const UPI_QR =
  "/assets/uploads/850a9f1ffb0b967c1a81ce9174bd1f47-019d3777-930e-75dc-a161-a1ba76607789-1.webp";

export default function PaymentsBlock() {
  const { settings } = useApp();
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(settings.upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="payments"
      className="py-20 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 section-glow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            100% Secure
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Secure Digital Payments
          </h2>
          <p className="text-slate-500">
            Pay easily using UPI. Scan the QR code or copy the UPI ID below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          whileHover={{ boxShadow: "0 30px 70px rgba(16,185,129,0.15)", y: -4 }}
          className="max-w-3xl mx-auto glass rounded-3xl p-8 shadow-2xl shadow-emerald-900/10 border border-white/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left - UPI Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CreditCard size={18} className="text-emerald-600" />
                </div>
                <h3
                  className="font-bold text-slate-900"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  UPI Payment
                </h3>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1 font-medium">
                  UPI ID
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 break-all">
                  {settings.upiId}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={copyUPI}
                className={`flex items-center gap-2 w-full justify-center py-3 rounded-xl font-semibold text-sm transition-all shimmer-btn ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy UPI ID"}
              </motion.button>

              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2">Accepted via</p>
                <div className="flex gap-2 flex-wrap">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <span
                      key={app}
                      className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - QR Code */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.15,
                }}
                className="w-52 h-52 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-lg bg-white flex items-center justify-center"
              >
                <img
                  src={UPI_QR}
                  alt="UPI QR Code – Scan to Pay"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div className="flex items-center gap-1.5 mt-3">
                <Smartphone size={14} className="text-slate-400" />
                <span className="text-xs text-slate-500">
                  Open any UPI app &amp; scan
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
