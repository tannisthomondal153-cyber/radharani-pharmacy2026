import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Droplets,
  Loader2,
  RefreshCw,
  Thermometer,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// --- Health Tips ---
const HEALTH_TIPS = [
  {
    icon: "🧼",
    tip: "Wash your hands with soap for at least 20 seconds before meals and after using the toilet — it's the #1 way to prevent infections.",
  },
  {
    icon: "💧",
    tip: "Drink at least 8–10 glasses of water daily. In Indian summers, increase intake to prevent heat stroke and dehydration.",
  },
  {
    icon: "🌧️",
    tip: "During monsoon season, avoid street food and ensure drinking water is boiled or filtered to prevent waterborne diseases.",
  },
  {
    icon: "💊",
    tip: "Store medicines in a cool, dry place away from direct sunlight. Avoid keeping them in bathrooms due to humidity.",
  },
  {
    icon: "🌡️",
    tip: "Never self-medicate with antibiotics. Always complete the full course prescribed by your doctor to prevent antibiotic resistance.",
  },
  {
    icon: "🍛",
    tip: "A balanced Indian diet rich in dal, vegetables, fruits, and whole grains provides essential nutrients for daily health.",
  },
  {
    icon: "😴",
    tip: "Adults need 7–8 hours of quality sleep per night. Poor sleep weakens immunity and increases risk of chronic disease.",
  },
  {
    icon: "🚶",
    tip: "A 30-minute brisk walk daily reduces risk of diabetes, heart disease, and hypertension — especially important in urban areas.",
  },
  {
    icon: "🌿",
    tip: "Check medicine expiry dates before use. Expired medicines may be ineffective or harmful — always dispose of them safely.",
  },
  {
    icon: "🩺",
    tip: "Get a full health check-up at least once a year, especially after age 40, to detect conditions like diabetes and BP early.",
  },
  {
    icon: "🧘",
    tip: "Practice pranayama or deep breathing for 10 minutes daily to reduce stress hormones and improve lung capacity.",
  },
  {
    icon: "🦟",
    tip: "Use mosquito nets and repellents, especially during dengue and malaria season. Keep stagnant water away from your surroundings.",
  },
];

// --- Wellness Quotes ---
const WELLNESS_QUOTES = [
  {
    quote:
      "Health is not just about what you're eating. It's also about what you're thinking and saying.",
    author: "Unknown",
  },
  {
    quote: "The greatest wealth is health. Invest in it daily.",
    author: "Virgil",
  },
  {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
  },
  {
    quote: "He who has health, has hope; and he who has hope, has everything.",
    author: "Arabic Proverb",
  },
  { quote: "Prevention is better than cure.", author: "Desiderius Erasmus" },
  {
    quote:
      "Good health is not something we can buy. However, it can be an extremely valuable savings account.",
    author: "Anne Wilson Schaef",
  },
  { quote: "The first wealth is health.", author: "Ralph Waldo Emerson" },
  {
    quote: "A healthy outside starts from the inside.",
    author: "Robert Urich",
  },
  {
    quote: "Your body hears everything your mind says. Stay positive.",
    author: "Naomi Judd",
  },
  {
    quote: "To enjoy the glow of good health, you must exercise.",
    author: "Gene Tunney",
  },
  {
    quote:
      "It is health that is real wealth and not pieces of gold and silver.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "Happiness is nothing more than good health and a bad memory.",
    author: "Albert Schweitzer",
  },
  {
    quote:
      "Health is like money; we never have a true idea of its value until we lose it.",
    author: "Josh Billings",
  },
  {
    quote: "The human body is the best picture of the human soul.",
    author: "Ludwig Wittgenstein",
  },
  {
    quote:
      "Nurturing yourself is not selfish — it's essential to your survival and your well-being.",
    author: "Renée Peterson Trudeau",
  },
];

// --- WMO Weather Code Mapping ---
const WMO_CONDITIONS: Record<number, { label: string; emoji: string }> = {
  0: { label: "Clear Sky", emoji: "☀️" },
  1: { label: "Mainly Clear", emoji: "🌤️" },
  2: { label: "Partly Cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },
  45: { label: "Foggy", emoji: "🌫️" },
  48: { label: "Icy Fog", emoji: "🌫️" },
  51: { label: "Light Drizzle", emoji: "🌦️" },
  53: { label: "Drizzle", emoji: "🌦️" },
  55: { label: "Heavy Drizzle", emoji: "🌧️" },
  61: { label: "Light Rain", emoji: "🌧️" },
  63: { label: "Rain", emoji: "🌧️" },
  65: { label: "Heavy Rain", emoji: "🌧️" },
  71: { label: "Light Snow", emoji: "❄️" },
  73: { label: "Snow", emoji: "❄️" },
  75: { label: "Heavy Snow", emoji: "❄️" },
  80: { label: "Rain Showers", emoji: "🌦️" },
  81: { label: "Rain Showers", emoji: "🌦️" },
  82: { label: "Violent Rain Showers", emoji: "⛈️" },
  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm w/ Hail", emoji: "⛈️" },
  99: { label: "Thunderstorm w/ Hail", emoji: "⛈️" },
};

interface WeatherData {
  temperature: number;
  humidity: number;
  weathercode: number;
}

// --- Health Tips Card ---
function HealthTipsCard() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % HEALTH_TIPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + HEALTH_TIPS.length) % HEALTH_TIPS.length);
  };

  const current = HEALTH_TIPS[index];

  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span>
        <h3 className="text-lg font-semibold text-emerald-400 font-[Poppins]">
          Health Tips
        </h3>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col justify-center gap-3"
          >
            <span className="text-4xl text-center">{current.icon}</span>
            <p
              className="text-sm leading-relaxed text-center"
              style={{ color: "rgba(226,232,240,0.9)" }}
            >
              {current.tip}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between mt-4 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="p-1.5 rounded-full transition-colors hover:bg-white/10"
          aria-label="Previous tip"
          data-ocid="health-tips-prev"
        >
          <ChevronLeft size={16} className="text-emerald-400" />
        </button>

        <div className="flex gap-1.5">
          {HEALTH_TIPS.map((tip, i) => (
            <button
              type="button"
              key={tip.icon}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "18px" : "6px",
                height: "6px",
                background: i === index ? "#10b981" : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Tip ${i + 1}`}
              data-ocid={`health-tips-dot-${i}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="p-1.5 rounded-full transition-colors hover:bg-white/10"
          aria-label="Next tip"
          data-ocid="health-tips-next"
        >
          <ChevronRight size={16} className="text-emerald-400" />
        </button>
      </div>
    </div>
  );
}

// --- Wellness Quote Card ---
function WellnessQuoteCard() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * WELLNESS_QUOTES.length),
  );
  const [key, setKey] = useState(0);

  const nextQuote = useCallback(() => {
    setIndex((i) => (i + 1) % WELLNESS_QUOTES.length);
    setKey((k) => k + 1);
  }, []);

  const current = WELLNESS_QUOTES[index];

  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-semibold text-emerald-400 font-[Poppins]">
            Daily Quote
          </h3>
        </div>
        <button
          type="button"
          onClick={nextQuote}
          className="p-2 rounded-full transition-colors hover:bg-white/10 group"
          aria-label="Next quote"
          data-ocid="wellness-quote-refresh"
        >
          <RefreshCw
            size={16}
            className="text-emerald-400 group-hover:rotate-180 transition-transform duration-500"
          />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="flex flex-col gap-4"
          >
            <span
              className="text-4xl text-emerald-400 font-serif leading-none"
              style={{ opacity: 0.6 }}
            >
              "
            </span>
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "rgba(226,232,240,0.92)", marginTop: "-1.5rem" }}
            >
              {current.quote}
            </p>
            <p className="text-xs font-semibold text-emerald-500 text-right">
              — {current.author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-4 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="text-xs text-center"
          style={{ color: "rgba(148,163,184,0.6)" }}
        >
          {index + 1} / {WELLNESS_QUOTES.length} quotes
        </p>
      </div>
    </div>
  );
}

// --- Live Weather Card ---
function LiveWeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=22.698917&longitude=88.442500&current=temperature_2m,relative_humidity_2m,weathercode&timezone=Asia/Kolkata",
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as {
        current: {
          temperature_2m: number;
          relative_humidity_2m: number;
          weathercode: number;
        };
      };
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weathercode,
      });
      const now = new Date();
      setLastUpdated(
        `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
      );
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const condition = weather
    ? (WMO_CONDITIONS[weather.weathercode] ?? { label: "Unknown", emoji: "🌡️" })
    : null;

  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌤️</span>
          <h3 className="text-lg font-semibold text-emerald-400 font-[Poppins]">
            Live Weather
          </h3>
        </div>
        <button
          type="button"
          onClick={fetchWeather}
          className="p-2 rounded-full transition-colors hover:bg-white/10 group"
          aria-label="Refresh weather"
          data-ocid="weather-refresh"
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={`text-emerald-400 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
          />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading && (
          <div
            className="flex flex-col items-center gap-3"
            data-ocid="weather-loading"
          >
            <Loader2 size={32} className="text-emerald-400 animate-spin" />
            <p className="text-xs" style={{ color: "rgba(148,163,184,0.7)" }}>
              Fetching weather…
            </p>
          </div>
        )}

        {!loading && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 text-center"
            data-ocid="weather-error"
          >
            <AlertCircle size={32} className="text-amber-400" />
            <p className="text-sm" style={{ color: "rgba(226,232,240,0.7)" }}>
              Couldn't load weather. Please check your connection.
            </p>
            <button
              type="button"
              onClick={fetchWeather}
              className="text-xs text-emerald-400 underline underline-offset-2"
            >
              Try again
            </button>
          </motion.div>
        )}

        {!loading && !error && weather && condition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="flex flex-col items-center gap-4"
            data-ocid="weather-data"
          >
            <span className="text-5xl">{condition.emoji}</span>
            <div className="text-center">
              <p className="text-3xl font-bold text-white font-[Poppins]">
                {weather.temperature}°C
              </p>
              <p className="text-sm font-medium text-emerald-400 mt-1">
                {condition.label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(148,163,184,0.7)" }}
              >
                New Barrackpore, WB
              </p>
            </div>

            <div className="flex items-center gap-5 mt-1">
              <div className="flex items-center gap-1.5">
                <Droplets size={14} className="text-sky-400" />
                <span
                  className="text-xs"
                  style={{ color: "rgba(226,232,240,0.8)" }}
                >
                  {weather.humidity}% Humidity
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Thermometer size={14} className="text-rose-400" />
                <span
                  className="text-xs"
                  style={{ color: "rgba(226,232,240,0.8)" }}
                >
                  Feels local
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {lastUpdated && !error && (
        <div
          className="mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Cloud size={11} style={{ color: "rgba(148,163,184,0.5)" }} />
            <p className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>
              Updated at {lastUpdated}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Glass Card Wrapper ---
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "1rem",
  padding: "1.5rem",
};

const CARD_COMPONENTS = [HealthTipsCard, WellnessQuoteCard, LiveWeatherCard];

const CARD_KEYS = ["health-tips", "wellness-quote", "live-weather"] as const;

// --- Main Section ---
export default function HealthCorner() {
  return (
    <section
      data-ocid="health-corner-section"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #0d1a14 50%, #071020 100%)",
        padding: "5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold font-[Poppins] inline-block"
            style={{ color: "#f1f5f9" }}
          >
            Health Corner
            <span
              className="block mx-auto mt-2 rounded-full"
              style={{
                height: "4px",
                width: "64px",
                background: "linear-gradient(90deg, #10b981, #059669)",
              }}
            />
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "rgba(148,163,184,0.8)" }}
          >
            Your daily dose of wellness
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARD_COMPONENTS.map((CardComponent, i) => (
            <motion.div
              key={CARD_KEYS[i]}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 24,
                delay: i * 0.12,
              }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 320, damping: 22 },
              }}
              style={cardStyle}
              data-ocid={`health-corner-card-${i}`}
            >
              <CardComponent />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
