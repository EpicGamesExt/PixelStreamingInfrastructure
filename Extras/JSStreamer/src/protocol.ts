export const DataProtocol = {
    ToStreamer: {
        IFrameRequest: {
            id: 0,
            structure: []
        },
        RequestQualityControl: {
            id: 1,
            structure: []
        },
        FpsRequest: {
            id: 2,
            structure: []
        },
        AverageBitrateRequest: {
            id: 3,
            structure: []
        },
        StartStreaming: {
            id: 4,
            structure: []
        },
        StopStreaming: {
            id: 5,
            structure: []
        },
        LatencyTest: {
            id: 6,
            structure: [{ name: 'extra', type: 'string' }]
        },
        RequestInitialSettings: {
            id: 7,
            structure: []
        },
        TestEcho: {
            id: 8,
            structure: [{ name: 'value', type: 'string' }]
        },
        UIInteraction: {
            id: 50,
            structure: []
        },
        Command: {
            id: 51,
            structure: [{ name: 'command', type: 'string' }]
        },
        TextboxEntry: {
            id: 52,
            structure: [{ name: 'text', type: 'string' }]
        },
        KeyDown: {
            id: 60,
            structure: [
                { name: 'keyCode', type: 'uint8' },
                { name: 'isRepeat', type: 'uint8' }
            ]
        },
        KeyUp: {
            id: 61,
            structure: [{ name: 'keyCode', type: 'uint8' }]
        },
        KeyPress: {
            id: 62,
            structure: [{ name: 'keyCode', type: 'uint16' }]
        },
        MouseEnter: {
            id: 70,
            structure: []
        },
        MouseLeave: {
            id: 71,
            structure: []
        },
        MouseDown: {
            id: 72,
            structure: [
                { name: 'button', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' }
            ]
        },
        MouseUp: {
            id: 73,
            structure: [
                { name: 'button', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' }
            ]
        },
        MouseMove: {
            id: 74,
            structure: [
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' },
                { name: 'deltaX', type: 'int16' },
                { name: 'deltaY', type: 'int16' }
            ]
        },
        MouseWheel: {
            id: 75,
            structure: [
                { name: 'delta', type: 'int16' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' }
            ]
        },
        MouseDouble: {
            id: 76,
            structure: [
                { name: 'button', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' }
            ]
        },
        TouchStart: {
            id: 80,
            structure: [
                { name: 'numTouches', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' },
                { name: 'idx', type: 'uint8' },
                { name: 'force', type: 'uint8' },
                { name: 'valid', type: 'uint8' }
            ]
        },
        TouchEnd: {
            id: 81,
            structure: [
                { name: 'numTouches', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' },
                { name: 'idx', type: 'uint8' },
                { name: 'force', type: 'uint8' },
                { name: 'valid', type: 'uint8' }
            ]
        },
        TouchMove: {
            id: 82,
            structure: [
                { name: 'numTouches', type: 'uint8' },
                { name: 'x', type: 'uint16' },
                { name: 'y', type: 'uint16' },
                { name: 'idx', type: 'uint8' },
                { name: 'force', type: 'uint8' },
                { name: 'valid', type: 'uint8' }
            ]
        },
        GamepadButtonPressed: {
            id: 90,
            structure: [
                { name: 'controllerId', type: 'uint8' },
                { name: 'button', type: 'uint8' },
                { name: 'isRepeat', type: 'uint8' }
            ]
        },
        GamepadButtonReleased: {
            id: 91,
            structure: [
                { name: 'controllerId', type: 'uint8' },
                { name: 'button', type: 'uint8' },
                { name: 'isRepeat', type: 'uint8' }
            ]
        },
        GamepadAnalog: {
            id: 92,
            structure: [
                { name: 'controllerId', type: 'uint8' },
                { name: 'button', type: 'uint8' },
                { name: 'analogValue', type: 'double' }
            ]
        },
        GamepadConnected: {
            id: 93,
            structure: []
        },
        GamepadDisconnected: {
            id: 94,
            structure: [{ name: 'controllerId', type: 'uint8' }]
        }
    },
    FromStreamer: {
        QualityControlOwnership: { id: 0, structure: [] },
        Response: { id: 1, structure: [] },
        Command: { id: 2, structure: [] },
        FreezeFrame: { id: 3, structure: [] },
        UnfreezeFrame: { id: 4, structure: [] },
        VideoEncoderAvgQP: { id: 5, structure: [{ name: 'value', type: 'only_string' }] },
        LatencyTest: { id: 6, structure: [] },
        InitialSettings: { id: 7, structure: [{ name: 'value', type: 'only_string' }] },
        FileExtension: { id: 8, structure: [] },
        FileMimeType: { id: 9, structure: [] },
        FileContents: { id: 10, structure: [] },
        TestEcho: { id: 11, structure: [] },
        InputControlOwnership: { id: 12, structure: [] },
        GamepadResponse: { id: 13, structure: [] },
        Protocol: { id: 255, structure: [{ name: 'value', type: 'only_string' }] }
    }
};
