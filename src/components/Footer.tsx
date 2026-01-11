import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/servicios-integrales-de-reclutamiento/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/17mFMdG21X/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/serviciosdereclutamiento.gt?igsh=MTBmOXhxaW0yamVpYg==", label: "Instagram" },
];

const footerLinks = [
  {
    title: "Servicios",
    links: [
      { name: "Búsqueda de Talento", href: "#servicios" },
      { name: "Selección de Personal", href: "#servicios" },
      { name: "Headhunting", href: "#servicios" },
      { name: "Consultoría", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nosotros", href: "#nosotros" },
      { name: "Contacto", href: "#contacto" },
    ],
  },
];

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="py-16 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
        >
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="inline-block mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/logo.png"
                alt="Logo de Servicios Integrales de Reclutamiento (SIR) Guatemala"
                className="h-20 w-auto"
                width="auto"
                height="80"
                loading="lazy"
              />
            </motion.a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Servicios Integrales de Reclutamiento - Su socio estratégico en
              la búsqueda del mejor talento humano.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-accent/20 transition-colors text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, i) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-foreground">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-border flex justify-center items-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Servicios Integrales de Reclutamiento. 
            Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
