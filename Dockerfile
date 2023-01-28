FROM node:lts

WORKDIR /app

RUN apt update && apt install chromium -y

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

CMD node ./dist/index.js