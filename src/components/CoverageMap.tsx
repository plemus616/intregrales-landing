import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// Use local copy of world TopoJSON (Natural Earth 1:110m)
const GEO_URL = "/maps/world-110m.json";

// Country numeric ISO codes used by world-atlas
const HIGHLIGHT_IDS = new Set([
  "320", // Guatemala
  "084", // Belize
  "340", // Honduras
  "222", // El Salvador
  "558", // Nicaragua
  "188", // Costa Rica
  "591", // Panama
]);

const MEXICO_ID = "484";

type CountryPin = {
  name: string;
  coords: [number, number]; // [lng, lat]
  hq?: boolean;
  delay: number;
};

const countries: CountryPin[] = [
  { name: "Guatemala", coords: [-90.5, 15.5], hq: true, delay: 0.1 },
  { name: "Belice", coords: [-88.7, 17.2], delay: 0.2 },
  { name: "Honduras", coords: [-86.5, 14.8], delay: 0.3 },
  { name: "El Salvador", coords: [-88.9, 13.7], delay: 0.4 },
  { name: "Nicaragua", coords: [-85.2, 12.7], delay: 0.5 },
  { name: "Costa Rica", coords: [-84.0, 9.9], delay: 0.6 },
  { name: "Panamá", coords: [-80.1, 8.5], delay: 0.7 },
];

const mexicoPin = { name: "México", coords: [-102.5, 23.6] as [number, number] };

export const CoverageMap = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 950,
            center: [-90, 16],
          }}
          width={800}
          height={520}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const id = String(geo.id).padStart(3, "0");
                const isCentralAmerica = HIGHLIGHT_IDS.has(id);
                const isMexico = id === MEXICO_ID;

                if (!isCentralAmerica && !isMexico) {
                  // Other surrounding countries (sea/neighbors): muted
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--muted) / 0.3)"
                      stroke="hsl(var(--border))"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      isCentralAmerica
                        ? "hsl(var(--accent) / 0.25)"
                        : "hsl(var(--accent) / 0.08)"
                    }
                    stroke="hsl(var(--accent))"
                    strokeWidth={isCentralAmerica ? 1.2 : 0.8}
                    strokeDasharray={isMexico ? "3 3" : undefined}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isCentralAmerica
                          ? "hsl(var(--accent) / 0.4)"
                          : "hsl(var(--accent) / 0.15)",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Connection lines from Guatemala to other CA countries */}
          {countries
            .filter((c) => !c.hq)
            .map((country) => (
              <line
                key={`line-${country.name}`}
                // We can't easily project here without geoPath; use Marker overlay instead
              />
            ))}

          {/* Country markers */}
          {countries.map((country) => (
            <Marker key={country.name} coordinates={country.coords}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: country.delay + 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                {/* Pulse */}
                <motion.circle
                  r={country.hq ? 10 : 7}
                  fill="hsl(var(--accent))"
                  fillOpacity={0.4}
                  animate={{
                    r: country.hq ? [10, 22, 10] : [7, 16, 7],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: country.delay,
                  }}
                />
                {/* Pin dot */}
                <circle
                  r={country.hq ? 7 : 4.5}
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
                {country.hq && (
                  <circle r={2.5} fill="hsl(var(--accent-foreground))" />
                )}
                {/* Label */}
                <g transform={`translate(0, ${country.hq ? -16 : -12})`}>
                  <text
                    textAnchor="middle"
                    fontSize={country.hq ? 11 : 9}
                    fontWeight={700}
                    fill="hsl(var(--foreground))"
                    style={{
                      paintOrder: "stroke",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                    }}
                  >
                    {country.name}
                    {country.hq && " ★"}
                  </text>
                </g>
              </motion.g>
            </Marker>
          ))}

          {/* Mexico "coming soon" pin */}
          <Marker coordinates={mexicoPin.coords}>
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 150 }}
            >
              <motion.circle
                r={8}
                fill="hsl(var(--accent))"
                fillOpacity={0.3}
                animate={{ r: [8, 18, 8], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <circle
                r={6}
                fill="hsl(var(--card))"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="2 2"
              />
              <g transform="translate(0, -14)">
                <text
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill="hsl(var(--accent))"
                  style={{
                    paintOrder: "stroke",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 3,
                    strokeLinejoin: "round",
                  }}
                >
                  México · Próximamente
                </text>
              </g>
            </motion.g>
          </Marker>
        </ComposableMap>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent ring-2 ring-background" />
          <span className="text-muted-foreground">7 países activos</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-muted-foreground">México · Próxima expansión</span>
        </div>
      </motion.div>
    </div>
  );
};
