# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps
COPY package.json package-lock.json bun.lockb ./
RUN npm install

# Copy all source code
COPY . .

# Build the app
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy built assets to nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
