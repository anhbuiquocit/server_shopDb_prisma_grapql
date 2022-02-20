FROM node:14.16.1
WORKDIR /urc/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm build
EXPOSE 5000
COPY . .

CMD [ "node", "src/app.js" ]