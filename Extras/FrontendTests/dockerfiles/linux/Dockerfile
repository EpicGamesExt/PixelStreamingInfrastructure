FROM node:20-bookworm

WORKDIR /js-streamer
COPY /Extras/JSStreamer .
RUN npm install && npm run build

WORKDIR /tester
COPY /Extras/FrontendTests .
RUN npm link ../js-streamer

RUN npm install
RUN npx playwright install firefox
RUN npx playwright install chromium
RUN npx playwright install-deps

VOLUME /tester/playwright-report

# CMD [ "curl", "-f", "http://streamer:4000" ]
CMD [ "npm", "run", "test" ]

