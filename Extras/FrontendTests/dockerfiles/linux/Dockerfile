FROM node:20-bookworm

WORKDIR /tester
COPY /Extras/FrontendTests .

RUN npm install
RUN npx playwright install firefox
RUN npx playwright install chromium
RUN npx playwright install-deps

VOLUME /tester/playwright-report

# CMD [ "curl", "-f", "http://streamer:4000" ]
CMD [ "npm", "run", "test" ]

