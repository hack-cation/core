FROM node:alpine
WORKDIR /app

COPY ./clients/voter/package*.json ./

RUN npm install

COPY ./clients/voter/. .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]



