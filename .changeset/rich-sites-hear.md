---
'@epicgames-ps/lib-pixelstreamingfrontend-ue5.6': minor
---

This change fixes an intermittent WebRTC connection failure where even when the appropriate ICE candidates were present the conection would sometimes fail to be made. This was caused due to the order that ICE candidates were being sent (hence the intermittent nature of the issues) and the fact that ICE candidates sent from Pixel Streaming plugin contain sdpMid and sdpMLineIndex. sdpMid and sdpMLineIndex are only necessary in legacy, non bundle, WebRTC streams; however, Pixel Streaming always assumes bundle is used and these attributes can safely be set to empty strings/omitted (respectively). We perform this modification in the frontend library prior to adding the ICE candidate to the peer connection. This change was tested on a wide range of target devices and browsers to ensure there was no adverse side effects prior.
