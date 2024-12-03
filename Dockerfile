FROM node:18

WORKDIR /app

COPY package*.json ./
COPY server ./server
COPY .env ./

RUN npm install

EXPOSE 3000

CMD ["node", "server/index.js"]