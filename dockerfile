FROM node:14.16.1
WORKDIR /urc/src/app
COPY ./package.json ./
RUN npm install
# RUN npm build
EXPOSE 5000
COPY . .
# RUN npm install @prisma/client
# RUN prisma generates
CMD [ "node", "src/app.js" ]


