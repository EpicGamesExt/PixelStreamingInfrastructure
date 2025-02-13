# rtcp-playwright-test

## Running locally
### Setup
```
npm install
npx playwright install-deps
npx playwright install firefox
npx playwright install chromium
```

### Prepare
- Run signalling server
- Start streamer pointed at signalling server
- [optional] Create .env file (can use example.env as a reference) and point to signalling server URL if not localhost

### Run tests
```
npx playwright test
```

