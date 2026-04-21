import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

// Pin positions on the SVG viewBox (0 0 500 500)
const countries = [
  { name: "Guatemala", x: 145, y: 185, delay: 0.1, hq: true },
  { name: "Belice", x: 195, y: 165, delay: 0.2 },
  { name: "Honduras", x: 215, y: 215, delay: 0.3 },
  { name: "El Salvador", x: 175, y: 240, delay: 0.4 },
  { name: "Nicaragua", x: 255, y: 280, delay: 0.5 },
  { name: "Costa Rica", x: 290, y: 340, delay: 0.6 },
  { name: "Panamá", x: 360, y: 380, delay: 0.7 },
];

const mexicoPin = { name: "México", x: 75, y: 95 };

export const CoverageMap = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Glow background */}
      <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative aspect-square"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mapa de cobertura en Centroamérica"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="mexicoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.02" />
            </linearGradient>
            <pattern id="dotPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="hsl(var(--accent))" fillOpacity="0.25" />
            </pattern>
          </defs>

          {/* Glow circle background */}
          <circle cx="250" cy="250" r="240" fill="url(#mapGlow)" />

          {/* Mexico (coming soon) - lighter, dashed */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            d="M 20,40 L 130,30 L 145,70 L 175,80 L 165,120 L 140,140 L 105,150 L 70,135 L 35,115 L 15,80 Z"
            fill="url(#mexicoGradient)"
            stroke="hsl(var(--accent))"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Central America landmass - stylized */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            d="M 110,160 L 175,150 L 215,160 L 230,185 L 215,210 L 240,225 L 235,255 L 265,265 L 285,295 L 280,325 L 305,335 L 335,355 L 365,370 L 395,385 L 410,415 L 380,420 L 345,400 L 310,380 L 280,360 L 250,335 L 230,305 L 215,275 L 195,250 L 165,235 L 140,215 L 120,195 Z"
            fill="url(#landGradient)"
            stroke="hsl(var(--accent))"
            strokeOpacity="0.5"
            strokeWidth="2"
          />

          {/* Dotted overlay for texture */}
          <path
            d="M 110,160 L 175,150 L 215,160 L 230,185 L 215,210 L 240,225 L 235,255 L 265,265 L 285,295 L 280,325 L 305,335 L 335,355 L 365,370 L 395,385 L 410,415 L 380,420 L 345,400 L 310,380 L 280,360 L 250,335 L 230,305 L 215,275 L 195,250 L 165,235 L 140,215 L 120,195 Z"
            fill="url(#dotPattern)"
          />

          {/* Connection lines from Guatemala HQ to all countries */}
          {countries
            .filter((c) => !c.hq)
            .map((country) => (
              <motion.line
                key={`line-${country.name}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 1.2, delay: country.delay + 0.5 }}
                x1={145}
                y1={185}
                x2={country.x}
                y2={country.y}
                stroke="hsl(var(--accent))"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

          {/* Mexico connection (dashed lighter) */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            x1={145}
            y1={185}
            x2={mexicoPin.x}
            y2={mexicoPin.y}
            stroke="hsl(var(--accent))"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Country pins overlay */}
        {countries.map((country) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: country.delay + 1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute -translate-x-1/2 -translate-y-full group"
            style={{
              left: `${(country.x / 500) * 100}%`,
              top: `${(country.y / 500) * 100}%`,
            }}
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: country.delay }}
              className={`absolute left-1/2 bottom-0 -translate-x-1/2 ${
                country.hq ? "w-6 h-6" : "w-4 h-4"
              } rounded-full bg-accent`}
            />
            {/* Pin */}
            <div
              className={`relative flex items-center justify-center ${
                country.hq ? "w-7 h-7" : "w-5 h-5"
              } rounded-full bg-gradient-teal shadow-lg shadow-accent/50 ring-2 ring-background`}
            >
              <MapPin className={`${country.hq ? "w-4 h-4" : "w-3 h-3"} text-accent-foreground`} />
            </div>
            {/* Label */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap pointer-events-none">
              <span
                className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm ${
                  country.hq
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/90 text-foreground border border-border"
                }`}
              >
                {country.name}
                {country.hq && " ★"}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Mexico "coming soon" pin */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring", stiffness: 150 }}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(mexicoPin.x / 500) * 100}%`,
            top: `${(mexicoPin.y / 500) * 100}%`,
          }}
        >
          <div className="relative">
            {/* Soft pulse */}
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent/60"
            />
            <div className="relative w-5 h-5 rounded-full bg-card border-2 border-dashed border-accent flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-accent" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-card/90 border border-accent/40 text-accent backdrop-blur-sm">
                México · Próximamente
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-teal ring-2 ring-background" />
          <span className="text-muted-foreground">7 países activos</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-card border-2 border-dashed border-accent" />
          <span className="text-muted-foreground">Próxima expansión</span>
        </div>
      </motion.div>
    </div>
  );
};
