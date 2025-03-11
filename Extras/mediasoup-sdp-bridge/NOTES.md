# Important note for developers.
Please do not reformat. This package is to stay as close to the original content as possible so that not only
are changes very obvious but any new merges from the original repo can be handled easily. Reformatting this
code might cause headaches for merges in the future.

## Merging upstream changes
If there is a change upstream that we wish to merge in we can achieve that by the following.
```
git subtree pull --prefix Extras/mediasoup-sdp-bridge https://github.com/OpenVidu/mediasoup-sdp-bridge.git v3
```
This will pull changes from the v3 branch into this subtree.


