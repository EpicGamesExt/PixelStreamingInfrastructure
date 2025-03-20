// Copyright Epic Games, Inc. All Rights Reserved.
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { InputCoordTranslator } from '../Util/InputCoordTranslator';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import type { ActiveKeys } from './InputClassesFactory';
import { MouseController } from './MouseController';

/**
 * A mouse controller that allows the mouse to freely float over the video document.
 */
export class MouseControllerHovering extends MouseController {
    videoElementParent: HTMLDivElement;

    onMouseUpListener: (event: MouseEvent) => void;
    onMouseDownListener: (event: MouseEvent) => void;
    onMouseDblClickListener: (event: MouseEvent) => void;
    onMouseWheelListener: (event: WheelEvent) => void;
    onMouseMoveListener: (event: MouseEvent) => void;
    onContextMenuListener: (event: MouseEvent) => void;

    constructor(
        streamMessageController: StreamMessageController,
        videoPlayer: VideoPlayer,
        coordinateConverter: InputCoordTranslator,
        activeKeys: ActiveKeys
    ) {
        super(streamMessageController, videoPlayer, coordinateConverter, activeKeys);
        this.videoElementParent = videoPlayer.getVideoParentElement() as HTMLDivElement;
        this.onMouseUpListener = this.onMouseUp.bind(this);
        this.onMouseDownListener = this.onMouseDown.bind(this);
        this.onMouseDblClickListener = this.onMouseDblClick.bind(this);
        this.onMouseWheelListener = this.onMouseWheel.bind(this);
        this.onMouseMoveListener = this.onMouseMove.bind(this);
        this.onContextMenuListener = this.onContextMenu.bind(this);
    }

    override register(): void {
        super.register();

        this.videoElementParent.addEventListener('mousemove', this.onMouseMoveListener);
        this.videoElementParent.addEventListener('mousedown', this.onMouseDownListener);
        this.videoElementParent.addEventListener('mouseup', this.onMouseUpListener);
        this.videoElementParent.addEventListener('contextmenu', this.onContextMenuListener);
        this.videoElementParent.addEventListener('wheel', this.onMouseWheelListener);
        this.videoElementParent.addEventListener('dblclick', this.onMouseDblClickListener);
    }

    override unregister(): void {
        this.videoElementParent.removeEventListener('mousemove', this.onMouseMoveListener);
        this.videoElementParent.removeEventListener('mousedown', this.onMouseDownListener);
        this.videoElementParent.removeEventListener('mouseup', this.onMouseUpListener);
        this.videoElementParent.removeEventListener('contextmenu', this.onContextMenuListener);
        this.videoElementParent.removeEventListener('wheel', this.onMouseWheelListener);
        this.videoElementParent.removeEventListener('dblclick', this.onMouseDblClickListener);

        super.unregister();
    }

    private onMouseDown(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const coord = this.coordinateConverter.translateUnsigned(event.offsetX, event.offsetY);
        this.streamMessageController.toStreamerHandlers.get('MouseDown')([event.button, coord.x, coord.y]);
        event.preventDefault();
    }

    private onMouseUp(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const coord = this.coordinateConverter.translateUnsigned(event.offsetX, event.offsetY);
        this.streamMessageController.toStreamerHandlers.get('MouseUp')([event.button, coord.x, coord.y]);
        event.preventDefault();
    }

    private onContextMenu(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        event.preventDefault();
    }

    private onMouseMove(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const coord = this.coordinateConverter.translateUnsigned(event.offsetX, event.offsetY);
        const delta = this.coordinateConverter.translateSigned(event.movementX, event.movementY);
        this.streamMessageController.toStreamerHandlers.get('MouseMove')([
            coord.x,
            coord.y,
            delta.x,
            delta.y
        ]);
        event.preventDefault();
    }

    private onMouseWheel(event: WheelEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const coord = this.coordinateConverter.translateUnsigned(event.offsetX, event.offsetY);
        this.streamMessageController.toStreamerHandlers.get('MouseWheel')([
            event.wheelDelta,
            coord.x,
            coord.y
        ]);
        event.preventDefault();
    }

    private onMouseDblClick(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const coord = this.coordinateConverter.translateUnsigned(event.offsetX, event.offsetY);
        this.streamMessageController.toStreamerHandlers.get('MouseDouble')([event.button, coord.x, coord.y]);
    }
}
