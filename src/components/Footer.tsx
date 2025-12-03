import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
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
      { name: "Nuestro Equipo", href: "#nosotros" },
      { name: "Testimonios", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Aviso de Privacidad", href: "#" },
      { name: "Términos de Servicio", href: "#" },
      { name: "Política de Cookies", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="text-3xl font-display font-bold text-gradient inline-block mb-4"
              whileHover={{ scale: 1.02 }}
            >
              SIR
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
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Servicios Integrales de Reclutamiento. 
            Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado con excelencia
          </p>
        </div>
      </div>
    </footer>
  );
};
