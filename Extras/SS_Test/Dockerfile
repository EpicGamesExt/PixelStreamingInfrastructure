FROM node:18.17.0 as builder

WORKDIR /SignallingTester

COPY package.json ./package.json
COPY Common/ ./Common
COPY Extras/SS_Test/ ./Extras/SS_Test
COPY Extras/eslint/plugin-check-copyright ./Extras/eslint/plugin-check-copyright

RUN npm i
RUN cd Common && npm i && npm run build
RUN cd Extras/SS_Test && npm i && npm run build

USER node

CMD cd Extras/SS_Test && node dist/index.js


