"use strict";

const JSON5 = require("json5");

const MsSdpUtils = require("mediasoup-client/lib/handlers/sdp/commonUtils");
const SdpTransform = require("sdp-transform");
const SdpUtils = require("mediasoup-sdp-bridge/lib/SdpUtils");

const ui = {
  run: document.getElementById("run"),

  sdpAnswer: document.getElementById("sdpAnswer"),
  recvCaps: document.getElementById("recvCaps"),

  sdpOffer: document.getElementById("sdpOffer"),
  audioProducerParams: document.getElementById("audioProducerParams"),
  videoProducerParams: document.getElementById("videoProducerParams"),
};

ui.run.addEventListener("click", run);

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
    window.adapter = { browserDetails: { browser: "browser" } };
  }
});

async function run() {
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

  processAnswer(sdpAnswer.sdp);
  processOffer(sdpOffer.sdp);
}

// Generate RtpCapabilities from SDP Answer.
function processAnswer(sdpAnswer) {
  console.log(`sdpAnswer:\n${sdpAnswer}`);

  const sdpObject = SdpTransform.parse(sdpAnswer);

  const caps = MsSdpUtils.extractRtpCapabilities({ sdpObject });

  const capsStr = JSON5.stringify(caps, { space: 2, quote: `"` });
  const capsText = `export const ${adapter.browserDetails.browser}: RtpCapabilities = ${capsStr}`;

  ui.sdpAnswer.innerHTML = sdpAnswer;
  ui.recvCaps.innerHTML = capsText;

  // Optional. Run to get a log of the Consumer caps.
  // (First enable debug logs in SdpUtils source code)
  {
    SdpUtils.sdpToConsumerRtpCapabilities(sdpObject, caps);
  }
}

// Generate RtpParameters from SDP Offer.
function processOffer(sdpOffer) {
  console.log(`sdpOffer:\n${sdpOffer}`);

  const sdpObject = SdpTransform.parse(sdpOffer);

  // sdp-transform bug #94: Type inconsistency in payloads
  // https://github.com/clux/sdp-transform/issues/94
  // Force "payloads" to be a string field.
  for (const media of sdpObject.media) {
    media.payloads = "" + media.payloads;
  }

  const caps = MsSdpUtils.extractRtpCapabilities({ sdpObject });

  const audioProducerParams = SdpUtils.sdpToProducerRtpParameters(
    sdpObject,
    caps,
    "audio"
  );
  const audioProducerParamsStr = JSON5.stringify(audioProducerParams, {
    space: 2,
    quote: `"`,
  });

  const videoProducerParams = SdpUtils.sdpToProducerRtpParameters(
    sdpObject,
    caps,
    "video"
  );
  const videoProducerParamsStr = JSON5.stringify(videoProducerParams, {
    space: 2,
    quote: `"`,
  });

  ui.sdpOffer.innerHTML = sdpOffer;
  ui.audioProducerParams.innerHTML = audioProducerParamsStr;
  ui.videoProducerParams.innerHTML = videoProducerParamsStr;
}
