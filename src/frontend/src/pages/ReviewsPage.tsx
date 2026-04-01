import { ArrowLeft, MessageSquare, Sparkles, Star, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
}

interface ReviewsPageProps {
  onNavigate: (path: string) => void;
}

const STORAGE_KEY = "rp_reviews";

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Review[];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
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

function SentimentBadge({ reviews }: { reviews: Review[] }) {
  const positive = reviews.filter((r) => r.rating >= 4).length;
  const percent = Math.round((positive / reviews.length) * 100);
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
            {animated}% positive · {reviews.length} review
            {reviews.length !== 1 ? "s" : ""} · {label}
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

function AnimatedStars({
  rating,
  delay = 0,
}: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star, i) => (
        <motion.span
          key={star}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: delay + i * 0.07,
          }}
        >
          <Star
            size={14}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-200"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
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
        delay: index * 0.07,
      }}
      className="group relative glass rounded-2xl p-5 border border-white/40 shadow-lg overflow-hidden cursor-default"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(16,185,129,0.12)" }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
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
            <div className="text-xs text-slate-400">{date}</div>
          </div>
        </div>
        <AnimatedStars rating={review.rating} delay={index * 0.07} />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
    </motion.div>
  );
}

function ShimmerCard() {
  return (
    <div className="glass rounded-2xl p-5 border border-white/40 shadow-lg animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-slate-200" />
        <div className="flex-1">
          <div className="h-3 bg-slate-200 rounded w-24 mb-1.5" />
          <div className="h-2 bg-slate-100 rounded w-16" />
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3.5 h-3.5 bg-slate-200 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 bg-slate-100 rounded w-full" />
        <div className="h-2.5 bg-slate-100 rounded w-4/5" />
      </div>
    </div>
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

export default function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setReviews(loadReviews());
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setRatingError("");
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
    await new Promise((res) => setTimeout(res, 800));

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      createdAt: Date.now(),
    };
    const updated = [newReview, ...reviews];
    saveReviews(updated);
    setReviews(updated);
    setName("");
    setRating(0);
    setComment("");
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.min(Math.max(e.clientX - cx, -50), 50);
    const dy = Math.min(Math.max(e.clientY - cy, -20), 20);
    setBtnTranslate({ x: dx * 0.16, y: dy * 0.16 });
  };
  const handleBtnMouseLeave = () => setBtnTranslate({ x: 0, y: 0 });

  const sortedReviews = [...reviews].sort((a, b) => b.createdAt - a.createdAt);

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

        {/* Review Form */}
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
            <MessageSquare size={18} className="text-emerald-600" />
            Write a Review
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

            <div className="flex items-center gap-4">
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
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
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
                    <span className="text-lg">✓</span> Review posted!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Reviews List */}
        <div>
          {reviews.length >= 3 && <SentimentBadge reviews={reviews} />}
          <div className="flex items-center gap-2 mb-6">
            <h2
              className="text-xl font-bold text-slate-800"
              style={{ fontFamily: "Poppins,sans-serif" }}
            >
              {reviews.length > 0
                ? `${reviews.length} Review${reviews.length !== 1 ? "s" : ""}`
                : "Reviews"}
            </h2>
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          ) : sortedReviews.length === 0 ? (
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
              {sortedReviews.map((review, index) => (
                <div key={review.id} className="break-inside-avoid mb-5">
                  <ReviewCard review={review} index={index} />
                </div>
              ))}
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
