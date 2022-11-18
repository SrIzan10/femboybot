FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

EXPOSE 7272

COPY . .

RUN npm run build

CMD node ./dist/index.js