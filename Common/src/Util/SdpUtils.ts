// Copyright Epic Games, Inc. All Rights Reserved.

export class SDPUtils {
    static addVideoHeaderExtensionToSdp(sdp: string, uri: string): string {
        // Find the highest used header extension id by sorting the extension ids used,
        // eliminating duplicates and adding one.
        // Todo: Update this when WebRTC in Chrome supports the header extension API.
        const usedIds = sdp
            .split('\n')
            .filter((line) => line.startsWith('a=extmap:'))
            .map((line) => parseInt(line.split(' ')[0].substring(9), 10))
            .sort((a, b) => a - b)
            .filter((item, index, array) => array.indexOf(item) === index);
        const nextId = usedIds[usedIds.length - 1] + 1;
        const extmapLine = 'a=extmap:' + nextId + ' ' + uri + '\r\n';

        const sections = sdp.split('\nm=').map((part, index) => {
            return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
        });
        const sessionPart = sections.shift();
        // Only add extension to m=video media section
        return (
            sessionPart +
            sections
                .map((mediaSection) =>
                    mediaSection.startsWith('m=video') ? mediaSection + extmapLine : mediaSection
                )
                .join('')
        );
    }
}
