FROM node:alpine

WORKDIR  /server

COPY package.json .

RUN npm install

COPY server .


EXPOSE 3000
CMD ["npm", "start"]