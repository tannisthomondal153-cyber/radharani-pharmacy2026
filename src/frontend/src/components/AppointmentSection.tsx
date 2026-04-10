import {
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Phone,
  Stethoscope,
  User,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createActorWithConfig } from "../config";
import { type DeviceLogin, useApp } from "../context/AppContext";

const DOCTORS = [
  "Dr. Alimpan Basak",
  "Dr. Gaurav Taparia",
  "Dr. Kaushik Ray",
  "Dr. Tuhin Shubhra Sarkar",
  "Dr. Tanima Garai",
  "Dr. Sandipta Ghosh",
  "Dr. Krishnendu Das",
  "Dr. Rahul Dey",
  "Dr. Jagnnath Saha",
];

interface LoginForm {
  name: string;
  contact: string;
}

interface LoginErrors {
  name?: string;
  contact?: string;
}

interface BookingForm {
  name: string;
  phone: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
}

interface BookingErrors {
  name?: string;
  phone?: string;
  doctor?: string;
  date?: string;
  time?: string;
  reason?: string;
}

type ToastType = "success" | "error";
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

function getTodayStr() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

// ─── Device Login Modal ────────────────────────────────────────────────────────
function LoginModal({ onSuccess }: { onSuccess: (dl: DeviceLogin) => void }) {
  const [form, setForm] = useState<LoginForm>({ name: "", contact: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const validate = (): boolean => {
    const errs: LoginErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your full name (at least 2 characters).";
    }
    if (!form.contact.trim()) {
      errs.contact = "Phone number or email is required.";
    } else {
      const isPhone = /^[6-9]\d{9}$/.test(form.contact.replace(/\s/g, ""));
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact);
      if (!isPhone && !isEmail) {
        errs.contact = "Enter a valid 10-digit phone number or email address.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;
    const dl: DeviceLogin = {
      name: form.name.trim(),
      phone: form.contact.trim(),
      loggedInAt: Date.now(),
    };
    onSuccess(dl);
  };

  const inputBase =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm transition-all duration-200 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-white/8";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl relative"
      >
        {/* Emerald glow */}
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(16,185,129,0.7),transparent)",
          }}
        />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 mb-4">
            <User size={24} className="text-emerald-400" />
          </div>
          <h2
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Quick Login to Book Appointment
          </h2>
          <p className="text-white/50 text-xs">
            One-time login — valid for 4 weeks on this device.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="login-name-input"
              className="block text-xs font-medium text-white/60 mb-1.5"
            >
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="login-name-input"
              ref={nameRef}
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                if (submitted) validate();
              }}
              placeholder="Your full name"
              className={inputBase}
              data-ocid="login-name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-contact-input"
              className="block text-xs font-medium text-white/60 mb-1.5"
            >
              Phone Number or Email <span className="text-rose-400">*</span>
            </label>
            <input
              id="login-contact-input"
              type="text"
              value={form.contact}
              onChange={(e) => {
                setForm((f) => ({ ...f, contact: e.target.value }));
                if (submitted) validate();
              }}
              placeholder="98XXXXXXXX or you@example.com"
              className={inputBase}
              data-ocid="login-contact"
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-rose-400">{errors.contact}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-full mt-2 py-3 rounded-xl font-semibold text-sm text-white"
            style={{
              background: "linear-gradient(135deg,#10b981,#3B82F6)",
            }}
            data-ocid="login-submit"
          >
            Continue to Booking
          </motion.button>
        </form>

        <p className="text-center text-white/30 text-xs mt-4">
          No OTP or password required. Your info stays private.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Toast Notification ────────────────────────────────────────────────────────
function ToastBar({
  toast,
  onDismiss,
}: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isSuccess = toast.type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl border max-w-sm w-full text-sm
        ${isSuccess ? "bg-emerald-900/80 border-emerald-500/30 text-emerald-100" : "bg-rose-900/80 border-rose-500/30 text-rose-100"}
        backdrop-blur-md`}
    >
      {isSuccess ? (
        <CheckCircle
          size={18}
          className="text-emerald-400 flex-shrink-0 mt-0.5"
        />
      ) : (
        <XCircle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
      )}
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="opacity-50 hover:opacity-100 transition-opacity mt-0.5"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function AppointmentSection() {
  const { deviceLogin, setDeviceLogin, isDeviceLoginValid } = useApp();

  const [showLogin, setShowLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const isLoggedIn = isDeviceLoginValid();

  const [form, setForm] = useState<BookingForm>({
    name: deviceLogin?.name ?? "",
    phone: deviceLogin?.phone ?? "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof BookingForm, boolean>>
  >({});

  // Sync form prefill when deviceLogin changes
  useEffect(() => {
    if (deviceLogin) {
      setForm((f) => ({
        ...f,
        name: f.name || deviceLogin.name,
        phone: f.phone || deviceLogin.phone,
      }));
    }
  }, [deviceLogin]);

  const addToast = (type: ToastType, message: string) => {
    const id = toastCounter + 1;
    setToastCounter(id);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validate = (f: BookingForm): BookingErrors => {
    const errs: BookingErrors = {};
    if (!f.name.trim() || f.name.trim().length < 2)
      errs.name = "Full name is required.";
    if (!f.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else {
      const isPhone = /^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""));
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.phone);
      if (!isPhone && !isEmail)
        errs.phone = "Enter a valid 10-digit phone number or email.";
    }
    if (!f.doctor) errs.doctor = "Please select a doctor.";
    if (!f.date) {
      errs.date = "Preferred date is required.";
    } else if (f.date < getTodayStr()) {
      errs.date = "Date cannot be in the past.";
    }
    if (!f.time) errs.time = "Preferred time is required.";
    if (!f.reason.trim() || f.reason.trim().length < 5)
      errs.reason =
        "Please describe your reason for visit (at least 5 characters).";
    return errs;
  };

  const handleBlur = (field: keyof BookingForm) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleChange = (field: keyof BookingForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof BookingForm)[]).map((k) => [k, true]),
    ) as Partial<Record<keyof BookingForm, boolean>>;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const actor = await createActorWithConfig();
      await actor.addAppointment(
        form.name.trim(),
        form.phone.trim(),
        form.doctor,
        form.date,
        form.time,
        form.reason.trim(),
      );
      addToast(
        "success",
        "Appointment requested! Our team will confirm shortly.",
      );
      // Reset only booking-specific fields, keep name/phone
      setForm((f) => ({ ...f, doctor: "", date: "", time: "", reason: "" }));
      setTouched({});
      setErrors({});
    } catch {
      addToast(
        "error",
        "Failed to submit appointment. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSuccess = (dl: DeviceLogin) => {
    setDeviceLogin(dl);
    setForm((f) => ({ ...f, name: dl.name, phone: dl.phone }));
    setShowLogin(false);
  };

  const handleChangeLogin = () => {
    setDeviceLogin(null);
    setShowLogin(true);
  };

  const inputBase =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm transition-all duration-200 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 focus:bg-white/[0.07]";
  const inputError =
    "border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-400/20";

  return (
    <section
      id="appointment-section"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,rgba(15,23,42,0.98) 0%,rgba(2,44,34,0.15) 50%,rgba(15,23,42,0.98) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle,#10b981,transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle,#3B82F6,transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Stethoscope size={12} />
            Book a Consultation
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              fontFamily: "Poppins,sans-serif",
              background: "linear-gradient(135deg,#10b981,#3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Book an Appointment
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto">
            Consult with our specialist doctors — professional care at your
            convenience
          </p>
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
            delay: 0.1,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Card top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(16,185,129,0.5),rgba(59,130,246,0.4),transparent)",
            }}
          />

          {/* Logged-in pill or Login CTA */}
          <div className="mb-6">
            {isLoggedIn && deviceLogin ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="flex items-center justify-between gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5"
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-emerald-300 font-medium">
                    Logged in as{" "}
                    <span className="text-white font-semibold">
                      {deviceLogin.name}
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleChangeLogin}
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-white/80 transition-colors"
                  data-ocid="login-change"
                >
                  <LogOut size={12} />
                  Change
                </button>
              </motion.div>
            ) : (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-sm text-blue-300 flex items-center justify-between gap-3">
                <span>Please log in to book an appointment.</span>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-blue-500 px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
                  data-ocid="login-trigger"
                >
                  Login Now
                </button>
              </div>
            )}
          </div>

          {/* Booking Form — only when logged in */}
          <AnimatePresence>
            {isLoggedIn && (
              <motion.form
                key="booking-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="space-y-5"
                data-ocid="appointment-form"
              >
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="appt-name-input"
                      className="block text-xs font-medium text-white/60 mb-1.5"
                    >
                      <User size={11} className="inline mr-1 opacity-70" />
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="appt-name-input"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="Your full name"
                      className={`${inputBase} ${touched.name && errors.name ? inputError : ""}`}
                      data-ocid="appt-name"
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-phone-input"
                      className="block text-xs font-medium text-white/60 mb-1.5"
                    >
                      <Phone size={11} className="inline mr-1 opacity-70" />
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="appt-phone-input"
                      type="text"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      placeholder="10-digit mobile number"
                      className={`${inputBase} ${touched.phone && errors.phone ? inputError : ""}`}
                      data-ocid="appt-phone"
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Doctor Select */}
                <div>
                  <label
                    htmlFor="appt-doctor-select"
                    className="block text-xs font-medium text-white/60 mb-1.5"
                  >
                    <Stethoscope size={11} className="inline mr-1 opacity-70" />
                    Choose Doctor <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="appt-doctor-select"
                    value={form.doctor}
                    onChange={(e) => handleChange("doctor", e.target.value)}
                    onBlur={() => handleBlur("doctor")}
                    className={`${inputBase} ${touched.doctor && errors.doctor ? inputError : ""} cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff40' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      appearance: "none",
                    }}
                    data-ocid="appt-doctor"
                  >
                    <option value="" disabled style={{ background: "#0f172a" }}>
                      Select a specialist
                    </option>
                    {DOCTORS.map((d) => (
                      <option
                        key={d}
                        value={d}
                        style={{ background: "#0f172a" }}
                      >
                        {d}
                      </option>
                    ))}
                  </select>
                  {touched.doctor && errors.doctor && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.doctor}
                    </p>
                  )}
                </div>

                {/* Row 2: Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="appt-date-input"
                      className="block text-xs font-medium text-white/60 mb-1.5"
                    >
                      <Calendar size={11} className="inline mr-1 opacity-70" />
                      Preferred Date <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="appt-date-input"
                      type="date"
                      value={form.date}
                      min={getTodayStr()}
                      onChange={(e) => handleChange("date", e.target.value)}
                      onBlur={() => handleBlur("date")}
                      className={`${inputBase} ${touched.date && errors.date ? inputError : ""}`}
                      style={{ colorScheme: "dark" }}
                      data-ocid="appt-date"
                    />
                    {touched.date && errors.date && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="appt-time-input"
                      className="block text-xs font-medium text-white/60 mb-1.5"
                    >
                      <Clock size={11} className="inline mr-1 opacity-70" />
                      Preferred Time <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="appt-time-input"
                      type="time"
                      value={form.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      onBlur={() => handleBlur("time")}
                      className={`${inputBase} ${touched.time && errors.time ? inputError : ""}`}
                      style={{ colorScheme: "dark" }}
                      data-ocid="appt-time"
                    />
                    {touched.time && errors.time && (
                      <p className="mt-1 text-xs text-rose-400">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="appt-reason-textarea"
                    className="block text-xs font-medium text-white/60 mb-1.5"
                  >
                    Reason for Visit <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="appt-reason-textarea"
                    value={form.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                    onBlur={() => handleBlur("reason")}
                    placeholder="Describe your concern or reason for visit..."
                    rows={3}
                    className={`${inputBase} resize-none ${touched.reason && errors.reason ? inputError : ""}`}
                    data-ocid="appt-reason"
                  />
                  {touched.reason && errors.reason && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.reason}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                  style={{
                    background: isSubmitting
                      ? "linear-gradient(135deg,#059669,#2563eb)"
                      : "linear-gradient(135deg,#10b981,#3B82F6)",
                  }}
                  data-ocid="appt-submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        aria-hidden="true"
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      />
                      Submitting Appointment…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Calendar size={16} />
                      Request Appointment
                    </span>
                  )}
                </motion.button>

                <p className="text-center text-white/30 text-xs">
                  Your booking will be reviewed by our team and confirmed via
                  phone.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && <LoginModal onSuccess={handleLoginSuccess} />}
      </AnimatePresence>

      {/* Toast Stack */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastBar toast={t} onDismiss={() => removeToast(t.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
