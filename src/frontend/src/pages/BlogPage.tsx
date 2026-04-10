import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { BlogPost } from "../backend.d";
import { createActorWithConfig } from "../config";

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

function formatDate(ts: bigint): string {
  const date = new Date(Number(ts));
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getPreview(content: string, maxLen = 150): string {
  const stripped = content.replace(/\n+/g, " ").trim();
  return stripped.length > maxLen
    ? `${stripped.slice(0, maxLen)}...`
    : stripped;
}

function SkeletonCard() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="h-5 bg-white/10 rounded-lg w-3/4 mb-3" />
      <div className="h-4 bg-white/10 rounded-lg w-1/3 mb-4" />
      <div className="space-y-2 mb-5">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-4/6" />
      </div>
      <div className="h-9 bg-white/10 rounded-xl w-28" />
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="col-span-full flex flex-col items-center justify-center py-24 px-6"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8 text-emerald-400" />
        </div>
        <h3
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Coming Soon
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Radharani Pharmacy's health blog is on its way.
        </p>
        <p className="text-slate-500 text-sm">
          Check back soon for expert health tips, news, and pharmacy updates
          curated for the New Barrackpore &amp; Madhyamgram community.
        </p>
      </div>
    </motion.div>
  );
}

interface PostCardProps {
  post: BlogPost;
  index: number;
  onReadMore: (post: BlogPost) => void;
}

function PostCard({ post, index, onReadMore }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group"
      onClick={() => onReadMore(post)}
      data-ocid={`blog-card-${post.id}`}
    >
      <div className="flex-1 min-w-0">
        <h2
          className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {post.title}
        </h2>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
          <Calendar className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {getPreview(post.content)}
        </p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onReadMore(post);
        }}
        className="self-start mt-1 px-4 py-2 text-sm font-semibold text-emerald-400 border border-emerald-500/40 rounded-xl hover:bg-emerald-500/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        data-ocid={`read-more-${post.id}`}
      >
        Read More →
      </button>
    </motion.article>
  );
}

interface FullPostProps {
  post: BlogPost;
  onBack: () => void;
}

function FullPost({ post, onBack }: FullPostProps) {
  return (
    <motion.div
      key="full-post"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="max-w-3xl mx-auto"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium mb-8 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1 py-0.5"
        data-ocid="back-to-posts"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </button>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
        <h1
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-slate-400 text-sm mb-8 pb-6 border-b border-white/10">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-500" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min
            read
          </span>
        </div>
        <div
          className="text-slate-200 text-base leading-relaxed whitespace-pre-line"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {post.content}
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage({ onNavigate: _onNavigate }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    document.title = "Health Blog | Radharani Pharmacy - New Barrackpore";
    return () => {
      document.title = "Radharani Pharmacy – Chemist & Druggist";
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const actor = await createActorWithConfig();
        const result = await actor.getBlogPosts();
        if (!cancelled) {
          // Sort newest first
          const sorted = [...result].sort(
            (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
          );
          setPosts(sorted);
        }
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      {/* Page Header */}
      <section className="text-center px-4 pt-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              Health & Wellness
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Health Blog
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Expert health tips and pharmacy updates from{" "}
            <span className="text-emerald-400 font-semibold">
              Radharani Pharmacy
            </span>
            , serving New Barrackpore &amp; Madhyamgram.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <FullPost key="full" post={selectedPost} onBack={handleBack} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : posts.length === 0 ? (
                <div className="grid grid-cols-1">
                  <EmptyState />
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  data-ocid="blog-post-grid"
                >
                  {posts.map((post, i) => (
                    <PostCard
                      key={String(post.id)}
                      post={post}
                      index={i}
                      onReadMore={setSelectedPost}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
