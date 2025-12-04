import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import logoSir from "@/assets/logo-sir.png";

const features = [
  "Más de 15 años de experiencia en el mercado",
  "Equipo multidisciplinario de especialistas",
  "Metodologías innovadoras de evaluación",
  "Red de contactos en múltiples industrias",
  "Compromiso con la confidencialidad",
  "Garantía de reposición sin costo adicional",
];

const featureVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, rotateY: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut" as const,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.15,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 200,
    },
  }),
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section id="nosotros" ref={containerRef} className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <motion.div
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-4"
            >
              Sobre Nosotros
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground"
            >
              Su Aliado Estratégico en{" "}
              <span className="text-gradient">Capital Humano</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              En <strong className="text-foreground">Servicios Integrales de Reclutamiento</strong>, 
              nos dedicamos a conectar el talento excepcional con las oportunidades adecuadas. 
              Nuestra misión es ser el puente que une a los mejores profesionales con empresas 
              que valoran el capital humano como su activo más importante.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={featureVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex px-8 py-4 bg-gradient-teal text-accent-foreground rounded-lg font-semibold glow-teal-sm"
            >
              Trabaja con Nosotros
            </motion.a>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: cardY }}
            className="relative perspective-1000"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div 
                className="bg-card rounded-3xl p-10 border border-border shadow-xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="w-32 h-32 mx-auto mb-6"
                  >
                    <img src={logoSir} alt="SIR Logo" className="w-full h-full object-contain" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="text-2xl font-display font-bold mb-2 text-foreground"
                  >
                    Servicios Integrales de Reclutamiento
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-muted-foreground mb-8"
                  >
                    Excelencia en gestión del talento humano
                  </motion.p>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "500+", label: "Clientes" },
                      { value: "10K+", label: "Colocaciones" },
                      { value: "15+", label: "Años" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        custom={i}
                        variants={statVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="text-center p-4 rounded-xl bg-muted cursor-default"
                      >
                        <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0, y: [0, -10, 0] } : {}}
                transition={{ 
                  opacity: { delay: 1 },
                  x: { delay: 1 },
                  y: { duration: 4, repeat: Infinity, delay: 1 }
                }}
                className="absolute -top-6 -right-6 bg-card rounded-xl p-4 border border-accent/30 shadow-lg"
              >
                <p className="text-sm font-semibold text-foreground">⭐ 4.9/5</p>
                <p className="text-xs text-muted-foreground">Satisfacción</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0, y: [0, 10, 0] } : {}}
                transition={{ 
                  opacity: { delay: 1.2 },
                  x: { delay: 1.2 },
                  y: { duration: 5, repeat: Infinity, delay: 1.2 }
                }}
                className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 border border-accent/30 shadow-lg"
              >
                <p className="text-sm font-semibold text-accent">98%</p>
                <p className="text-xs text-muted-foreground">Tasa de Éxito</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
