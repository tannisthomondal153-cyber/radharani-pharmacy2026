import {
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle,
  Cross,
  Edit2,
  FileText,
  LogOut,
  Menu,
  Plus,
  Settings,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActorWithConfig } from "../../config";
import { useApp } from "../../context/AppContext";
import type { Appointment, BlogPost } from "../../context/AppContext";
import DoctorManagement from "./DoctorManagement";
import GlobalSettings from "./GlobalSettings";
import InquiriesTable from "./InquiriesTable";

type Tab = "doctors" | "inquiries" | "settings" | "appointments" | "blog";
type AppointmentFilter = "all" | "pending" | "confirmed" | "cancelled";

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

// ─── Appointments Tab ────────────────────────────────────────────────────────
function AppointmentsTab() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AppointmentFilter>("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const actor = await createActorWithConfig();
      const raw = await actor.getAppointments();
      const mapped: Appointment[] = raw.map((a) => ({
        id: Number(a.id),
        customerName: a.customerName,
        phone: a.phone,
        doctorName: a.doctorName,
        preferredDate: a.preferredDate,
        preferredTime: a.preferredTime,
        reason: a.reason,
        status:
          (a.status as "pending" | "confirmed" | "cancelled") || "pending",
        createdAt: Number(a.createdAt),
      }));
      mapped.sort((a, b) => b.createdAt - a.createdAt);
      setAppointments(mapped);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (
    id: number,
    status: "confirmed" | "cancelled",
  ) => {
    setUpdatingId(id);
    try {
      const actor = await createActorWithConfig();
      await actor.updateAppointmentStatus(BigInt(id), status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a)),
      );
    } catch {
      /* ignore */
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const filterCounts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  const statusBadge = (status: string) => {
    if (status === "confirmed")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
          <CheckCircle size={11} /> Confirmed
        </span>
      );
    if (status === "cancelled")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <X size={11} /> Cancelled
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        <AlertTriangle size={11} /> Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {["sk1", "sk2", "sk3", "sk4"].map((k) => (
          <div
            key={k}
            className="h-20 rounded-2xl bg-slate-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(
          ["all", "pending", "confirmed", "cancelled"] as AppointmentFilter[]
        ).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              filter === f
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f}
            <span
              className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                filter === f
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {filterCounts[f]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Calendar size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No appointments found</p>
          <p className="text-slate-400 text-sm mt-1">
            {filter === "all"
              ? "Appointment requests will appear here."
              : `No ${filter} appointments yet.`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Patient
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Doctor
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Date & Time
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Reason
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((appt, idx) => (
                  <motion.tr
                    key={appt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">
                        {appt.customerName}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {appt.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">
                      {appt.doctorName}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-800">{appt.preferredDate}</p>
                      <p className="text-slate-500 text-xs">
                        {appt.preferredTime}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[180px]">
                      <p className="truncate" title={appt.reason}>
                        {appt.reason}
                      </p>
                    </td>
                    <td className="px-4 py-3">{statusBadge(appt.status)}</td>
                    <td className="px-4 py-3">
                      {appt.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={updatingId === appt.id}
                            onClick={() => updateStatus(appt.id, "confirmed")}
                            data-ocid="confirm-appointment-btn"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all disabled:opacity-50"
                          >
                            <Check size={12} /> Confirm
                          </button>
                          <button
                            type="button"
                            disabled={updatingId === appt.id}
                            onClick={() => updateStatus(appt.id, "cancelled")}
                            data-ocid="cancel-appointment-btn"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold transition-all disabled:opacity-50"
                          >
                            <X size={12} /> Cancel
                          </button>
                        </div>
                      )}
                      {appt.status !== "pending" && (
                        <span className="text-slate-400 text-xs italic">
                          No action needed
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Blog Tab ────────────────────────────────────────────────────────────────
function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const actor = await createActorWithConfig();
      const raw = await actor.getAllBlogPostsAdmin();
      const mapped: BlogPost[] = raw.map((p) => ({
        id: Number(p.id),
        title: p.title,
        content: p.content,
        publishedAt: Number(p.publishedAt),
        isPublished: p.isPublished,
      }));
      mapped.sort((a, b) => b.publishedAt - a.publishedAt);
      setPosts(mapped);
    } catch {
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [fetchPosts]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and content are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const actor = await createActorWithConfig();
      if (editId !== null) {
        await actor.updateBlogPost(
          BigInt(editId),
          title.trim(),
          content.trim(),
          true,
        );
        showToast("Post updated and published!");
      } else {
        await actor.addBlogPost(title.trim(), content.trim());
        showToast("Post published successfully!");
      }
      resetForm();
      await fetchPosts();
    } catch {
      showToast("Failed to publish post.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and content are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const actor = await createActorWithConfig();
      if (editId !== null) {
        await actor.updateBlogPost(
          BigInt(editId),
          title.trim(),
          content.trim(),
          false,
        );
        showToast("Draft saved.");
      } else {
        const newId = await actor.addBlogPost(title.trim(), content.trim());
        await actor.updateBlogPost(newId, title.trim(), content.trim(), false);
        showToast("Saved as draft.");
      }
      resetForm();
      await fetchPosts();
    } catch {
      showToast("Failed to save draft.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    try {
      const actor = await createActorWithConfig();
      await actor.deleteBlogPost(BigInt(id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showToast("Post deleted.");
    } catch {
      showToast("Failed to delete post.", "error");
    }
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-8">
      {/* Write/Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
      >
        <h2
          className="font-bold text-slate-900 text-lg mb-5"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          {editId !== null ? "✏️ Edit Post" : "✍️ Write New Post"}
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="blog-title"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Post Title
            </label>
            <input
              id="blog-title"
              data-ocid="blog-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title…"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="blog-content"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Content
            </label>
            <textarea
              id="blog-content"
              data-ocid="blog-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here…"
              rows={9}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all resize-y min-h-[200px]"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              type="button"
              data-ocid="blog-publish-btn"
              disabled={submitting}
              onClick={handlePublish}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50"
            >
              <CheckCircle size={15} />
              {submitting
                ? "Saving…"
                : editId !== null
                  ? "Update & Publish"
                  : "Publish Post"}
            </motion.button>
            <motion.button
              type="button"
              data-ocid="blog-draft-btn"
              disabled={submitting}
              onClick={handleSaveDraft}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all disabled:opacity-50"
            >
              <FileText size={15} />
              {submitting ? "Saving…" : "Save as Draft"}
            </motion.button>
            {editId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-all"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Posts List */}
      <div>
        <h2
          className="font-bold text-slate-900 text-lg mb-4"
          style={{ fontFamily: "Poppins,sans-serif" }}
        >
          All Posts
        </h2>
        {loadingPosts ? (
          <div className="space-y-3">
            {["bsk1", "bsk2", "bsk3"].map((k) => (
              <div
                key={k}
                className="h-20 rounded-2xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <FileText size={36} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No posts yet</p>
            <p className="text-slate-400 text-sm mt-1">
              Write your first post above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className="font-semibold text-slate-900 truncate"
                        style={{ fontFamily: "Poppins,sans-serif" }}
                      >
                        {post.title}
                      </h3>
                      {post.isPublished ? (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                          Published
                        </span>
                      ) : (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs line-clamp-1">
                      {post.content}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      data-ocid="blog-edit-btn"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-all"
                    >
                      <Edit2 size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(post.id)}
                      data-ocid="blog-delete-btn"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirm Dialog */}
      <AnimatePresence>
        {deleteConfirmId !== null && (
          <motion.div
            key="delete-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 size={18} className="text-red-600" />
                </div>
                <div>
                  <h3
                    className="font-bold text-slate-900"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    Delete Post?
                  </h3>
                  <p className="text-slate-500 text-sm">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  data-ocid="blog-confirm-delete-btn"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="blog-toast"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-semibold max-w-xs text-center ${
              toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
            }`}
          >
            {toast.type === "error" ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { isAuthenticated, logout, inquiries } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("doctors");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    onNavigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    onNavigate("/admin");
  };

  const navItems: {
    tab: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { tab: "doctors", label: "Doctors", icon: <Users size={18} /> },
    {
      tab: "inquiries",
      label: "Inquiries",
      icon: <FileText size={18} />,
      badge: inquiries.length,
    },
    { tab: "settings", label: "Settings", icon: <Settings size={18} /> },
    {
      tab: "appointments",
      label: "Appointments",
      icon: <Calendar size={18} />,
    },
    { tab: "blog", label: "Blog", icon: <Edit2 size={18} /> },
  ];

  const tabTitle: Record<Tab, string> = {
    doctors: "Doctor Management",
    inquiries: "Inquiries & Prescriptions",
    appointments: "Appointment Requests",
    blog: "Blog Management",
    settings: "Global Settings",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Cross size={14} className="text-white fill-white" />
          </div>
          <div>
            <p
              className="font-bold text-white text-xs leading-tight"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              Radharani Pharmacy
            </p>
            <p className="text-emerald-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.tab}
            onClick={() => {
              setActiveTab(item.tab);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.tab
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-slate-900 flex-col flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <aside className="relative w-60 bg-slate-900 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            className="md:hidden text-slate-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1
            className="font-bold text-slate-900 text-lg"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            {tabTitle[activeTab]}
          </h1>
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="ml-auto text-xs text-slate-500 hover:text-emerald-600 transition-colors"
          >
            View Website →
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "doctors" && <DoctorManagement />}
          {activeTab === "inquiries" && <InquiriesTable />}
          {activeTab === "appointments" && <AppointmentsTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "settings" && <GlobalSettings />}
        </main>
      </div>
    </div>
  );
}
