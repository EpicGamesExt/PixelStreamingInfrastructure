---
'@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.6': minor
'@epicgames-ps/lib-pixelstreamingfrontend-ue5.6': minor
---

Changes for regression/latency testing.

## Latency Session Test and dump to csv

Added a new feature to run a variable length latency test session (e.g. a 60s window)
and dump that stats from the session to two .csv files:

1. latency.csv - Which contains the video timing stats
2. stats.csv - Which contains all WebRTC stats the library currently tracks

To enable the latency session test use the flag/url parameter ?LatencyCSV
to enable this feature (by default it is disabled and not UI-configurable).

To use this latency session test feature:

1. Navigate to http://localhost/?LatencyCSV
2. Open the stats panel and click the "Run Test" button under the "Session Test" heading.

## 4.27 support restored

Re-shipped UE 4.27 support by restoring the ?BrowserSendOffer flag.
It was found useful to support running this latency session test against UE 4.27
for internal historical testing so support for connecting to this version has been restored.

To connect to a 4.27 project:

1. Navigate to http://localhost/?BrowserSendOffer
2. Connect (warning: this option is not compatible with all newer UE versions)
