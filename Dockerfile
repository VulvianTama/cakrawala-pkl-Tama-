FROM oven/bun:1.3-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --backend=copy

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV STANDALONE_MODE=true
RUN bun run build
RUN mkdir -p /app/public

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

COPY --from=build /app/src/database/ ./src/database
COPY --from=build /app/src/lib/ ./src/lib
COPY --from=deps /app/node_modules/drizzle-orm ./node_modules/drizzle-orm

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "bun ./src/database/migrate.js && bun server.js"]
