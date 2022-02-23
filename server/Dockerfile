FROM node:latest

WORKDIR /usr/src/

ENV NODE=${NODE_ENV}

COPY /env ./env

WORKDIR /usr/src/server
COPY ./server/package*.json .

RUN npm install

COPY ./server .


EXPOSE 5000
VOLUME [ "/usr/src" ]
CMD [ "npm", "run", "dev" ]