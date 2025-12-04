# Multi-stage build for production-optimized React SPA

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy public files (SEO: robots.txt, sitemap.xml, manifest.json)
COPY --from=builder /app/public/*.txt /usr/share/nginx/html/
COPY --from=builder /app/public/*.xml /usr/share/nginx/html/
COPY --from=builder /app/public/*.json /usr/share/nginx/html/
COPY --from=builder /app/public/*.webmanifest /usr/share/nginx/html/

# Expose port
EXPOSE 4173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:4173/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
