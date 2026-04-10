import {
  ArrowLeft,
  ChevronDown,
  Loader2,
  MessageSquare,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReviewEntry } from "../backend";
import { createActorWithConfig } from "../config";
import { seededReviews } from "../data/seededReviews";

const PAGE_SIZE = 20;

interface DisplayReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
  isVerified: boolean;
}

interface ReviewsPageProps {
  onNavigate: (path: string) => void;
}

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setValue(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

function SentimentBadge({
  totalCount,
  positiveCount,
}: { totalCount: number; positiveCount: number }) {
  const percent = Math.round((positiveCount / totalCount) * 100);
  const animated = useCountUp(percent);
  const color =
    percent >= 70
      ? "from-emerald-500 to-green-400"
      : percent >= 40
        ? "from-yellow-500 to-amber-400"
        : "from-red-500 to-rose-400";
  const label =
    percent >= 70
      ? "Highly Recommended"
      : percent >= 40
        ? "Mixed Feedback"
        : "Needs Improvement";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="mb-8"
    >
      <div
        className={`relative inline-flex items-center gap-3 bg-gradient-to-r ${color} text-white px-5 py-3 rounded-2xl shadow-lg overflow-hidden`}
      >
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-white/40"
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <Sparkles size={18} className="flex-shrink-0" />
        <div>
          <div className="text-xs font-semibold opacity-80 uppercase tracking-wider">
            AI Insight
          </div>
          <div className="font-bold text-sm">
            {animated}% positive · {totalCount.toLocaleString()} review
            {totalCount !== 1 ? "s" : ""} · {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StarInput({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="sr-only">Star rating</legend>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            className="transition-transform hover:scale-125 focus:outline-none"
            data-ocid="reviews.toggle"
          >
            <Star
              size={28}
              className={`transition-colors duration-150 ${
                star <= (hovered || value)
                  ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                  : "text-slate-300"
              }`}
            />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function StaticStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-200"
          }
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
}: { review: DisplayReview; index: number }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: Math.min(index * 0.05, 0.4),
      }}
      className="group relative glass rounded-2xl p-5 border border-white/40 shadow-lg overflow-hidden cursor-default hover:bg-white/10 transition-colors duration-300"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(16,185,129,0.12)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {review.name[0].toUpperCase()}
          </div>
          <div>
            <div
              className="font-semibold text-slate-900 text-sm"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {review.name}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-xs text-slate-400">{date}</div>
              {review.isVerified && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                  <span>✓</span> Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <StaticStars rating={review.rating} />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
    </motion.div>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 4 + (i % 5) * 3,
    left: `${(i * 347) % 100}%`,
    delay: (i * 0.4) % 6,
    duration: 8 + (i % 5) * 2,
    opacity: 0.05 + (i % 4) * 0.03,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-500"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: "-20px",
            opacity: p.opacity,
          }}
          animate={{
            y: ["-5vh", "-105vh"],
            opacity: [p.opacity, p.opacity * 2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function toDisplayReview(entry: ReviewEntry): DisplayReview {
  return {
    id: `backend-${entry.id.toString()}`,
    name: entry.name,
    rating: Number(entry.rating),
    comment: entry.comment,
    createdAt: Number(entry.createdAt),
    isVerified: entry.isVerified,
  };
}

export default function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  // Backend user reviews state
  const [backendReviews, setBackendReviews] = useState<DisplayReview[]>([]);
  const [backendTotal, setBackendTotal] = useState(0);
  const [backendHasMore, setBackendHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [nameError, setNameError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 });

  // Pre-seeded reviews: Jan 2026 batch first, then original
  const displayedSeeded = useMemo(() => {
    const jan2026 = seededReviews.slice(500, 700);
    const original = seededReviews.slice(0, 100);
    return [...jan2026, ...original].map((r) => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      isVerified: true as const,
    }));
  }, []);

  const loadBackendPage = useCallback(async (page: number) => {
    try {
      const actor = await createActorWithConfig();
      const result = await actor.getReviewsPaginated(
        BigInt(page),
        BigInt(PAGE_SIZE),
      );
      return {
        reviews: result.reviews.map(toDisplayReview),
        totalCount: Number(result.totalCount),
        hasMore: result.hasMore,
      };
    } catch {
      return null;
    }
  }, []);

  // Load page 0 on mount
  useEffect(() => {
    let cancelled = false;
    setInitialLoading(true);
    loadBackendPage(0).then((result) => {
      if (cancelled) return;
      setInitialLoading(false);
      if (result) {
        setBackendReviews(result.reviews);
        setBackendTotal(result.totalCount);
        setBackendHasMore(result.hasMore);
        setCurrentPage(0);
      }
      // Graceful degradation: if null, backendReviews stays empty, 700 seeded still shown
    });
    return () => {
      cancelled = true;
    };
  }, [loadBackendPage]);

  const handleLoadMore = async () => {
    if (loadingMore || !backendHasMore) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const result = await loadBackendPage(nextPage);
    if (result) {
      setBackendReviews((prev) => [...prev, ...result.reviews]);
      setBackendTotal(result.totalCount);
      setBackendHasMore(result.hasMore);
      setCurrentPage(nextPage);
    }
    setLoadingMore(false);
  };

  // Combined display: new backend user reviews first, then seeded
  const displayedReviews: DisplayReview[] = [
    ...backendReviews,
    ...displayedSeeded,
  ];

  // Total count: 700 pre-seeded + backend total (user-submitted)
  const totalCount = seededReviews.length + backendTotal;

  // Sentiment: seeded + backend user reviews
  const seededPositiveCount = useMemo(
    () => seededReviews.filter((r) => r.rating >= 4).length,
    [],
  );
  const backendPositiveCount = backendReviews.filter(
    (r) => r.rating >= 4,
  ).length;
  const totalPositiveCount = seededPositiveCount + backendPositiveCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setRatingError("");
    setSubmitError("");
    let valid = true;
    if (!name.trim()) {
      setNameError("Please enter your name");
      valid = false;
    }
    if (rating === 0) {
      setRatingError("Please select a star rating");
      valid = false;
    }
    if (!valid) return;

    setSubmitting(true);
    try {
      const actor = await createActorWithConfig();
      await actor.addUserReview(name.trim(), BigInt(rating), comment.trim());
      // Reload page 0 to show the new review at the top
      const result = await loadBackendPage(0);
      if (result) {
        setBackendReviews(result.reviews);
        setBackendTotal(result.totalCount);
        setBackendHasMore(result.hasMore);
        setCurrentPage(0);
      }
      setName("");
      setRating(0);
      setComment("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSubmitError("Failed to post review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = Math.min(
      Math.max(e.clientX - (rect.left + rect.width / 2), -50),
      50,
    );
    const dy = Math.min(
      Math.max(e.clientY - (rect.top + rect.height / 2), -20),
      20,
    );
    setBtnTranslate({ x: dx * 0.16, y: dy * 0.16 });
  };
  const handleBtnMouseLeave = () => setBtnTranslate({ x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 relative">
      <Particles />
      <div className="relative z-10 pt-24 pb-2 px-4 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          data-ocid="reviews.link"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
        >
          <motion.span
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft size={16} />
          </motion.span>
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Customer Reviews
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Share Your Experience
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Your feedback helps others trust Radharani Pharmacy. Every review
            matters.
          </p>
        </motion.div>

        {/* Review Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: 0.1,
          }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/50 shadow-2xl shadow-emerald-900/8 mb-10"
        >
          <h2
            className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            <MessageSquare size={18} className="text-emerald-600" /> Write a
            Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="review-name"
                className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide"
              >
                Your Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  data-ocid="reviews.input"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white/60 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
              </div>
              {nameError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="reviews.error_state"
                  className="mt-1 text-xs text-rose-500"
                >
                  {nameError}
                </motion.p>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Rating <span className="text-rose-500">*</span>
              </p>
              <StarInput value={rating} onChange={setRating} />
              {ratingError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="reviews.error_state"
                  className="mt-1 text-xs text-rose-500"
                >
                  {ratingError}
                </motion.p>
              )}
            </div>
            <div>
              <label
                htmlFor="review-comment"
                className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide"
              >
                Your Review
              </label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={3}
                data-ocid="reviews.textarea"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/60 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <motion.button
                ref={submitBtnRef}
                type="submit"
                disabled={submitting}
                data-ocid="reviews.submit_button"
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                animate={{ x: btnTranslate.x, y: btnTranslate.y }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                whileTap={{ scale: 0.96 }}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-900/20 flex items-center gap-2 text-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Review"
                )}
              </motion.button>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    data-ocid="reviews.success_state"
                    className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold"
                  >
                    <span className="text-lg">✓</span> Review posted! Visible to
                    everyone.
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    data-ocid="reviews.error_state"
                    className="flex items-center gap-1.5 text-rose-500 text-sm font-semibold"
                  >
                    <span className="text-lg">⚠</span> {submitError}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Reviews List */}
        <div>
          {totalCount >= 3 && (
            <SentimentBadge
              totalCount={totalCount}
              positiveCount={totalPositiveCount}
            />
          )}
          <div className="flex items-center gap-2 mb-6">
            <h2
              className="text-xl font-bold text-slate-800"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {totalCount > 0
                ? `${totalCount.toLocaleString()} Review${totalCount !== 1 ? "s" : ""}`
                : "Reviews"}
            </h2>
            {initialLoading && (
              <Loader2 size={16} className="animate-spin text-emerald-500" />
            )}
          </div>

          {displayedReviews.length === 0 && !initialLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="reviews.empty_state"
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-4"
              >
                ⭐
              </motion.div>
              <h3
                className="text-xl font-bold text-slate-700 mb-2"
                style={{ fontFamily: "Poppins,sans-serif" }}
              >
                Be the First to Share Your Experience
              </h3>
              <p className="text-slate-400 text-sm">
                Help others by leaving the first review for Radharani Pharmacy.
              </p>
            </motion.div>
          ) : (
            <div className="columns-1 md:columns-2 gap-5">
              {displayedReviews.map((review, index) => (
                <div key={review.id} className="break-inside-avoid mb-5">
                  <ReviewCard review={review} index={index} />
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {backendHasMore && (
            <div className="flex justify-center mt-8">
              <motion.button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                data-ocid="reviews.load_more"
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 font-semibold px-6 py-3 rounded-xl shadow-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all text-sm disabled:opacity-60"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    Load more reviews
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>

        <div className="text-center py-10 text-xs text-slate-400">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </div>
  );
}
