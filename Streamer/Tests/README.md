# rtcp-playwright-test

## Running locally
### Setup
```
npm ci
npx playwright install --with-deps
```

The above command should install the required browsers but for some reason I find I have to install chrome manually using the following command.

```
npx playwright install chrome
```

### Prepare
- Run signalling server
- Start streamer pointed at signalling server
- [optional] Create .env file (can use example.env as a reference) and point to signalling server URL if not localhost

### Run tests
```
npx playwright test --grep @basic
```

## Running containerized

- Run signalling server
- Start streamer pointed at signalling server
- Use the following docker command to launch the tests
```
docker run --rm --network="host" -e PIXELSTREAMING_URL=[signalling server http url] -v [local playwright report directory]:/Playwright/playwright-report hub.ol.epicgames.net/media/pixel-streaming-playwright-tests:5.4
```
