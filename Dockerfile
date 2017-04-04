FROM node:4.8.1

MAINTAINER Piotr Gołębiewski <loostro@gmail.com>

COPY store /app
WORKDIR /app

RUN npm install

COPY designer/filesystem.js /app/node_modules/api-designer/dist/scripts/filesystem.js
COPY designer/index.html /app/node_modules/api-designer/dist/index.html

VOLUME /raml
EXPOSE 3000

ENV RAML_DATAPATH=/raml
ENV RAML_PORT=3000

CMD ["npm", "start"]