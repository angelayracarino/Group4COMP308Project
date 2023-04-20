FROM node:alpine

WORKDIR  /server
COPY server/package.json .
RUN npm install
COPY server .

WORKDIR  /react-client
COPY react-client/package.json .
RUN npm install
COPY react-client .


EXPOSE 3000
CMD ["npm", "start"]