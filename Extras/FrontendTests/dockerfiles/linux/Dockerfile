FROM node:20-bookworm

WORKDIR /tester
COPY /Extras/FrontendTests .

RUN npm install
RUN npx playwright install --with-deps
RUN npx playwright install chrome

VOLUME /tester/playwright-report

# CMD [ "curl", "-f", "http://streamer:4000" ]
CMD [ "npm", "run", "test" ]

