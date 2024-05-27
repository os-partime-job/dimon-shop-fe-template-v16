FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install --force

RUN npm run build

ENTRYPOINT ["ng", "serve"]
