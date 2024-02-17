FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

RUN apk add --no-cache bash

COPY . .

RUN chown -R node /usr/src/app

RUN node --version
RUN npm --version
RUN npm install -g npm@10.4.0

CMD ["npm", "run", "dev"]