import { ArrowLeft, Cross, Eye, EyeOff, Lock, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

interface AdminLoginProps {
  onNavigate: (path: string) => void;
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const { login } = useApp();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(form.username, form.password);
    if (ok) {
      onNavigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Website
        </button>

        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8 shadow-2xl shadow-emerald-900/10 border border-white/50"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-900/20">
              <Cross size={24} className="text-white fill-white" />
            </div>
            <h1
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              Admin Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Radharani Pharmacy Management
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, username: e.target.value }));
                    setError("");
                  }}
                  placeholder="Enter username"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, password: e.target.value }));
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
