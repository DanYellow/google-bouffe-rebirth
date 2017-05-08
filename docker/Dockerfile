FROM node:latest

WORKDIR /app

COPY . /app/

RUN npm cache clean
RUN npm install
# RUN npm install -g yarn

CMD [ "npm", "start" ]