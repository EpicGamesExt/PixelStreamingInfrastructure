FROM node:22.14.0 as builder

WORKDIR /SignallingTester

COPY NODE_VERSION ./NODE_VERSION
COPY package.json ./package.json
COPY Common/ ./Common
COPY Extras/SS_Test/ ./Extras/SS_Test

RUN npm i
RUN cd Common && npm i && npm run build
RUN cd Extras/SS_Test && npm i && npm run build

USER node

CMD cd Extras/SS_Test && node dist/index.js


