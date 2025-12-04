# Guía de Optimización SEO - Servicios Integrales de Reclutamiento

## Optimizaciones Implementadas ✅

### 1. Meta Tags y Open Graph
- ✅ Meta tags completos con palabras clave específicas de Guatemala
- ✅ Open Graph (Facebook) completamente configurado
- ✅ Twitter Cards implementados
- ✅ Tags de geolocalización para Guatemala
- ✅ Canonical URLs
- ✅ Lang="es-GT" para targetear Guatemala

### 2. Structured Data (Schema.org)
- ✅ JSON-LD implementado con múltiples tipos:
  - Organization
  - LocalBusiness (con coordenadas de Guatemala)
  - ProfessionalService
  - WebSite
  - OfferCatalog con todos los servicios

### 3. Archivos de SEO Técnico
- ✅ `sitemap.xml` - Mapa del sitio para crawlers
- ✅ `robots.txt` - Optimizado con enlace al sitemap
- ✅ `manifest.json` - PWA manifest para mejor experiencia móvil

### 4. Performance y Core Web Vitals
- ✅ **Vite PWA** configurado con service worker
- ✅ **Code splitting** automático (vendor, animations, UI)
- ✅ **Lazy loading** de imágenes no críticas
- ✅ **Preload** de recursos críticos
- ✅ **Minificación** con Terser en producción
- ✅ **Compresión GZIP** vía headers
- ✅ **Cache estratégico** de assets

### 5. Semántica y Accesibilidad
- ✅ Textos alt descriptivos en todas las imágenes
- ✅ ARIA labels en elementos interactivos
- ✅ Estructura de headings correcta (H1, H2, H3)
- ✅ Atributos width/height en imágenes (CLS prevention)
- ✅ Loading priorities (eager para hero, lazy para resto)

### 6. Configuración de Servidor
- ✅ `.htaccess` para Apache
- ✅ `nginx.conf.example` para NGINX
- ✅ Headers de seguridad
- ✅ Cache control optimizado

---

## Tareas Pendientes 🚨

### CRÍTICO - Antes de Lanzar

#### 1. Crear Imagen Open Graph
📍 **Ubicación:** `/public/og-image.jpg`
- **Dimensiones:** 1200 x 630 px
- **Formato:** JPG optimizado (< 300KB)
- **Contenido sugerido:** Logo de SIR + texto "Servicios Integrales de Reclutamiento Guatemala"
- **Herramientas:** Canva, Figma, o Photoshop

#### 2. Crear Favicons Completos
Generar todos los tamaños de favicon:
```bash
public/
├── favicon.ico (16x16, 32x32, 48x48)
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-192x192.png
├── favicon-512x512.png
└── apple-touch-icon.png (180x180)
```

**Herramientas recomendadas:**
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

#### 3. Crear Logo PNG
📍 **Ubicación:** `/public/logo.png`
- **Dimensiones:** 512 x 512 px (o proporcional)
- **Formato:** PNG con transparencia
- **Uso:** Schema.org Organization logo

#### 4. Actualizar Información de Contacto
📍 **Archivo:** `src/components/Contact.tsx` (líneas 6-25)

Reemplazar datos de ejemplo:
```typescript
{
  icon: Phone,
  label: "Teléfono",
  value: "+502 XXXX-XXXX",  // ← TU TELÉFONO REAL
  href: "tel:+502XXXXXXXX",
},
{
  icon: Mail,
  label: "Email",
  value: "contacto@sir.com.gt",  // ← CONFIRMAR EMAIL
  href: "mailto:contacto@sir.com.gt",
},
```

#### 5. Actualizar Dirección Exacta
📍 **Archivos:**
- `index.html` (línea 58-85) - Schema.org LocalBusiness
- `src/components/Contact.tsx` (línea 22)

Agregar dirección completa, ciudad, zona, coordenadas GPS exactas.

#### 6. Configurar Google Search Console
1. Ir a https://search.google.com/search-console
2. Agregar propiedad `www.sir.com.gt`
3. Verificar mediante meta tag o DNS
4. Enviar `sitemap.xml`: https://www.sir.com.gt/sitemap.xml

#### 7. Configurar Google Analytics 4
1. Crear propiedad en https://analytics.google.com
2. Instalar gtag en `index.html`:
```html
<!-- Agregar antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 8. Configurar Google Business Profile
1. Crear perfil en https://business.google.com
2. Verificar ubicación física
3. Sincronizar con información del sitio web
4. Agregar fotos, horarios, servicios

---

## Configuración de Servidor

### Para Apache (cPanel/Hosting compartido)
El archivo `.htaccess` ya está en `/public/`.
Asegúrate de que se copie a la raíz del servidor al hacer deploy.

### Para NGINX
1. Copiar `nginx.conf.example` a tu servidor
2. Adaptarlo a tus rutas
3. Reiniciar NGINX:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Para Node.js/Express
Usar `compression` y servir archivos estáticos:
```javascript
const compression = require('compression');
app.use(compression());
app.use(express.static('dist', {
  maxAge: '1y',
  immutable: true
}));
```

---

## Comandos de Build

```bash
# Desarrollo
npm run dev

# Build de producción (optimizado para SEO)
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

---

## Verificación de SEO Post-Deploy

### Herramientas de Testing
1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Objetivo: > 90 en móvil y desktop

2. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Verificar que el Schema.org esté correcto

3. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
   - Debe pasar todas las pruebas

4. **GTmetrix**: https://gtmetrix.com/
   - Performance grade A

5. **Schema Validator**: https://validator.schema.org/
   - Validar JSON-LD

### Checklist Post-Deploy
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`
- [ ] Manifest accesible en `/manifest.json`
- [ ] Todas las imágenes OG funcionando
- [ ] Meta tags correctos (view-source)
- [ ] Schema.org validado
- [ ] Performance > 90
- [ ] Accesibilidad > 90
- [ ] Best Practices > 90
- [ ] SEO > 95

---

## Palabras Clave Principales

Implementadas en el sitio:
- reclutamiento guatemala
- recursos humanos guatemala
- selección de personal guatemala
- headhunting guatemala
- evaluación psicométrica guatemala
- consultoría organizacional guatemala
- talento humano guatemala
- servicios de RRHH guatemala

---

## Métricas a Monitorear

### Google Search Console
- Impresiones
- Clics
- CTR (Click Through Rate)
- Posición promedio
- Errores de indexación

### Google Analytics
- Usuarios
- Sesiones
- Tasa de rebote (< 60% es bueno)
- Tiempo en página
- Conversiones (formulario de contacto)

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## Mantenimiento Continuo

### Mensual
- [ ] Actualizar `lastmod` en sitemap.xml
- [ ] Revisar posiciones en Search Console
- [ ] Verificar enlaces rotos
- [ ] Actualizar contenido si hay cambios

### Trimestral
- [ ] Auditoría de SEO completa
- [ ] Análisis de competencia
- [ ] Actualización de palabras clave
- [ ] Review de performance

---

## Recursos Adicionales

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev Learn Performance](https://web.dev/learn-performance/)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

---

## Contacto para Soporte

Si necesitas ayuda con alguna de estas optimizaciones, no dudes en contactar.

**Última actualización:** Diciembre 2025
