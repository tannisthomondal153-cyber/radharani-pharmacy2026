import {
  Award,
  Calendar,
  Heart,
  MessageCircle,
  Pill,
  Shield,
  Star,
  Stethoscope,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const WA_LINK =
  "https://wa.me/919831279222?text=Hello%20Radharani%20Pharmacy,%20I%20want%20to%20order%20medicines:%20";

export default function Hero() {
  const scrollToDoctors = () => {
    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            >
              <Award size={14} />
              Trusted Since 1990
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              Trusted Local
              <span className="block text-emerald-600">Pharmacy</span>
              <span className="text-3xl sm:text-4xl">in Kolkata</span>
            </h1>

            <p
              className="text-xl font-semibold text-blue-600 mb-3"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              Quality Medicines. Trusted Care.
            </p>
            <p className="text-slate-500 text-base mb-8 max-w-lg">
              Your neighborhood healthcare partner. Licensed medicines, expert
              consultations, and personalized service for your family's health
              needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
              <button
                type="button"
                onClick={scrollToDoctors}
                className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <Calendar size={18} />
                Book Appointment
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600">🏥</span> Licensed Store
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600">💊</span> 10,000+ Medicines
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />{" "}
                4.9 Rating
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="glass rounded-3xl p-8 shadow-2xl shadow-emerald-900/15 border border-white/40">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 mb-4 flex items-center justify-center">
                  <div className="float-anim">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Heart, label: "Cardiology" },
                        { icon: Pill, label: "Pharmacy" },
                        { icon: Stethoscope, label: "Diagnosis" },
                        { icon: Shield, label: "Safety" },
                        { icon: Zap, label: "Fast Service" },
                        { icon: Award, label: "Certified" },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Icon size={20} className="text-white" />
                          </div>
                          <span className="text-white/80 text-xs font-medium">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="font-bold text-slate-900 text-lg"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    Radharani Pharmacy
                  </p>
                  <p className="text-slate-500 text-sm">
                    Your Health, Our Priority
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-emerald-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Licensed
                    </div>
                    <div className="text-xs text-slate-500">Govt. Approved</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-blue-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star size={14} className="text-blue-600 fill-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      4.9 / 5.0
                    </div>
                    <div className="text-xs text-slate-500">
                      Customer Rating
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
