import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Target, Award } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { CoverageMap } from "@/components/CoverageMap";

const stats = [
  { icon: Users, value: "+200", label: "Empresas atendidas", sub: "en toda Centroamérica" },
  { icon: Target, value: "95%", label: "Tasa de éxito", sub: "en colocaciones" },
  { icon: Award, value: "+15", label: "Años de experiencia", sub: "consolidando talento" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroBg}
          alt="Equipo profesional de recursos humanos en Sir Talent CA - Expertos en selección de talento en Centroamérica"
          className="w-full h-full object-cover scale-110"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </motion.div>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-6">
              Expertos en Recursos Humanos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-foreground"
          >
            Sir Talent <span className="text-gradient">CA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Reclutamiento estratégico donde el talento y la visión empresarial se encuentran.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-teal text-accent-foreground rounded-lg font-semibold inline-flex items-center gap-2 glow-teal"
            >
              Comienza Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-card border border-border hover:border-accent/50 rounded-lg font-semibold transition-colors text-foreground"
            >
              Conoce nuestros servicios
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all"
              >
                <stat.icon className="w-8 h-8 text-accent mb-3" />
                <p className="text-3xl font-bold text-gradient mb-1 leading-none">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Coverage Map */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 lg:mt-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-4">
              Cobertura Regional
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3 text-foreground">
              Dominamos el mercado de{" "}
              <span className="text-gradient">Centroamérica</span>
            </h2>
            <p className="text-muted-foreground">
              Operamos en toda la región con base estratégica en Guatemala, conectando
              talento de élite con las empresas líderes del istmo.
            </p>
          </div>
          <CoverageMap />
        </motion.div>
      </motion.div>
    </section>
  );
};
