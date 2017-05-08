FROM node:latest

WORKDIR /app

COPY . /app/

RUN npm cache clean
RUN yarn install

CMD [ "yarn", "run", "start" ]