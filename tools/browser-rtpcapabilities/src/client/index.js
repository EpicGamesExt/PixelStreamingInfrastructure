"use strict";

const MsSdpUtils = require("mediasoup-client/lib/handlers/sdp/commonUtils");
const SdpTransform = require("sdp-transform");
const JSON5 = require("json5");

const ui = {
  run: document.getElementById("run"),
  output: document.getElementById("output"),
};

ui.run.addEventListener("click", startSdp);

window.addEventListener("load", () => {
  console.log("[window.on('load')] Page loaded");

  if ("adapter" in window) {
    console.log(
      // eslint-disable-next-line no-undef
      `[window.on('load')] webrtc-adapter loaded, browser: '${adapter.browserDetails.browser}', version: '${adapter.browserDetails.version}'`
    );
  } else {
    console.warn(
      "[window.on('load')] webrtc-adapter is not loaded! an install or config issue?"
    );
  }
});

async function startSdp() {
  const pc = new RTCPeerConnection();

  pc.addTransceiver("audio", {
    direction: "sendonly",
  });

  pc.addTransceiver("video", {
    direction: "sendonly",
  });

  const sdpOffer = await pc.createOffer();
  await pc.setRemoteDescription(sdpOffer);
  const sdpAnswer = await pc.createAnswer();

  printRtpCapabilities(sdpAnswer.sdp);
}

function printRtpCapabilities(sdp) {
  const sdpObject = SdpTransform.parse(sdp);

  const caps = MsSdpUtils.extractRtpCapabilities({ sdpObject });
  //const capsStr = JSON5.stringify(caps, null, 2); // Uses single quotes, `'`.
  const capsStr = JSON5.stringify(caps, { space: 2, quote: `"` });

  const text = `export const ${
    window.adapter?.browserDetails.browser ?? "browser"
  }: RtpCapabilities = ${capsStr};`;
  console.log(text);
  ui.output.innerHTML = text;
}
