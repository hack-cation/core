FROM node:20-alpine AS development-dependencies-env
COPY clients/voter /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY clients/voter/package.json clients/voter/package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY clients /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY clients/vote/package.json clients/voter/package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start"]