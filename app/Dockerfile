# --- Stage 1: Build React App ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Build the app
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:stable-alpine

# Copy only necessary files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Now manually copy nginx.conf from builder
COPY --from=builder /app/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
