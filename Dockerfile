FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files and install dependencies
COPY . .
RUN npm ci
RUN npm run build

# Expose port and set environment variables
EXPOSE 8080
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["node", "server.js"]