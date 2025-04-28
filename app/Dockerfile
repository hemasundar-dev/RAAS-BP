# --- Stage 1: Build React App ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:stable-alpine

# Copy custom nginx config
COPY ./app/nginx.conf /etc/nginx/nginx.conf

# Copy built app to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
