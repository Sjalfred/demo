FROM node:16

WORKDIR /app
copy package.json /app

RUN npm install
copy . /app
cmd node index.js
expose 3000
