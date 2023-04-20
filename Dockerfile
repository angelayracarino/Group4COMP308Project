FROM node:alpine

WORKDIR /app

COPY package.json ./server/package.json
COPY package.json ./react-client/package.json

RUN npm install

COPY . .


EXPOSE 3000
CMD ["npm", "start"]