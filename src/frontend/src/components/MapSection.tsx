import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

const LAT = 22.698917;
const LNG = 88.4425;
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export default function MapSection() {
  const { settings } = useApp();
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Info Cards */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/40 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p
                    className="font-semibold text-slate-900 text-sm"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    Address
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    D/5 Shahid Bandhu Nagar Colony, 2no Gate, Near Nag Sweet,
                    Kolkata
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/40 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-blue-600" />
                </div>
                <div>
                  <p
                    className="font-semibold text-slate-900 text-sm"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    Business Hours
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5 whitespace-pre-line">
                    {settings.businessHours}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/40 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div>
                  <p
                    className="font-semibold text-slate-900 text-sm"
                    style={{ fontFamily: "Poppins,sans-serif" }}
                  >
                    Contact
                  </p>
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
                </div>
              </div>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl w-full transition-all shadow-lg shadow-emerald-900/20 text-sm"
            >
              <Navigation size={18} />
              Get Directions
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/40 h-96 lg:h-full">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Radharani Pharmacy Location"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
