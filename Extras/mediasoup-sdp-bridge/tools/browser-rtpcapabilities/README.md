# browser-rtpcapabilities

This tool generates default SDP Offer/Answer messages from the web browser you use to run it, and uses that to generate an equivalent mediasoup `RtpCapabilities` object.

Run it like this:

```sh
cd mediasoup-sdp-bridge/
npm install
npm run build

cd tools/browser-rtpcapabilities/
npm install
npm run start
```

Now, open a web browser at http://127.0.0.1:8080, and click on *Run*.

The topmost output is source code for a JavaScript object, which you can copy-paste into the file [mediasoup-sdp-bridge/src/BrowserRtpCapabilities.ts](../../src/BrowserRtpCapabilities.ts).
