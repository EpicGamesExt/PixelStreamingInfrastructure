FROM node:20-bookworm

WORKDIR /tester
COPY /Extras/MinimalStreamTester .

RUN npm install
RUN npx playwright install --with-deps
RUN npx playwright install chrome

VOLUME /tester/playwright-report

CMD [ "npx", "playwright", "test" ]
