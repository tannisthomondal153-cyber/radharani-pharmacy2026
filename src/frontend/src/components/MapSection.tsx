import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

const LAT = 22.698917;
const LNG = 88.4425;
// OpenStreetMap embed — always works, no API key needed, no CORS issues
const OSM_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=88.4395%2C22.6959%2C88.4455%2C22.7019&layer=mapnik&marker=22.698917%2C88.442500";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

const infoCardDelays = [0, 0.1, 0.2];

export default function MapSection() {
  const { settings } = useApp();

  const infoCards = [
    {
      icon: MapPin,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Address",
      content: (
        <p className="text-slate-500 text-xs mt-0.5">
          D/5 Shahid Bandhu Nagar Colony, 2no Gate, Near Nag Sweet, Kolkata
        </p>
      ),
    },
    {
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Business Hours",
      content: (
        <p className="text-slate-500 text-xs mt-0.5 whitespace-pre-line">
          {settings.businessHours}
        </p>
      ),
    },
    {
      icon: Phone,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Contact",
      content: (
        <>
          <a
            href={`tel:${settings.phone1.replace(/\s/g, "")}`}
            className="text-emerald-600 text-xs font-medium block hover:underline"
          >
            {settings.phone1}
          </a>
          <a
            href={`tel:${settings.phone2.replace(/\s/g, "")}`}
            className="text-emerald-600 text-xs font-medium block hover:underline"
          >
            {settings.phone2}
          </a>
        </>
      ),
    },
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Visit Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Find Us
          </h2>
          <p className="text-slate-500">
            Conveniently located in the heart of Kolkata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="space-y-4">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  delay: infoCardDelays[i],
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass rounded-2xl p-5 border border-white/40 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 ${card.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <card.icon size={18} className={card.iconColor} />
                  </div>
                  <div>
                    <p
                      className="font-semibold text-slate-900 text-sm"
                      style={{ fontFamily: "Poppins,sans-serif" }}
                    >
                      {card.title}
                    </p>
                    {card.content}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl w-full transition-all shadow-lg shadow-emerald-900/20 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.3,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Navigation size={18} />
              Get Directions
            </motion.a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                delay: 0.1,
              }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/40 h-96 lg:h-full min-h-[380px]"
            >
              <iframe
                src={OSM_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                title="Radharani Pharmacy Location – OpenStreetMap"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
