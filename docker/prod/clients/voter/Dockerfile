FROM node:alpine AS builder

WORKDIR /app

# copy client package files
COPY ./clients/voter/package.json ./clients/voter/package-lock.json* ./

# install npm dependencies
RUN npm ci

# copy the rest of the voter client source code
COPY ./clients/voter/ ./

RUN npm run build

#--

# final stage, using nginx to serve
FROM nginx:alpine

# copy built assets from builder stage's dist folder to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx listens on port 80
EXPOSE 80

