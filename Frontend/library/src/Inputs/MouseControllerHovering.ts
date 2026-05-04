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

    // Buttons currently held down. While non-empty, mousemove/mouseup are
    // listened for on `window` rather than the video element so the press is
    // tracked even when the cursor leaves the element. UE pairs every
    // MouseDown with a later MouseUp; without this the engine can be left
    // with a stuck button when the user releases outside the video element.
    private pressedButtons = new Set<number>();

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
        // If a button was held when unregister was called, clean up the
        // window-level listeners too.
        if (this.pressedButtons.size > 0) {
            window.removeEventListener('mousemove', this.onMouseMoveListener);
            window.removeEventListener('mouseup', this.onMouseUpListener);
            this.pressedButtons.clear();
        }

        super.unregister();
    }

    private startCapturing() {
        // Move move/up listeners off the element and onto the window so they
        // keep firing while the cursor is outside the video.
        this.videoElementParent.removeEventListener('mousemove', this.onMouseMoveListener);
        this.videoElementParent.removeEventListener('mouseup', this.onMouseUpListener);
        window.addEventListener('mousemove', this.onMouseMoveListener);
        window.addEventListener('mouseup', this.onMouseUpListener);
    }

    private stopCapturing() {
        window.removeEventListener('mousemove', this.onMouseMoveListener);
        window.removeEventListener('mouseup', this.onMouseUpListener);
        this.videoElementParent.addEventListener('mousemove', this.onMouseMoveListener);
        this.videoElementParent.addEventListener('mouseup', this.onMouseUpListener);
    }

    /**
     * Compute (offsetX, offsetY) relative to the video element from a window-
     * level event whose `target` may be any other element on the page.
     */
    private offsetFromVideo(event: MouseEvent): { x: number; y: number } {
        if (event.currentTarget === this.videoElementParent) {
            return { x: event.offsetX, y: event.offsetY };
        }
        const rect = this.videoElementParent.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    private onMouseDown(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const off = this.offsetFromVideo(event);
        const coord = this.coordinateConverter.translateUnsigned(off.x, off.y);
        this.streamMessageController.toStreamerHandlers.get('MouseDown')([event.button, coord.x, coord.y]);
        event.preventDefault();

        if (this.pressedButtons.size === 0) {
            this.startCapturing();
        }
        this.pressedButtons.add(event.button);
    }

    private onMouseUp(event: MouseEvent) {
        if (!this.videoPlayer.isVideoReady()) {
            return;
        }
        const off = this.offsetFromVideo(event);
        const coord = this.coordinateConverter.translateUnsigned(off.x, off.y);
        this.streamMessageController.toStreamerHandlers.get('MouseUp')([event.button, coord.x, coord.y]);
        event.preventDefault();

        this.pressedButtons.delete(event.button);
        if (this.pressedButtons.size === 0) {
            this.stopCapturing();
        }
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
        const off = this.offsetFromVideo(event);
        const coord = this.coordinateConverter.translateUnsigned(off.x, off.y);
        const delta = this.coordinateConverter.translateSigned(event.movementX, event.movementY);
        this.streamMessageController.toStreamerHandlers.get('MouseMove')([
            coord.x,
            coord.y,
            delta.x,
            delta.y
        ]);
        // Only call preventDefault when the event originated on the video
        // element. On window-level events the target may be a page element
        // for which preventDefault would be wrong.
        if (event.currentTarget === this.videoElementParent) {
            event.preventDefault();
        }
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
