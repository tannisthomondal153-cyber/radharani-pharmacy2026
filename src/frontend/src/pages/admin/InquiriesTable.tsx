import { FileText, Inbox, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../../context/AppContext";

export default function InquiriesTable() {
  const { inquiries, clearInquiries } = useApp();

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Inquiries & Prescriptions
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {inquiries.length} submissions received
          </p>
        </div>
        {inquiries.length > 0 && (
          <button
            type="button"
            onClick={clearInquiries}
            className="flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Trash2 size={15} />
            Clear All
          </button>
        )}
      </div>

      {inquiries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox size={28} className="text-slate-400" />
          </div>
          <p
            className="font-semibold text-slate-700"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            No inquiries yet
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Medicine orders submitted via the website will appear here.
          </p>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["Name", "Phone", "Medicines", "Submitted At"].map((h) => (
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
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {inq.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <a
                        href={`tel:${inq.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {inq.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs">
                      <div className="flex items-start gap-1.5">
                        <FileText
                          size={13}
                          className="text-slate-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="truncate">{inq.medicines}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {formatDate(inq.submittedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
