FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm install
COPY . .

FROM dependencies AS builder
ENV NODE_ENV=production
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
