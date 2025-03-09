FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
COPY --chmod=0755 ./docker-entrypoint.sh /docker-entrypoint.sh

RUN npm run build

EXPOSE 3000