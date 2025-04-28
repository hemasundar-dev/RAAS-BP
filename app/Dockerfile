# --- Stage 1: Build React App ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY app/package.json app/package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY app .

# Build the app
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:stable-alpine

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx.conf from builder
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
