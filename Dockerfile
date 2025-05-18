# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 build-base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_ALGOLIA_APPLICATION_ID
ARG NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
ARG FINANCIAL_MODELING_PREP_API_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID=$NEXT_PUBLIC_ALGOLIA_APPLICATION_ID \
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=$NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY \
    FINANCIAL_MODELING_PREP_API_KEY=$FINANCIAL_MODELING_PREP_API_KEY
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0" \
    PORT=8080
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 --ingroup nodejs nextjs
COPY package.json package-lock.json ./
RUN apk add --no-cache libc6-compat python3 build-base && \
    npm ci --omit=dev && \
    npm cache clean --force && \
    apk del python3 build-base
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 8080
CMD ["npm", "start"]