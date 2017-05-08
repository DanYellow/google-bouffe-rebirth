FROM node:boron

WORKDIR /app

COPY . /app/

RUN rm -rf ./app/node_modules

RUN npm cache clean
RUN npm install

CMD [ "npm", "start" ]