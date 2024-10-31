# Migrating to Pixel Streaming 2

## Why Pixel Streaming 2?

From UE 5.5 onwards, we introduced a layer that makes it easier for Epic to maintain WebRTC internally since it is used in many parts of the Engine and its peripherals. As the original Pixel Streaming plugin used WebRTC directly, the transition to use this new layer meant many parts of the plugin had to be adapted or rewritten. 

To provide a better transition phase for developers who have developed custom solutions on top of the PixelStreaming plugin, we have decided to introduce a new plugin. For the time being, both the original Pixel Streaming plugin and the Pixel Streaming 2 plugin will be shipped with Unreal Engine to give users a period of time to migrate.

## Who is impacted?

All Pixel Streaming users who are moving from Pixel Streaming plugin to the new Pixel Streaming 2 plugin should read this migration guide.

## What are the impacts?

When creating the new Pixel Streaming 2 plugin, one of our primary goals was minimal impact to the existing Pixel Streaming users. In pursuit of that goal, we have kept the flow of getting up and running with Pixel Streaming exactly the same, with all the same steps and launch arguments. However, there are a handful of blueprint nodes, C++ public API, and functionality changes that users migrating to the new plugin should be aware of. The most noticeable change for users of the C++ API is that all the WebRTC types have been removed.

## Compatibility

Pixel Streaming 2 is directly compatible with the existing Pixel Streaming infrastructure. As usual, we advise you to use the branch of the Pixel Streaming infrastructure corresponding to  your Unreal Engine version. That is, for the Unreal Engine 5.5 version of Pixel Streaming 2, you should use the UE5.5 branch of the Pixel Streaming Infrastructure.

## What specifically will break?

### Blueprints

All blueprints nodes will have a Pixel Streaming 2 (PS2) version and will need to be manually recreated and relinked (a redirector is not possible when the entire plugin name is changed).

**Migration action**

- Required actions are listed in the respective section of this document.

**Removal**

- SetPlayerLayerPreference and StreamerSetPlayerLayerPreference have been removed in favor of a frontend setting.

### Public API usage

`IPixelStreamingAudioConsumer.h`

Renamed to IPixelStreaming2AudioConsumer.h. No other changes

`IPixelStreamingAudioInput.h`

Renamed to IPixelStreaming2AudioProducer.h. No other changes

`IPixelStreamingAudioSink.h`

Renamed to IPixelStreaming2AudioSink.h. The IPixelStreamingAudioSink has had the bool HasAudioConsumers method removed. Users are not required to interact with this method. They may continue to use the remaining `AddAudioConsumer` and `RemoveAudioConsumer` methods.

`IPixelStreamingModule.h`

Renamed to `IPixelStreaming2Module.h`. The following methods have been removed as they were just wrapping CVar functionality. Users wishing to set the PS2 codec programmatically should use the Engine’s `IConsoleManager` and its relevant methods:
- `SetCodec`
- `GetCodec`

The following methods have been removed as the external video source was a hack for another plugin:

- `SetExternalVideoSourceFPS`
- `SetExternalVideoSourceCoupleFramerate`
- `SetExternalVideoSourceInput`
- `CreateExternalVideoSource`
- `ReleaseExternalVideoSource`
- `CreateVideoEncoderFactory`

The following methods have been removed from the module as the InputComponent C++ interface has moved internally to the module:

- `AddInputComponent`
- `RemoveInputComponent`
- `GetInputComponents`

The following methods have been added:
- `CreateVideoProducer`
- `CreateAudioProducer`

`IPixelStreamingSignallingConnection.h`

Has been completely removed with no replacement. This class is no longer required as signaling is abstracted away from the user in the new plugin.

`IPixelStreamingSignallingConnectionObserver.h`

Has been completely removed with no replacement. This class is no longer required as signaling is abstracted away from the user in the new plugin.

`IPixelStreamingStats.h`

Renamed to `IPixelStreaming2Stats.h`. No other changes.

`IPixelStreamingStreamer.h`

Renamed to `IPixelStreaming2Streamer.h`. Additionally, the following methods have been removed:
- `SetTargetViewport`
- `GetTargetViewport`
- `SetTargetWindow`
- `GetTargetWindow`
- `SetTargetScreenRect`
- `GetTargetScreenRect`

Users using the above methods should instead use `GetInputHandler` before calling the above methods on the input handler directly.
- `OnInputReceived` delegate has been removed. Users that were relying on this functionality should instead register a message handler with the streamer’s input handler.
- `SendPlayerMessage` renamed to `SendAllPlayerMessage` and types changes. Types changed from `uint8` to `FString`, which represents the string based identifier for the message you wish to send e.g. “Command”.
- `SendPlayerMessage` is a new method (despite having the same name as a previous method) that sends a message to a particular `PlayerId`.
- `SetInputHandler` has been removed in favor of users using the same input handler, but instead registering their own custom message handlers.

The following  methods have been removed as the signalling interface is no longer exposed through the PS2 plugin:
- `GetSignallingConnection`
- `SetSignallingConnection`
- `GetSignallingConnectionObserver`

- `SetPlayerLayerPreference` has been removed in favor of a frontend setting.
- `SetInputHandlerType` has been removed as it just proxied the input handler’s method. Users should get the input handler from the streamer and then call `SetInputType` on the handler.
- `CreateAudioInput` has been removed in favor of the Pixel Streaming module’s `CreateAudioProducer`.
- `RemoveAudioInput` has been removed as the audio input lifecycle is automatically managed.

The following methods have been renamed:
- `SetVideoInput` has been replaced with `SetVideoProducer`.
- `GetVideoInput` has been replaced with `GetVideoProducer`.

The following methods have been added:
- `GetPeerVideoSink`
- `GetUnwatchedVideoSink`

`PixelStreamingAudioComponent.h`

This header exposes two types: `FWebRTCSoundGenerator` and `UPixelStreamingEpicRtcAudioComponent` both are now private in C++. The purpose of this header was to make the Pixel Streaming audio component available for use in blueprint, this is still achieved with this header becoming private. If users need to access this functionality in C++ then they will have to make custom types that mimic these in their own project. However, this should be straightforward as all the required types are public.

`PixelStreamingBufferBuilder.h`

Has been completely removed with no replacement as it was used purely by the datachannel, which has become an internal type in Pixel Streaming 2. Users who were using the buffer builder functionality can easily replicate it in their own code as all the required types are common UE types and still available for use.

`PixelStreamingCodec.h`

Has been completely removed with no replacement and instead `EVideoCodec` from `Plugins\Experimental\AVCodecs\AVCodecsCore\Source\AVCodecsCore\Public\Video\VideoConfig.h` are used instead.

`PixelStreamingDataChannel.h`

Has been completely removed with no replacement. For users wanting to send messages, these methods have moved to `SendAllPlayerMessage` and `SendPlayerMessage` on the `IPixelStreaming2Streamer`. Users previously depending on the `OnMessageReceived` delegate should instead register a message handler with the streamer’s input handler. Users relying on `OnOpen` and `OnClosed` can use UPixelStreaming2Delegates `OnDataTrack(Open/Closed)` and `OnDataTrack(Open/Closed)Native` noting that these delegates don’t expose the track itself and are purely for tracking data track lifetime.

`PixelStreamingDelegates.h`

Renamed to `PixelStreaming2Delegates.h`. The following delegates have been removed:
- `OnQualityControllerChangedNative` as the stream sharing functionality is no longer available in PS2. For users wishing to stream to a large number of peers simultaneously, consider using the Selective Forwarding Unit (SFU) from the PixelStreamingInfra.

The following delegates have been replaced:
- Fixed spelling of `OnFallbackToSoftwareEncodering(/Native)` to `OnFallbackToSoftwareEncoding(/Native)`.
- Renamed `OnDataChannelOpen/Closed(/Native)` to `OnDataTrackOpen/Closed(/Native)`.
- `OnConnectedToSignallingServer` modified to broadcast an `FString` parameter representing the ID of the streamer that connected to the signalling server.
- `OnConnectedToSignallingServerNative` modified to broadcast an `FString` parameter representing the ID of the streamer that connected to the signalling server.
- `OnDisconnectedFromSignallingServer` modified to broadcast an `FString` parameter representing the ID of the streamer that connected to the signalling server.
- `OnDisconnectedFromSignallingServerNative` modified to broadcast an `FString` parameter representing the ID of the streamer that connected to the signalling server.

The following delegates have been added:
- Added C++ delegates for when VideoTracks and AudioTracks are Open/Closed 

Additional info:
- Moved all delegates C++ to be thread safe
- Static boolean `bIsExiting` was removed, users can track this with the global UE function `IsEngineExitRequested()`.
- Removed CreateInstance method and renamed `GetPixelStreamingEpicRtcDelegates` to simply `Get`. Users can now call `UPixelStreamingEpicRtcDelegates::Get()` to obtain the singleton pointer to the delegates object.

`PixelStreamingInputComponent.h`

Has been completely removed with no replacement. This component is used to send and receive datachannel messages from blueprint. This functionality is still exposed in blueprints, however, interacting with this type in C++ has now been made internal to the plugin only. For users wanting to send and receive datachannel messages in C++ please use `PixelStreamingInputHandler.h`, which has been exposed for several engine versions now.

`PixelStreamingPeerConnection.h`

Has been completely removed with no replacement as this file exclusively used WebRTC types which are no longer referenced in PS2.

`PixelStreamingPlayerConfig.h`

Has been completely removed with no replacement. This type was previously exposed for handling signaling messages such as `PlayerConnected`. However all signaling logic has been moved to be internal in Pixel Streaming 2, therefore this header’s types are no longer required.

`PixelStreamingPlayerId.h`

Has been completely removed with no replacement as it was typedef of `FString`. You can safely substitute `FString` in all call sites where `PixelStreamingPlayerId` was previously being used.

`PixelStreamingSessionDescriptonObserver.h`

Has been completely removed with no replacement. It was used previously to listen to changes in WebRTC session lifecycle, which is now fully handled internally.

`PixelStreamingSettings.h`

Has been completely removed with no replacement. It contained three methods: 

1. `GetSimulcastParameters`
2. `GetCaptureUseFence`
3. `GetVPXUseCompute`

 Methods (1) and (2) can be queried using CVars, ini settings, or plugin settings and (3) has been removed entirely as this codepath related to VPX compute shaders that showed no meaningful performance improvement.


`PixelStreamingSignallingConnection.h`

Has been completely removed with no replacement as signaling is now entirely internal to the plugin.

`PixelStreamingStatNames.h`

Renamed to `PixelStreaming2StatNames.h`. The `QualityController` stat has been removed because the notion of a qualityController is no longer used by PixelStreaming 2 (see below for more details about "stream sharing").

`PixelStreamingUtils.h`

Renamed to `PixelStreaming2Utils.h`.

`PixelStreamingEpicRtcTrace.h`

Has been completely removed with no replacement. This header is only for internal use inside Pixel Streaming and its related modules. If you were using this trace definition, you should create your own trace definition using `UE_TRACE_CHANNEL_EXTERN`.

`PixelStreamingVideoInput.h`
`PixelStreamingVideoInputBackBuffer.h`
`PixelStreamingVideoInputI420.h`
`PixelStreamingVideoInputNV12.h`
`PixelStreamingVideoInputPIEViewport.h`
`PixelStreamingVideoInputRenderTarget.h`
`PixelStreamingVideoInputRHI.h`

These have been moved to internal and replaced by `IPixelStreaming2VideoProducer.h` for the public API. Users can now use the Pixel Streaming module's `CreateVideoProducer` method as well as the streamer's `SetVideoProducer` method to use their custom video producers with PixelStreaming2.

`PixelStreamingVideoSink.h`

Has been removed and replaced with `IPixelStreaming2VideoSink.h`. Users must create their own class that implements `IPixelStreaming2VideoConsumer` from `IPixelStreaming2VideoConsumer.h`. Once this is done, users can obtain a video sink from the streamer's `GetVideoSink` method and then call `AddVideoConsumer` with a pointer to their custom consumer.

`PixelStreamingWebRTCIncludes.h`

Has been completely removed with no replacement as WebRTC is no longer exposed and EpicRtc is used.


#### PixelStreamingEditor

`IPixelStreamingEditorModule.h`

Renamed to `IPixelStreaming2EditorModule.h`. Additionally, the `bool UseExternalSignallingServer` and `void UseExternalSignallingServer(bool bUseExternalSignallingServer)` methods have been removed and this information should instead be queried from the appropriate ini / cvar settings.

`PixelStreamingEditorUtils.h`

This header has been removed. It contained three methods:

1. `ToString(EStreamType)`
2. `ToString(EWindowType)`
3. `HashWindow`

All three methods were dead code and have been removed entirely. The `EStreamType` enum has moved to  `PixelStreaming2CoreEnums.h` and renamed to `EPixelStreaming2EditorStreamTypes`.


`PixelStreamingStyle.h`

This header has been made internal. Its functionality was only used internally for the Editor streaming module and as such has been relocated.

`PixelStreamingVideoBackBufferComposited.h`

This header has been made internal. Its functionality was only used internally for the Editor streaming module and as such has been relocated.

`PixelStreamingVideoViewport.h`

This header has been made internal. Its functionality was only used internally for the Editor streaming module and as such has been relocated.

#### PixelStreamingHMD

`IPixelStreamingHMDModule.h`

Renamed to `IPixelStreaming2HMDModule.h`. Additionally, `GetPixelStreamingHMD` now returns the new interface type.

`PixelStreamingHMD.h`

This header has been replaced with `IPixelStreaming2HMD.h`. Users can use the two exposed functions exactly as they previously were used:

1.  `SetTransform`
2.  `SetEyeViews`

`PixelStreamingHMDEnums.h`

Renamed to `PixelStreaming2HMDEnums.h`.

#### PixelStreamingServers

`PixelStreamingServers.h`

The following methods have been removed: 

1. `MakeCirrusServer`
2. `MakeLegacySignallingServer`

 With these removals, users wishing to launch a signalling server from directly inside UE are left with one remaining function, this function launches an embedded C++ signalling server that still serves the PixelStreamingInfra frontend.

`EndPoint` has had `Signalling_Matchmaker` removed from its enum.

#### PixelStreamingInput

`EditorPixelStreamingSettings.h`

The purpose of this header was to expose some plugin settings that can be set via the Unreal Editor plugin UI. This functionality has now been made internal; however, you may still set these settings using the plugin UI.

`IPixelStreamingInputHandler`

 - `OnSendMessage`

This member has been changed from a multicast delegate to an event as only internal Pixel Streaming code should be able to broadcast this event. However, you may still bind to this member to add custom handling to messages that input handler is sending over the datachannel (e.g. the gamepad id message and textbox entry message).

`IPixelStreamingInputModule`

- `OnProtocolUpdated`

This member delegate has been moved into the new interface `IPixelStreamingDataProtocol`, which can be accessed via the `IPixelStreamingInputHandler::GetFromStreamerProtocol()` and `IPixelStreamingInputHandler::GetToStreamerProtocol()`.The functionality remains the same, except now each streamer can have its own protocols (e.g. each streamer has a `ToStreamer` and `FromStreamer` protocol), and as such each protocol has its own `OnProtocolUpdated` delegate.

`PixelStreamingInputConversion.h`
This header was only used by the PixelStreaming Input module, so it has now been made private. If you were using mappings from this header, then you can replicate those mappings in your own project by creating your own version of these maps and populating them. All the types required are public and available.

`PixelStreamingEnums.h`

Added `EPixelSreamingToStreamerMessage` `FString`s and `EPixelSreamingFromStreamerMessage` `FString`s. These are effectively used as enums.

`PixelStreamingInputMessage.h`

Has been completely removed. There is now a new header that exposes an interface for these messages in `IPixelStreaming2InputMessage.h`. 

`PixelStreamingInputProtocol.h`

This header has been removed. The two static protocols in this header have been replaced with `IPixelStreaming2InputHandler::GetToStreamerProtocol` and `IPixelStreaming2InputHandler::GetFromStreamerProtocol`.

`PixelStreamingInputProtocolMap.h`

This header was previously used to add custom data channel messages and has been moved to internal. Users wishing to create and add their own Input Message should no longer use the map directly, but rather use the `Add()` method from `IPixelStreaming2DataProtocol`, which if successful, will return the newly created and added message. 

### Stream sharing

"Stream sharing" used to be a concept of having one video stream encoded and sent to many peers (despite their bandwidth or connection quality) and having one "quality controlling" peer to determine keyframes, bandwidth, retranmissions, and so on. This "feature" has been removed as it was a hack with many issues around stuttering and freezing, the better solution is to run an encoding session per peer (the new default) or use an SFU from the PSInfra repo.

**Migration action**
- Users who were relying on the "stream sharing" functionality to support multiple viewers per stream should instead opt to use the Selective Forwarding Unit (SFU) as a replacement for this functionality. More information on its functionality and how to use it can be found at: https://dev.epicgames.com/documentation/en-us/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine#whatisthesfu 

### Settings Changes

There has been a refactor of Pixel Streaming Settings so that they can be set from ini, console or command line. Some settings have had their default values changed and some legacy settings have been deprecated. ProjectSettings->Plugins->Pixelstreaming2 now lists all settings that can be changed and their default values. Settings priority order is: ini is overridden by command line which is overridden by console.

**Migration action**

Changed Console Settings:

- `-PixelStreamingDisableLatencyTester` - switched to `true` until refactored and stats goes back in.
- `-PixelStreamingSignalingKeepAliveInterval` - New! How often (in seconds) a keep-alive message should be sent over the signalling websocket connection.
- `-PixelStreamingUseMediaCapture` - `true` now by default. This shows a similar capture time performance to no fencing, but is much safer in avoiding tearing, corruption, or out of order frames AND has much better performance than the old `CaptureUseFence` option. Note, it does incur about 10% more CPU usage on AWS g4dn in our testing.
- `-PixelStreamingID` - can now be set by command line.
- `-PixelStreamingSendPlayerIdAsInteger` - deprecated. Strings are the way forward for all our peer ids.
- `-PixelStreamingVPXUseCompute` - Removed as it showed no meaningful performance gains.
- `-PixelStreamingIP` - deprecation warning: use `PixelStreamingSignallingURL`
- `-PixelStreamingPort` - deprecation warning: use `PixelStreamingSignallingURL`
- `-PixelStreamingURL` - deprecation warning: use `PixelStreamingSignallingURL`
- `-PixelStreamingSignallingURL` - If none of the above ip+port or url are set then this must be set or Pixel Streaming 2 will not connect to any signaling server.
- `-PixelStreamingExperimentalAudioInput` - removed and now always enabled.
- `-PixelStreamingSuppressICECandidateErrors` - removed as it was only useful for some flaky tests, which have since been stabilized.
- `-PixelStreamingFastPan` - removed as there was no code path that has used this option for multiple UE versions now.
- `-PixelStreamingEncoderMinQuality` - replaces `-PixelStreamingEncoderMaxQP` which sets the lower bound for encoding quality. The reason for this change was `MaxQP` controlling the quality lower bound was unclear to most users and the previous value range, [1-51], was only useful for H.264. The new range is [0 - 100], where 0 is the lowest quality and 100 is the highest quality, can be used across all supported Pixel Streaming codecs such as VPX and AV1 which have entirely different QP ranges.
- `-PixelStreamingEncoderMaxQuality` - replaces `-PixelStreamingEncoderMinQP` which sets the upper bound for encoding quality. The reason for this change was `MinQP` controlling the quality upper bound was unclear to most users and the previous value range, [1-51], was only useful for H.264. The new range is [0 - 100], where 0 is the lowest quality and 100 is the highest quality, can be used across all supported Pixel Streaming codecs such as VPX and AV1 which have entirely different QP ranges.
- `-PixelStreamingEncoderPreset` - Replaced with `-PixelStreamingEncoderQualityPreset` and `-PixelStreamingEncoderLatencyMode` to provide better configuration of the encoder quality/latency.
- `-PixelStreamingEncoderQualityPreset` - Preset that configures several settings of an encoder and balances quality and bitrate.
- `-PixelStreamingEncoderLatencyMode` - new setting that configures several aspects of an encoder and balances latency and quality. Note selecting lower latency modes with a high quality preset will likely result in lower quality than if latency is default.
- `-PixelStreamingEncoderIntraRefreshPeriodFrames` - removed as its functionality was duplicated by `-PixelStreamingEncoderKeyframeInterval`.
- `-PixelStreamingEncoderRateControl` - Removed as only `CBR` mode is widely used and tested in Pixel Streaming.
- `-PixelStreamingEnableFillerData` - Removed as no real use was found for this setting.
- `-PixelStreamingEncoderMultipass` - removed: low latency modes will disable mulitpass anyway, so this setting was redundant.
- `-PixelStreamingEncoderIntraRefreshPeriodFrames` - Removed as these settings were too NVENC specific and not widely useful.
- `-PixelStreamingEncoderIntraRefreshCountFrames` - Removed as these settings were too NVENC specific and not widely useful.
- `-PixelStreamingDegradationPreference` - Removed and hardcoded to `MAINTAIN_FRAMERATE` as many assumptions within the Pixel Streaming pipeline require WebRTC to be configured in this way.
- `-PixelStreamingEncoderKeyframeInterval` - The default is now `-1`, which mean no periodic keyframes will be sent. Keyframes will only be sent as needed by the connected peer, this will reduce bandwidth usage and really only existed to facilitate the now removed "stream sharing" feature anyway.
- `-SimulcastParameters` - replaced with `-PixelStreamingEncoderEnableSimulcast` and `-PixelStreamingEncoderScalabilityMode`.
- `-PixelStreamingEncoderScalabilityMode` - specifies the encoder scalability mode which is one of the supported modes: https://www.w3.org/TR/webrtc-svc/#scalabilitymodes*.
- `-PixelStreamingWebRTCMaxBitrate` - Lowered the default from 100mb/s to 40mb/s as this was causing issues with congestion in many real world networks.
- `-PixelStreamingWebRTCLowQpThreshold` - Removed as this was an internal WebRTC setting that was not properly exposed to work correctly.
- `-PixelStreamingWebRTCHighQpThreshold` - Removed as this was an internal WebRTC setting that was not properly exposed to work correctly.
- `-PixelStreamingWebRTCUseLegacyAudioDevice` - removed and LegacyAudioDevice is deprecated.

## PixelStreamingPlayer (Engine/Plugins/Experimental/PixelStreamingPlayer)

In Pixel Streaming 2, the Pixel Streaming player functionality is no longer a standalone plugin but has been combined to become a part of the Pixel Streaming 2 plugin.

`PixelStreamingMediaTexture.h`

Has been completely removed with no replacement. This component is used to update materials with video frames received in PS2. This functionality is still exposed in blueprints, however, interacting with this type in C++ has now been made internal to the plugin only. For users wanting to display video frames received in PS2, users should implement `IPixelStreaming2VideoConsumer` and add it to an `IPixelStreaming2VideoSink`.

`PixelStreamingPeerComponent.h`

Has been completely removed with no replacement. This component is used to receive a PixelStreaming stream in the engine. This functionality is still exposed in blueprints, however, interacting with this type in C++ has now been made internal to the plugin only. For users wanting to receive a stream in the engine, users should implement their own peer similar to how this class achieves the functionality.

`PixelStreamingSignallingComponent.h`

Has been completely removed with no replacement. This class is no longer required as signaling is abstracted away from the user in the new plugin.

`PixelStreamingWebRTCWrappers.h`

Has been completely removed with no replacement as WebRTC is no longer exposed.

### Blueprints

A significant portion of the blueprint nodes required to set up a PixelStreamingPlayer component have been removed. The following steps outline the new process for initializing a `UPixelStreamingEpicRtcPeer` component:
1. Enable the Pixel Streaming2 plugin.
2. Create a new Blueprint class (Actor). Save and name this anything you like.
3. Open the new Blueprint class and add the Pixel Streaming Peer Component.
4. Drag the Pixel Streaming Peer Component into the event graph. Drag off from this node and create a Connect node. Connect BeginPlay to the input of the new node and enter “ws://localhost:80” into the URL value.
5. Right click on the Pixel Streaming Peer Component in the “Components” tab and add the “OnStreamerList” event to the event graph.
6. It is ultimately up to you how you want to handle which streamer this peer should subscribe to. In this example, we’re just going to subscribe to the first streamer available. To do so, drag the Pixel Streaming Peer Component into the event graph and drag off of it to create a “Subscribe” node. Connect the “exec” output of “OnStreamerList” to the “exec” input of “Subscribe”.  Drag off of the “Streamer List” output of “OnStreamerList” and “Get (a ref)” with index 0. Connect the output of the Get node to the “Streamer Id’ input of “Subscribe”
7. Left click the Pixel Streaming Peer component in the “Components” tab. In the Details window, under Properties, you should see Pixel Streaming Video Consumer. Select the drop down and choose Pixel Streaming Media Texture. Name and save accordingly.
8. When prompted, select and save the Video Output Media Asset.
9. Drag your Blueprint Actor into the scene. Create a simple plane object and re-size and shape it into a suitable display.
10. Drag your saved Pixel Streaming Media Texture directly from the content browser onto the plane in the scene. This will automatically create a Material and apply it to the object.
11. Start a basic local Pixel Stream external to this project. Start the Signalling server and run the application with relevant Pixel Streaming args.
12. Play your scene. You should now see your external Pixel Stream displayed on the plane in your scene!

<p align="center">
    <img src="Resources\Images\pixelstreamingplayerblueprint.png" alt="Pixel Streaming Player Blueprint">
</p>
