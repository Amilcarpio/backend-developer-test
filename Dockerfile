FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN node --version
RUN npm --version

CMD ["npm", "run", "dev"]