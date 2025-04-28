# --- Stage 1: Build the Vite React App ---
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (faster if you copy both package files together)
COPY package.json package-lock.json ./

# Install exact versions of dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# --- Stage 2: Serve the built app with Nginx ---
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
