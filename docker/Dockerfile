FROM node:latest

WORKDIR /app

COPY ./public/ /app/
COPY ./src/ /app/
COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN npm cache clean
RUN yarn install

CMD [ "yarn", "run", "start" ]