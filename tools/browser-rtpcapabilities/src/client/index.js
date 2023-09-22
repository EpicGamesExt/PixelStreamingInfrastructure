"use strict";

const JSON5 = require("json5");

const MsSdpUtils = require("mediasoup-client/lib/handlers/sdp/commonUtils");
const SdpTransform = require("sdp-transform");
const SdpUtils = require("mediasoup-sdp-bridge/lib/SdpUtils");

const ui = {
  run: document.getElementById("run"),

  recvSdp: document.getElementById("recvSdp"),
  recvCaps: document.getElementById("recvCaps"),

  sendSdp: document.getElementById("sendSdp"),
  sendAudioParams: document.getElementById("sendAudioParams"),
  sendVideoParams: document.getElementById("sendVideoParams"),
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
  const sdpObject = SdpTransform.parse(sdpAnswer);
  const caps = MsSdpUtils.extractRtpCapabilities({ sdpObject });
  const capsStr = JSON5.stringify(caps, { space: 2, quote: `"` });
  const capsText = `export const ${adapter.browserDetails.browser}: RtpCapabilities = ${capsStr}`;

  console.log(`recvSdp:\n${sdpAnswer}`);
  console.log(capsText);

  ui.recvSdp.innerHTML = sdpAnswer;
  ui.recvCaps.innerHTML = capsText;

  // Optional. Run if you're curious about the Consumer caps.
  //const consumerCaps = SdpUtils.sdpToConsumerRtpCapabilities(sdpObject, caps);
  //const consumerCapsStr = JSON5.stringify(consumerCaps, { space: 2, quote: `"` });
  //console.log(`consumerCaps:\n${consumerCapsStr}`);
}

// Generate RtpParameters from SDP Offer.
function processOffer(sdpOffer) {
  const sdpObject = SdpTransform.parse(sdpOffer);

  // sdp-transform bug #94: Type inconsistency in payloads
  // https://github.com/clux/sdp-transform/issues/94
  // Force "payloads" to be a string field.
  for (const media of sdpObject.media) {
    media.payloads = "" + media.payloads;
  }

  const caps = MsSdpUtils.extractRtpCapabilities({ sdpObject });

  const audioParams = SdpUtils.sdpToProducerRtpParameters(
    sdpObject,
    caps,
    "audio"
  );
  const audioParamsStr = JSON5.stringify(audioParams, { space: 2, quote: `"` });

  const videoParams = SdpUtils.sdpToProducerRtpParameters(
    sdpObject,
    caps,
    "video"
  );
  const videoParamsStr = JSON5.stringify(videoParams, { space: 2, quote: `"` });

  console.log(`sendSdp:\n${sdpOffer}`);
  console.log(`audioParams:\n${audioParamsStr}`);
  console.log(`videoParams:\n${videoParamsStr}`);

  ui.sendSdp.innerHTML = sdpOffer;
  ui.sendAudioParams.innerHTML = audioParamsStr;
  ui.sendVideoParams.innerHTML = videoParamsStr;
}
