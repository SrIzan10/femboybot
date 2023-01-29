FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

CMD node ./dist/index.js