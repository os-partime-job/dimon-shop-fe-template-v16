FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["ng", "serve", "--port 3000"]
