// Copyright Epic Games, Inc. All Rights Reserved.
import { FlagsIds, NumericParametersIds, OptionParametersIds, TextParametersIds } from '../Config/Config';
import { LatencyTestResults } from '../DataChannel/LatencyTestResults';
import { AggregatedStats } from '../PeerConnectionController/AggregatedStats';
import { InitialSettings } from '../DataChannel/InitialSettings';
import { LatencyInfo } from '../PeerConnectionController/LatencyCalculator';
import { Messages } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.6';
import { SettingFlag } from '../Config/SettingFlag';
import { SettingNumber } from '../Config/SettingNumber';
import { SettingText } from '../Config/SettingText';
import { SettingOption } from '../Config/SettingOption';
import {
    DataChannelLatencyTestResponse,
    DataChannelLatencyTestResult
} from '../DataChannel/DataChannelLatencyTestResults';

/**
 * An event that is emitted when AFK disconnect is about to happen.
 * Can be cancelled by calling the callback function provided as part of the event.
 */
export class AfkWarningActivateEvent extends Event {
    override readonly type: 'afkWarningActivate';
    readonly data: {
        /** How many seconds until the session is disconnected */
        countDown: number;
        /** Callback function that needs to be called if you wish to cancel the AFK disconnect timeout. */
        dismissAfk: () => void;
    };
    constructor(data: AfkWarningActivateEvent['data']) {
        super('afkWarningActivate');
        this.data = data;
    }
}

/**
 * An event that is emitted when the AFK disconnect countdown is updated.
 */
export class AfkWarningUpdateEvent extends Event {
    override readonly type: 'afkWarningUpdate';
    readonly data: {
        /** How many seconds until the session is disconnected */
        countDown: number;
    };
    constructor(data: AfkWarningUpdateEvent['data']) {
        super('afkWarningUpdate');
        this.data = data;
    }
}

/**
 * An event that is emitted when AFK warning is deactivated.
 */
export class AfkWarningDeactivateEvent extends Event {
    override readonly type: 'afkWarningDeactivate';
    constructor() {
        super('afkWarningDeactivate');
    }
}

/**
 * An event that is emitted when AFK countdown reaches 0 and the user is disconnected.
 */
export class AfkTimedOutEvent extends Event {
    override readonly type: 'afkTimedOut';
    constructor() {
        super('afkTimedOut');
    }
}

/**
 * An event that is emitted when we receive new video quality value.
 */
export class VideoEncoderAvgQPEvent extends Event {
    override readonly type: 'videoEncoderAvgQP';
    readonly data: {
        /** Average video quality value */
        avgQP: number;
    };
    constructor(data: VideoEncoderAvgQPEvent['data']) {
        super('videoEncoderAvgQP');
        this.data = data;
    }
}

/**
 * An event that is emitted after a WebRtc connection has been negotiated.
 */
export class WebRtcSdpEvent extends Event {
    override readonly type: 'webRtcSdp';
    constructor() {
        super('webRtcSdp');
    }
}

/**
 * An event that is emitted after the SDP answer is set.
 */
export class WebRtcSdpAnswerEvent extends Event {
    override readonly type: 'webRtcSdpAnswer';
    readonly data: {
        /** The sdp answer */
        sdp: RTCSessionDescriptionInit;
    };
    constructor(data: WebRtcSdpAnswerEvent['data']) {
        super('webRtcSdpAnswer');
        this.data = data;
    }
}

/**
 * An event that is emitted after the SDP offer is set.
 */
export class WebRtcSdpOfferEvent extends Event {
    override readonly type: 'webRtcSdpOffer';
    readonly data: {
        /** The sdp offer */
        sdp: RTCSessionDescriptionInit;
    };
    constructor(data: WebRtcSdpOfferEvent['data']) {
        super('webRtcSdpOffer');
        this.data = data;
    }
}

/**
 * An event that is emitted when auto connecting.
 */
export class WebRtcAutoConnectEvent extends Event {
    override readonly type: 'webRtcAutoConnect';
    constructor() {
        super('webRtcAutoConnect');
    }
}

/**
 * An event that is emitted when sending a WebRtc offer.
 */
export class WebRtcConnectingEvent extends Event {
    override readonly type: 'webRtcConnecting';
    constructor() {
        super('webRtcConnecting');
    }
}

/**
 * An event that is emitted when WebRtc connection has been established.
 */
export class WebRtcConnectedEvent extends Event {
    override readonly type: 'webRtcConnected';
    constructor() {
        super('webRtcConnected');
    }
}

/**
 * An event that is emitted if WebRtc connection has failed.
 */
export class WebRtcFailedEvent extends Event {
    override readonly type: 'webRtcFailed';
    constructor() {
        super('webRtcFailed');
    }
}

/**
 * An event that is emitted if WebRtc connection is disconnected.
 */
export class WebRtcDisconnectedEvent extends Event {
    override readonly type: 'webRtcDisconnected';
    readonly data: {
        /** Message describing the disconnect reason */
        eventString: string;
        /** true if the user is able to reconnect, false if disconnected because of unrecoverable reasons like not able to connect to the signaling server */
        allowClickToReconnect: boolean;
    };
    constructor(data: WebRtcDisconnectedEvent['data']) {
        super('webRtcDisconnected');
        this.data = data;
    }
}

/**
 * An event that is emitted when RTCDataChannel is opened.
 */
export class DataChannelOpenEvent extends Event {
    override readonly type: 'dataChannelOpen';
    readonly data: {
        /** Data channel label. One of 'datachannel', 'send-datachannel', 'recv-datachannel' */
        label: string;
        /** RTCDataChannel onOpen event */
        event: Event;
    };
    constructor(data: DataChannelOpenEvent['data']) {
        super('dataChannelOpen');
        this.data = data;
    }
}

/**
 * An event that is emitted when RTCDataChannel is closed.
 */
export class DataChannelCloseEvent extends Event {
    override readonly type: 'dataChannelClose';
    readonly data: {
        /** Data channel label. One of 'datachannel', 'send-datachannel', 'recv-datachannel' */
        label: string;
        /** RTCDataChannel onClose event */
        event: Event;
    };
    constructor(data: DataChannelCloseEvent['data']) {
        super('dataChannelClose');
        this.data = data;
    }
}

/**
 * An event that is emitted on RTCDataChannel errors.
 */
export class DataChannelErrorEvent extends Event {
    override readonly type: 'dataChannelError';
    readonly data: {
        /** Data channel label. One of 'datachannel', 'send-datachannel', 'recv-datachannel' */
        label: string;
        /** RTCDataChannel onError event */
        event: Event;
    };
    constructor(data: DataChannelErrorEvent['data']) {
        super('dataChannelError');
        this.data = data;
    }
}

/**
 * An event that is emitted when the video stream has been initialized.
 */
export class VideoInitializedEvent extends Event {
    override readonly type: 'videoInitialized';
    constructor() {
        super('videoInitialized');
    }
}

/**
 * An event that is emitted when video stream loading starts.
 */
export class StreamLoadingEvent extends Event {
    override readonly type: 'streamLoading';
    constructor() {
        super('streamLoading');
    }
}

/**
 * An event that is emitted when video stream loading has finished.
 */
export class StreamPreConnectEvent extends Event {
    override readonly type: 'streamConnect';
    constructor() {
        super('streamConnect');
    }
}

/**
 * An event that is emitted when video stream has stopped.
 */
export class StreamPreDisconnectEvent extends Event {
    override readonly type: 'streamDisconnect';
    constructor() {
        super('streamDisconnect');
    }
}

/**
 * An event that is emitted when video stream is reconnecting.
 */
export class StreamReconnectEvent extends Event {
    override readonly type: 'streamReconnect';
    constructor() {
        super('streamReconnect');
    }
}

/**
 * An event that is emitted if there are errors loading the video stream.
 */
export class PlayStreamErrorEvent extends Event {
    override readonly type: 'playStreamError';
    readonly data: {
        /** Error message */
        message: string;
    };
    constructor(data: PlayStreamErrorEvent['data']) {
        super('playStreamError');
        this.data = data;
    }
}

/**
 * An event that is emitted before trying to start video playback.
 */
export class PlayStreamEvent extends Event {
    override readonly type: 'playStream';
    constructor() {
        super('playStream');
    }
}

/**
 * An event that is emitted if the browser rejects video playback. Can happen for example if
 * video auto-play without user interaction is refused by the browser.
 */
export class PlayStreamRejectedEvent extends Event {
    override readonly type: 'playStreamRejected';
    readonly data: {
        /** Rejection reason */
        reason: unknown;
    };
    constructor(data: PlayStreamRejectedEvent['data']) {
        super('playStreamRejected');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving a full FreezeFrame image from UE.
 */
export class LoadFreezeFrameEvent extends Event {
    override readonly type: 'loadFreezeFrame';
    readonly data: {
        /** true if should show click-to-play overlay, not the freeze frame contents */
        shouldShowPlayOverlay: boolean;
        /** true if the received image is valid */
        isValid: boolean;
        /** Image data. Can be e.g. displayed by encoding as a data url. */
        jpegData?: Uint8Array;
    };
    constructor(data: LoadFreezeFrameEvent['data']) {
        super('loadFreezeFrame');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving UnfreezeFrame message from UE and video playback is about to be resumed.
 */
export class HideFreezeFrameEvent extends Event {
    override readonly type: 'hideFreezeFrame';
    constructor() {
        super('hideFreezeFrame');
    }
}

/**
 * An event that is emitted when receiving WebRTC statistics.
 */
export class StatsReceivedEvent extends Event {
    override readonly type: 'statsReceived';
    readonly data: {
        /** Statistics object */
        aggregatedStats: AggregatedStats;
    };
    constructor(data: StatsReceivedEvent['data']) {
        super('statsReceived');
        this.data = data;
    }
}

/**
 * An event that is emitted when streamer list changes.
 */
export class StreamerListMessageEvent extends Event {
    override readonly type: 'streamerListMessage';
    readonly data: {
        /** Streamer list message containing an array of streamer ids */
        messageStreamerList: Messages.streamerList;
        /** Auto-selected streamer from the list, or null if unable to auto-select and user should be prompted to select */
        autoSelectedStreamerId: string;
        /** Wanted streamer id from various configurations. */
        wantedStreamerId: string;
    };
    constructor(data: StreamerListMessageEvent['data']) {
        super('streamerListMessage');
        this.data = data;
    }
}

/**
 * An event that is emitted when a subscribed to streamer's id changes.
 */
export class StreamerIDChangedMessageEvent extends Event {
    override readonly type: 'streamerIDChangedMessage';
    readonly data: {
        /** The new ID of the streamer. */
        newID: string;
    };
    constructor(data: StreamerIDChangedMessageEvent['data']) {
        super('StreamerIDChangedMessage');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving latency test results.
 */
export class LatencyTestResultEvent extends Event {
    override readonly type: 'latencyTestResult';
    readonly data: {
        /** Latency test result object */
        latencyTimings: LatencyTestResults;
    };
    constructor(data: LatencyTestResultEvent['data']) {
        super('latencyTestResult');
        this.data = data;
    }
}

/**
 * An event that is emitted everytime latency is calculated using the WebRTC stats API.
 */
export class LatencyCalculatedEvent extends Event {
    override readonly type: 'latencyCalculated';
    readonly data: {
        latencyInfo: LatencyInfo;
    };
    constructor(data: LatencyCalculatedEvent['data']) {
        super('latencyCalculated');
        this.data = data;
    }
}

/**
 * An event that is emitted when we receive the "onScreenKeyboard" command from UE.
 */
export class ShowOnScreenKeyboardEvent extends Event {
    override readonly type: 'showOnScreenKeyboard';
    readonly data: {
        showOnScreenKeyboard: boolean;
        x: number;
        y: number;
        contents: string;
    };
    constructor(data: ShowOnScreenKeyboardEvent['data']) {
        super('showOnScreenKeyboard');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving data channel latency test response from server.
 * This event is handled by DataChannelLatencyTestController
 */
export class DataChannelLatencyTestResponseEvent extends Event {
    override readonly type: 'dataChannelLatencyTestResponse';
    readonly data: {
        /** Latency test result object */
        response: DataChannelLatencyTestResponse;
    };
    constructor(data: DataChannelLatencyTestResponseEvent['data']) {
        super('dataChannelLatencyTestResponse');
        this.data = data;
    }
}

/**
 * An event that is emitted when data channel latency test results are ready.
 */
export class DataChannelLatencyTestResultEvent extends Event {
    override readonly type: 'dataChannelLatencyTestResult';
    readonly data: {
        /** Latency test result object */
        result: DataChannelLatencyTestResult;
    };
    constructor(data: DataChannelLatencyTestResultEvent['data']) {
        super('dataChannelLatencyTestResult');
        this.data = data;
    }
}

export class SubscribeFailedEvent extends Event {
    override readonly type: 'subscribeFailed';
    readonly data: {
        message: string;
    };
    constructor(data: SubscribeFailedEvent['data']) {
        super('subscribeFailed');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving initial settings from UE.
 */
export class InitialSettingsEvent extends Event {
    override readonly type: 'initialSettings';
    readonly data: {
        /** Initial settings from UE */
        settings: InitialSettings;
    };
    constructor(data: InitialSettingsEvent['data']) {
        super('initialSettings');
        this.data = data;
    }
}

export type SettingsData =
    | {
          /** Flag id */
          id: FlagsIds;
          type: 'flag';
          /** Flag value */
          value: boolean;
          /** SettingFlag object */
          target: SettingFlag;
      }
    | {
          /** Numeric setting id */
          id: NumericParametersIds;
          type: 'number';
          /** Numeric setting value */
          value: number;
          /** SettingNumber object */
          target: SettingNumber;
      }
    | {
          /** Text setting id */
          id: TextParametersIds;
          type: 'text';
          /** Text setting value */
          value: string;
          /** SettingText object */
          target: SettingText;
      }
    | {
          /** Option setting id */
          id: OptionParametersIds;
          type: 'option';
          /** Option setting selected value */
          value: string;
          /** SettingOption object */
          target: SettingOption;
      };

/**
 * An event that is emitted when PixelStreaming settings change.
 */
export class SettingsChangedEvent extends Event {
    override readonly type: 'settingsChanged';
    readonly data: SettingsData;
    constructor(data: SettingsChangedEvent['data']) {
        super('settingsChanged');
        this.data = data;
    }
}

/**
 * Event emitted when an XR Session starts
 */
export class XrSessionStartedEvent extends Event {
    override readonly type: 'xrSessionStarted';
    constructor() {
        super('xrSessionStarted');
    }
}

/**
 * Event emitted when an XR Session ends
 */
export class XrSessionEndedEvent extends Event {
    override readonly type: 'xrSessionEnded';
    constructor() {
        super('xrSessionEnded');
    }
}

export type XrFrameData = {
    /** The frame timestamp  */
    time: DOMHighResTimeStamp;
    /** The XRFrame */
    frame: XRFrame;
};

/**
 * Event emitted when an XR Frame is complete
 */
export class XrFrameEvent extends Event {
    override readonly type: 'xrFrame';
    readonly data: XrFrameData;
    constructor(data: XrFrameEvent['data']) {
        super('xrFrame');
        this.data = data;
    }
}

/**
 * An event that is emitted when receiving a player count from the signalling server
 */
export class PlayerCountEvent extends Event {
    override readonly type: 'playerCount';
    readonly data: {
        /** count object */
        count: number;
    };
    constructor(data: PlayerCountEvent['data']) {
        super('playerCount');
        this.data = data;
    }
}

/**
 * An event that is emitted when the webRTC connections is relayed over TCP.
 */
export class WebRtcTCPRelayDetectedEvent extends Event {
    override readonly type: 'webRtcTCPRelayDetected';
    constructor() {
        super('webRtcTCPRelayDetected');
    }
}

export type PixelStreamingEvent =
    | AfkWarningActivateEvent
    | AfkWarningUpdateEvent
    | AfkWarningDeactivateEvent
    | AfkTimedOutEvent
    | VideoEncoderAvgQPEvent
    | WebRtcSdpEvent
    | WebRtcSdpOfferEvent
    | WebRtcSdpAnswerEvent
    | WebRtcAutoConnectEvent
    | WebRtcConnectingEvent
    | WebRtcConnectedEvent
    | WebRtcFailedEvent
    | WebRtcDisconnectedEvent
    | DataChannelOpenEvent
    | DataChannelCloseEvent
    | DataChannelErrorEvent
    | VideoInitializedEvent
    | ShowOnScreenKeyboardEvent
    | StreamLoadingEvent
    | StreamPreConnectEvent
    | StreamReconnectEvent
    | StreamPreDisconnectEvent
    | PlayStreamErrorEvent
    | PlayStreamEvent
    | PlayStreamRejectedEvent
    | LoadFreezeFrameEvent
    | HideFreezeFrameEvent
    | StatsReceivedEvent
    | StreamerListMessageEvent
    | StreamerIDChangedMessageEvent
    | LatencyCalculatedEvent
    | LatencyTestResultEvent
    | DataChannelLatencyTestResponseEvent
    | DataChannelLatencyTestResultEvent
    | SubscribeFailedEvent
    | InitialSettingsEvent
    | SettingsChangedEvent
    | XrSessionStartedEvent
    | XrSessionEndedEvent
    | XrFrameEvent
    | PlayerCountEvent
    | WebRtcTCPRelayDetectedEvent;

export class PixelStreamingEventEmitter extends EventTarget {
    /**
     * Dispatch a new event.
     * @param e event
     * @returns
     */
    public override dispatchEvent(e: PixelStreamingEvent): boolean {
        return super.dispatchEvent(e);
    }

    /**
     * Register an event handler.
     * @param type event name
     * @param listener event handler function
     */
    public override addEventListener<
        T extends PixelStreamingEvent['type'],
        E extends PixelStreamingEvent & { type: T }
    >(type: T, listener: (e: Event & E) => void) {
        super.addEventListener(type, listener);
    }

    /**
     * Remove an event handler.
     * @param type event name
     * @param listener event handler function
     */
    public override removeEventListener<
        T extends PixelStreamingEvent['type'],
        E extends PixelStreamingEvent & { type: T }
    >(type: T, listener: (e: Event & E) => void) {
        super.removeEventListener(type, listener);
    }
}
