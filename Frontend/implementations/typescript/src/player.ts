// Copyright Epic Games, Inc. All Rights Reserved.

import { Config, PixelStreaming, Logger, LogLevel } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.5';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

// expose the pixel streaming object for hooking into. tests etc.
declare global {
    interface Window { pixelStreaming: PixelStreaming; }
}

document.body.onload = function() {
    Logger.InitLogging(LogLevel.Warning, true);

	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);

	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
		settingsPanelConfig: {
			isEnabled: true,
			settingVisibility: {
			  StreamerId: false,
			  ss: false,
			  TimeoutIfIdle: false,
			  ForceTURN: false,
			  LightMode: false,
			  UseMic: false,
			  MatchViewportRes: false,
			  HoveringMouse: false,
			  AFKTimeout: false,
			  AFKCountdown: false,
			  MaxReconnectAttempts: false,
			  StartVideoMuted: false
			},
			sectionVisibility: {
			  Encoder: false,
			  WebRTC: false,
			  UI: false,
			  Input: false
			}
		  }
	});
	document.body.appendChild(application.rootElement);

	window.pixelStreaming = stream;
}
