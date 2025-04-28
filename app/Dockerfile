# --- Stage 1: Build React App ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:stable-alpine

# Copy custom nginx configuration
COPY app/nginx.conf /etc/nginx/nginx.conf

# Copy built app artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
