FROM node:20-alpine

WORKDIR /usr/src/app

RUN chown -R node /usr/src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g npm@10.4.0

RUN apk add --no-cache bash

COPY . .

RUN node --version
RUN npm --version

CMD ["npm", "run", "dev"]