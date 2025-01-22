FROM node:18.17.0 as builder

WORKDIR /SignallingTester

COPY Common/ Common
COPY Extras/SS_Test/ SS_Test

WORKDIR /SignallingTester/Common

RUN npm install
RUN npm run build

WORKDIR /SignallingTester/SS_Test

RUN npm install
RUN npm link ../Common
RUN npm run build

USER node

CMD [ "node", "build/index.js" ]

