FROM node:20-alpine AS development

WORKDIR /app

COPY clients/voter/package.json clients/voter/package-lock.json ./

RUN npm ci

COPY clients/voter ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]