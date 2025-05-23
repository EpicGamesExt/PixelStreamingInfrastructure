# Use the current Long Term Support (LTS) version of Node.js
FROM node:lts
# Copy the signalling server and frontend source code from the build context
WORKDIR /SignallingWebServer
COPY NODE_VERSION ./NODE_VERSION
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY /Common ./Common
COPY /Signalling ./Signalling
COPY /SignallingWebServer ./SignallingWebServer
COPY /Frontend ./Frontend
# Install the dependencies for the signalling server and build the frontend
RUN apt-get update
RUN SignallingWebServer/platform_scripts/bash/setup.sh --build

# Expose TCP ports 80 and 443 for player WebSocket connections and web server HTTP(S) access
EXPOSE 80
EXPOSE 443

# Expose TCP port 8888 for streamer WebSocket connections
EXPOSE 8888
EXPOSE 8888/udp

# Expose TCP port 8889 for connections from the SFU
EXPOSE 8889

# Expose TCP port 19302 for connections to Google's stun server
EXPOSE 19302

# Expose TCP port 19302 for connections from coturn
EXPOSE 3478
EXPOSE 3479

# Set the signalling server as the container's entrypoint
ENTRYPOINT ["bash", "SignallingWebServer/platform_scripts/bash/start.sh", "--nosudo"]
