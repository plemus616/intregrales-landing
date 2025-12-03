import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+52 (55) 1234-5678",
    href: "tel:+525512345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@sir-rh.com",
    href: "mailto:contacto@sir-rh.com",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Ciudad de México, México",
    href: "#",
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contacto" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-navy" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            ¿Listo para Encontrar el{" "}
            <span className="text-gradient">Talento Ideal</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Contáctenos hoy y descubra cómo podemos ayudarle a construir 
            el equipo que su empresa necesita.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Empresa</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Cuéntanos sobre tus necesidades de reclutamiento..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-gold text-primary-foreground rounded-lg font-semibold inline-flex items-center justify-center gap-2 glow-gold-sm"
              >
                Enviar Mensaje
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-6 p-6 glass-card rounded-xl hover:border-primary/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-semibold text-lg">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* CTA Card */}
            <div className="glass-card rounded-xl p-8 border-primary/30 mt-8">
              <h3 className="text-xl font-bold mb-3">
                ¿Necesita una solución personalizada?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo está listo para diseñar un plan de reclutamiento 
                a la medida de sus necesidades específicas.
              </p>
              <motion.a
                href="tel:+525512345678"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-primary font-semibold"
              >
                <Phone className="w-5 h-5" />
                Agendar una llamada
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
