import { CheckCircle, Save, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const FIELDS = [
  {
    label: "Business Hours",
    key: "businessHours" as const,
    placeholder: "Mon-Sat: 8 AM – 10 PM",
    type: "text",
  },
  {
    label: "Primary Phone",
    key: "phone1" as const,
    placeholder: "+91 XXXXX XXXXX",
    type: "tel",
  },
  {
    label: "Secondary Phone",
    key: "phone2" as const,
    placeholder: "+91 XXXXX XXXXX",
    type: "tel",
  },
  {
    label: "UPI ID",
    key: "upiId" as const,
    placeholder: "yourname@upi",
    type: "text",
  },
];

export default function GlobalSettings() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Settings size={18} className="text-emerald-600" />
        </div>
        <div>
          <h2
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Global Settings
          </h2>
          <p className="text-sm text-slate-500">
            Changes reflect on the public website immediately.
          </p>
        </div>
      </div>

      <div className="max-w-lg">
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5"
        >
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`setting-${field.key}`}
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                {field.label}
              </label>
              <input
                id={`setting-${field.key}`}
                type={field.type}
                value={form[field.key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [field.key]: e.target.value }))
                }
                placeholder={field.placeholder}
                className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 text-sm disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>

        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm"
            >
              <CheckCircle size={16} />
              Settings saved and applied globally!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
