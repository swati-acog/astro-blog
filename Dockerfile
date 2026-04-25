# ─── Stage 1: Base ───────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS base

# ─── Stage 2: Deps ───────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN bun install

# ─── Stage 3: Build ──────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# ─── Stage 4: Serve ──────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 astro

# Pre-install serve at build time so bun x finds it locally at runtime
RUN bun add serve && chown -R astro:bunjs /app

# Copy only the built static assets
COPY --from=builder --chown=astro:bunjs /app/dist ./dist

# USER astro

EXPOSE 4321

ENV PORT=4321
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "x", "serve", "dist", "-l", "4321"]
