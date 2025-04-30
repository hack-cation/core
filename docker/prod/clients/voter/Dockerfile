FROM node:alpine AS builder
WORKDIR /app

COPY ./clients/voter/package*.json ./

RUN npm install

COPY ./clients/voter/. .

RUN npm run build

FROM node:alpine
WORKDIR /app

ENV NODE_ENV=production

COPY ./clients/voter/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/build .

EXPOSE 3000

CMD ["node", "server/index.js"]