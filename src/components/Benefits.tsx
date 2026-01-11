import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Users, TrendingDown, ClipboardCheck, Target, UserCheck, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Ahorro de tiempo y recursos",
    description: "Optimizamos su proceso de contratación para que pueda enfocarse en su negocio.",
  },
  {
    icon: Users,
    title: "Acceso a talento calificado",
    description: "Conectamos con los mejores profesionales del mercado laboral.",
  },
  {
    icon: TrendingDown,
    title: "Reducción de rotación",
    description: "Seleccionamos candidatos con mejor fit cultural y profesional.",
  },
  {
    icon: ClipboardCheck,
    title: "Procesos profesionales y estructurados",
    description: "Metodologías probadas que garantizan resultados consistentes.",
  },
  {
    icon: Target,
    title: "Contrataciones más acertadas",
    description: "Evaluación integral que asegura la mejor decisión de contratación.",
  },
  {
    icon: UserCheck,
    title: "Acompañamiento personalizado",
    description: "Asesoría dedicada en cada etapa del proceso de reclutamiento.",
  },
  {
    icon: Shield,
    title: "Confidencialidad y ética",
    description: "Manejo discreto y profesional de toda la información.",
  },
  {
    icon: Zap,
    title: "Optimización del proceso de selección",
    description: "Reducimos tiempos sin sacrificar la calidad en la selección.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute -left-32 top-1/3 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-4"
          >
            Beneficios
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            ¿Por qué elegirnos como su{" "}
            <span className="text-gradient">aliado estratégico</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Trabajar con nosotros le brinda ventajas competitivas tangibles que impactan
            directamente en el éxito de su organización.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="h-full glass-card rounded-xl p-6 hover:border-accent/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
