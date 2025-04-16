# syntax=docker/dockerfile:1
FROM node:23-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG FINANCIAL_MODELING_PREP_API_KEY
ENV FINANCIAL_MODELING_PREP_API_KEY=$FINANCIAL_MODELING_PREP_API_KEY
RUN npm run build

# Production image, copy files and run
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 8080
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]