import { AlertTriangle, Check, Edit2, Plus, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type Doctor, useApp } from "../../context/AppContext";

type FormData = Omit<Doctor, "id">;
const EMPTY_FORM: FormData = {
  name: "",
  specialty: "",
  qualifications: "",
  schedule: "",
};

const FIELDS = [
  { label: "Full Name", key: "name" as const, placeholder: "Dr. First Last" },
  {
    label: "Specialty",
    key: "specialty" as const,
    placeholder: "e.g. Cardiologist",
  },
  {
    label: "Qualifications",
    key: "qualifications" as const,
    placeholder: "e.g. MBBS, MD",
  },
  {
    label: "Schedule",
    key: "schedule" as const,
    placeholder: "e.g. Mon, Wed 6 PM",
  },
];

export default function DoctorManagement() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };
  const openEdit = (doctor: Doctor) => {
    setForm({
      name: doctor.name,
      specialty: doctor.specialty,
      qualifications: doctor.qualifications,
      schedule: doctor.schedule,
    });
    setEditingId(doctor.id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId !== null) {
        await updateDoctor(editingId, form);
      } else {
        await addDoctor(form);
      }
      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteDoctor(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Doctor Management
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {doctors.length} doctors registered
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/20"
        >
          <Plus size={16} />
          Add Doctor
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="font-bold text-slate-900 text-sm"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {editingId !== null ? "Edit Doctor" : "Add New Doctor"}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`doc-${field.key}`}
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={`doc-${field.key}`}
                  required
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.key]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                <Check size={15} />
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update"
                    : "Add Doctor"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {[
                  "Name",
                  "Specialty",
                  "Qualifications",
                  "Schedule",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td
                    className="px-4 py-3 font-semibold text-slate-900"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    {doctor.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">
                    {doctor.specialty}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {doctor.qualifications}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {doctor.schedule}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(doctor)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(doctor.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
              <div>
                <h3
                  className="font-bold text-slate-900"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  Delete Doctor?
                </h3>
                <p className="text-slate-500 text-sm">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
