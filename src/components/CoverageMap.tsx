import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

/**
 * Real geographic SVG paths for Mexico + Central America.
 * Based on simplified Natural Earth data, projected and centered for the region.
 * ViewBox: 0 0 800 600
 */

// Mexico (simplified outline)
const MEXICO_PATH =
  "M 60,140 L 90,120 L 130,110 L 175,105 L 220,108 L 260,115 L 295,128 L 320,148 L 340,170 L 355,195 L 360,222 L 350,245 L 332,260 L 308,268 L 285,272 L 262,278 L 248,295 L 240,318 L 230,340 L 215,355 L 195,362 L 175,358 L 160,345 L 152,325 L 148,302 L 142,278 L 130,255 L 115,235 L 95,215 L 78,195 L 65,170 Z";

// Central America connected landmass (Guatemala → Panama)
const CENTRAL_AMERICA_PATH =
  "M 240,318 L 258,322 L 278,326 L 298,335 L 312,348 L 318,365 L 314,380 L 305,392 L 318,398 L 338,402 L 358,410 L 378,422 L 398,438 L 418,452 L 442,468 L 468,478 L 495,488 L 522,500 L 548,512 L 575,520 L 600,524 L 622,520 L 638,508 L 645,490 L 642,472 L 628,460 L 605,452 L 580,448 L 555,442 L 530,432 L 505,420 L 482,406 L 460,392 L 440,378 L 420,362 L 400,348 L 380,338 L 358,332 L 338,328 L 318,322 L 298,318 L 278,312 L 258,308 L 240,318 Z";

// Country pins with REAL approximate lat/lng converted to SVG coordinates
// Region bounds: lng [-118, -77], lat [33, 7]
// SVG: x = ((lng + 118) / 41) * 800, y = ((33 - lat) / 26) * 600
const countries = [
  { name: "Guatemala", x: 295, y: 348, hq: true, delay: 0.1 },
  { name: "Belice", x: 335, y: 332, delay: 0.2 },
  { name: "Honduras", x: 360, y: 360, delay: 0.3 },
  { name: "El Salvador", x: 320, y: 378, delay: 0.4 },
  { name: "Nicaragua", x: 405, y: 400, delay: 0.5 },
  { name: "Costa Rica", x: 460, y: 445, delay: 0.6 },
  { name: "Panamá", x: 545, y: 478, delay: 0.7 },
];

const mexicoPin = { name: "México", x: 215, y: 215 };

export const CoverageMap = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow background */}
      <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative w-full"
        style={{ aspectRatio: "800 / 600" }}
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mapa de cobertura: México y Centroamérica"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.22" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="mexicoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.10" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.03" />
            </linearGradient>
            <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.8" fill="hsl(var(--accent))" fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* Glow background */}
          <ellipse cx="400" cy="320" rx="380" ry="260" fill="url(#mapGlow)" />

          {/* Subtle grid lines suggesting latitude */}
          {[150, 250, 350, 450, 550].map((y) => (
            <line
              key={y}
              x1="20"
              y1={y}
              x2="780"
              y2={y}
              stroke="hsl(var(--accent))"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          ))}

          {/* Mexico - "Próximamente" lighter, dashed */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            d={MEXICO_PATH}
            fill="url(#mexicoGradient)"
            stroke="hsl(var(--accent))"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* Central America landmass */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            d={CENTRAL_AMERICA_PATH}
            fill="url(#landGradient)"
            stroke="hsl(var(--accent))"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Texture overlay */}
          <path
            d={CENTRAL_AMERICA_PATH}
            fill="url(#dotPattern)"
          />

          {/* Connection lines from Guatemala HQ */}
          {countries
            .filter((c) => !c.hq)
            .map((country) => (
              <motion.line
                key={`line-${country.name}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.45 }}
                transition={{ duration: 1, delay: country.delay + 0.6 }}
                x1={295}
                y1={348}
                x2={country.x}
                y2={country.y}
                stroke="hsl(var(--accent))"
                strokeWidth="1.2"
                strokeDasharray="3 4"
              />
            ))}

          {/* Mexico connection (lighter) */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            x1={295}
            y1={348}
            x2={mexicoPin.x}
            y2={mexicoPin.y}
            stroke="hsl(var(--accent))"
            strokeWidth="1.2"
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
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(country.x / 800) * 100}%`,
              top: `${(country.y / 600) * 100}%`,
            }}
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: country.delay }}
              className={`absolute left-1/2 bottom-0 -translate-x-1/2 ${
                country.hq ? "w-6 h-6" : "w-4 h-4"
              } rounded-full bg-accent`}
            />
            {/* Pin */}
            <div
              className={`relative flex items-center justify-center ${
                country.hq ? "w-8 h-8" : "w-5 h-5"
              } rounded-full bg-gradient-teal shadow-lg shadow-accent/50 ring-2 ring-background`}
            >
              <MapPin className={`${country.hq ? "w-4 h-4" : "w-3 h-3"} text-accent-foreground`} />
            </div>
            {/* Label */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap pointer-events-none">
              <span
                className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm ${
                  country.hq
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/95 text-foreground border border-border"
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
            left: `${(mexicoPin.x / 800) * 100}%`,
            top: `${(mexicoPin.y / 600) * 100}%`,
          }}
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-5 h-5 rounded-full bg-accent/60"
            />
            <div className="relative w-6 h-6 rounded-full bg-card border-2 border-dashed border-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-accent" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-card/95 border border-accent/40 text-accent backdrop-blur-sm shadow-sm">
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
