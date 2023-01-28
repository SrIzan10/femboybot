FROM node:lts

WORKDIR /app

RUN apt update && apt install chromium-browser -y

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

CMD node ./dist/index.js