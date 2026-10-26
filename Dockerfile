# Stage 1: Build — instala dependências, gera Prisma Client e compila Next.js
FROM node:24.15.0-slim AS builder

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN npx prisma generate && yarn build

# Stage 2: Runner — imagem mínima para produção
FROM node:24.15.0-slim AS runner

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json

CMD ["node", "src/server.js"]