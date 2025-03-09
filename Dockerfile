FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate 


COPY . .
COPY --chmod=0755 ./docker-entrypoint.sh /docker-entrypoint.sh

RUN npm run build

EXPOSE 3000