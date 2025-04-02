FROM node:20-bookworm

## Note: This dockerfile is expected to be called from the root of this repo
## Maybe something like: docker build -t epicgames/jsstreamer:latest -f ./Extras/JSStreamer/Dockerfile .

WORKDIR /streamer
COPY /Common ./Common
COPY /Extras/JSStreamer ./Extras/JSStreamer
COPY ./package.json ./package.json
COPY NODE_VERSION ./NODE_VERSION

# Initiate NPM workspaces so we can install deps like our common lib using local built packages as opposed to remove published packages
RUN npm install

# Install and build common
RUN cd ./Common && npm install && npm run build

# Install and build JSStream using the common lib we just build
RUN cd ./Extras/JSStreamer && npm install && npm run build

# Run JSStreamer
CMD cd ./Extras/JSStreamer && npm run develop

