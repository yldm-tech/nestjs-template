# Setup node
FROM node:18-alpine as base
WORKDIR /app

# Setup yarn
FROM base as yarn
RUN corepack enable

# Deps
FROM yarn as deps
COPY package.json yarn.lock ./
RUN yarn install

# Builder
FROM yarn as builder
COPY --from=deps /app/node_modules node_modules
COPY . .
RUN yarn prisma:generate && yarn build && yarn install --production --ignore-scripts --prefer-offline

# Runner
FROM base AS runner
ENV NODE_ENV=prod
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist/main.js dist/main.js
COPY swagger.yaml swagger.yaml
ARG environment=prod
COPY env/.env.${environment} .env
EXPOSE 8000
CMD ["node", "dist/main.js"]
