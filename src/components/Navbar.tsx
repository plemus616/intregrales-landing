import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#inicio"
            className="text-2xl font-display font-bold text-gradient"
            whileHover={{ scale: 1.02 }}
          >
            SIR
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-lg font-semibold glow-gold-sm"
            >
              Contáctanos
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-lg font-semibold text-center"
                >
                  Contáctanos
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
