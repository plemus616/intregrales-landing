import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, UserCheck, ClipboardCheck, Briefcase, GraduationCap, Building2 } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Búsqueda de Talento",
    description: "Identificamos y atraemos a los mejores candidatos del mercado utilizando metodologías avanzadas de hunting y sourcing.",
  },
  {
    icon: UserCheck,
    title: "Selección de Personal",
    description: "Evaluamos competencias, habilidades y fit cultural para garantizar la mejor incorporación a su equipo.",
  },
  {
    icon: ClipboardCheck,
    title: "Evaluación Psicométrica",
    description: "Aplicamos pruebas especializadas para evaluar aptitudes, personalidad y potencial de los candidatos.",
  },
  {
    icon: Briefcase,
    title: "Headhunting Ejecutivo",
    description: "Reclutamiento especializado de altos directivos y posiciones estratégicas para su organización.",
  },
  {
    icon: GraduationCap,
    title: "Capacitación y Desarrollo",
    description: "Programas de formación para potenciar las habilidades de su equipo y mejorar el desempeño organizacional.",
  },
  {
    icon: Building2,
    title: "Consultoría Organizacional",
    description: "Asesoramos en estructura organizacional, clima laboral y gestión del cambio para optimizar su empresa.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="servicios" ref={ref} className="py-24 relative bg-gradient-navy overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Animated background circles */}
      <motion.div
        className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm mb-4"
          >
            Nuestros Servicios
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Soluciones <span className="text-gradient">Integrales</span> en RRHH
          </h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos un portafolio completo de servicios diseñados para cubrir 
            todas las necesidades de gestión del talento humano en su empresa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-card rounded-2xl p-8 group hover:shadow-xl hover:shadow-accent/10 border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
