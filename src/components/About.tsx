import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Más de 15 años de experiencia en el mercado",
  "Equipo multidisciplinario de especialistas",
  "Metodologías innovadoras de evaluación",
  "Red de contactos en múltiples industrias",
  "Compromiso con la confidencialidad",
  "Garantía de reposición sin costo adicional",
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute -right-64 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Su Aliado Estratégico en{" "}
              <span className="text-gradient">Capital Humano</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              En <strong className="text-foreground">Servicios Integrales de Reclutamiento</strong>, 
              nos dedicamos a conectar el talento excepcional con las oportunidades adecuadas. 
              Nuestra misión es ser el puente que une a los mejores profesionales con empresas 
              que valoran el capital humano como su activo más importante.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex px-8 py-4 bg-gradient-gold text-primary-foreground rounded-lg font-semibold glow-gold-sm"
            >
              Trabaja con Nosotros
            </motion.a>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card rounded-3xl p-10 border-primary/20">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="w-24 h-24 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 glow-gold"
                  >
                    <span className="text-4xl font-display font-bold text-primary-foreground">SIR</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Servicios Integrales de Reclutamiento
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Excelencia en gestión del talento humano
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-gradient">500+</p>
                      <p className="text-xs text-muted-foreground">Clientes</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-gradient">10K+</p>
                      <p className="text-xs text-muted-foreground">Colocaciones</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-gradient">15+</p>
                      <p className="text-xs text-muted-foreground">Años</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4 border-primary/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-sm font-semibold">⭐ 4.9/5</p>
                <p className="text-xs text-muted-foreground">Satisfacción</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 border-primary/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <p className="text-sm font-semibold text-primary">98%</p>
                <p className="text-xs text-muted-foreground">Tasa de Éxito</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
