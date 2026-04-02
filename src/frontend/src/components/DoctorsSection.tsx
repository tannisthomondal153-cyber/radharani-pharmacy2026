import {
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  MessageCircle,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { type Doctor, useApp } from "../context/AppContext";

const SPECIALTY_COLORS: Record<string, string> = {
  "General Physician": "bg-emerald-100 text-emerald-700",
  "General Medicine": "bg-emerald-100 text-emerald-700",
  Orthopaedic: "bg-blue-100 text-blue-700",
  Paediatric: "bg-pink-100 text-pink-700",
  Paediatrician: "bg-pink-100 text-pink-700",
  Dermatologist: "bg-orange-100 text-orange-700",
  Psychiatrist: "bg-indigo-100 text-indigo-700",
  Gynaecologist: "bg-rose-100 text-rose-700",
  ENT: "bg-teal-100 text-teal-700",
};

function getSpecialtyColor(specialty: string) {
  for (const key of Object.keys(SPECIALTY_COLORS)) {
    if (specialty.includes(key)) return SPECIALTY_COLORS[key];
  }
  return "bg-slate-100 text-slate-700";
}

function getInitials(name: string) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-emerald-400 to-emerald-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-teal-400 to-teal-600",
  "from-orange-400 to-orange-600",
  "from-indigo-400 to-indigo-600",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
];

function BookingModal({
  doctor,
  onClose,
}: { doctor: Doctor; onClose: () => void }) {
  const waLink = `https://wa.me/919831279222?text=Hello%20Radharani%20Pharmacy,%20I%20want%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doctor.name)}:%20`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/50 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="text-center mb-5">
          <div
            className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[0]} flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md`}
          >
            {getInitials(doctor.name)}
          </div>
          <h3
            className="font-bold text-slate-900 text-lg mb-1"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {doctor.name}
          </h3>
          <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
            <GraduationCap size={14} className="text-blue-500" />
            <span className="font-medium">{doctor.qualifications}</span>
          </div>
        </div>
        <div className="space-y-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl w-full transition-colors"
          >
            <MessageCircle size={18} />
            Book via WhatsApp
          </a>
          <a
            href="tel:+916289660967"
            className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-xl w-full transition-colors"
          >
            <Phone size={18} />
            Call to Book
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function DoctorsSection() {
  const { doctors } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 18 },
    },
  };

  return (
    <section
      id="doctors"
      className="py-20 bg-gradient-to-b from-white to-emerald-50/30 section-glow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center mb-6"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Expert Care
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Our Medical Team
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            We take pride in offering comprehensive healthcare services through
            a panel of highly qualified and experienced medical professionals,
            each dedicated to delivering patient-centered, evidence-based care.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              variants={item}
              className="glass rounded-2xl p-6 shadow-xl shadow-emerald-900/8 border border-white/40 flex flex-col"
              whileHover={{
                y: -6,
                boxShadow: "0 24px 48px rgba(16,185,129,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              {/* Header: Avatar + Name + Specialty */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}
                >
                  {getInitials(doctor.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-slate-900 text-sm leading-tight mb-1"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    {doctor.name}
                  </h3>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${getSpecialtyColor(doctor.specialty)}`}
                  >
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2.5 mb-4 flex-1">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <GraduationCap
                    size={14}
                    className="text-blue-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-700">
                      Qualifications:{" "}
                    </span>
                    <span>{doctor.qualifications}</span>
                  </div>
                </div>

                {doctor.specialization && (
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <Award
                      size={14}
                      className="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-slate-700">
                        Specialization:{" "}
                      </span>
                      <span>{doctor.specialization}</span>
                    </div>
                  </div>
                )}

                {doctor.experience && (
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <BookOpen
                      size={14}
                      className="text-purple-500 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-slate-700">
                        Experience:{" "}
                      </span>
                      <span>{doctor.experience}</span>
                    </div>
                  </div>
                )}

                {doctor.position && (
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <BookOpen
                      size={14}
                      className="text-purple-500 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-slate-700">
                        Position:{" "}
                      </span>
                      <span>{doctor.position}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Clock
                    size={14}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-700">
                      Availability:{" "}
                    </span>
                    <span>{doctor.schedule}</span>
                  </div>
                </div>

                {doctor.description && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                    {doctor.description}
                  </p>
                )}
              </div>

              {/* Book Button */}
              <motion.button
                type="button"
                className="w-full bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <Stethoscope size={15} />
                Book Appointment
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDoctor && (
          <BookingModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
