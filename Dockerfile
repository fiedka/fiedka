FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "node_modules/.bin/next" ]
