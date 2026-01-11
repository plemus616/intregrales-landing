import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart } from "lucide-react";

const values = [
  "Servicio al Cliente",
  "Respeto",
  "Innovación",
  "Calidad en nuestros Servicios",
  "Igualdad",
  "Ética",
  "Compromiso",
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export const MissionVision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <motion.div
        className="absolute -right-32 top-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-4"
          >
            Nuestra Filosofía
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Misión, Visión y{" "}
            <span className="text-gradient">Valores</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Misión */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Misión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Somos una empresa con innovación, nos dedicamos estrictamente a los servicios de recursos
              humanos, atrayendo al talento humano calificado para alcanzar los objetivos de nuestros
              socios estratégicos con alto sentido de espíritu en calidad y profesionales enfocados a
              alcanzar las estrategias corporativas.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Visión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ser reconocida en Centro América, como la empresa líder de reclutamiento efectivo,
              formando alianzas estratégicas a largo plazo con nuestros clientes, siendo nuestra
              ventaja competitiva la innovación en nuestros servicios, un equipo altamente calificado,
              enfocándonos principalmente en nuestros clientes y colaboradores, a través de la calidad
              en nuestros servicios y el trabajo en equipo.
            </p>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all shadow-lg"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Nuestros Valores</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {values.map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-lg bg-muted border border-border hover:border-accent/40 transition-all cursor-default"
              >
                <span className="text-sm font-medium text-foreground">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
