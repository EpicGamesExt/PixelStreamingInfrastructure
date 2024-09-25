# build the mesa image as a builder
FROM ubuntu:22.04 AS builder
ARG MESA_VERSION

# Disable interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install our common prerequisites
RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache
RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
	apt-get update && \
	apt-get install -y --no-install-recommends \
		ca-certificates \
		curl \
		git \
		gnupg2 \
		python3 \
		python3-pip \
		software-properties-common

# Add the GPG key for the LLVM apt repository
RUN curl -fSL 'https://apt.llvm.org/llvm-snapshot.gpg.key' -o /etc/apt/trusted.gpg.d/apt.llvm.org.asc

# Clone the Mesa source code
RUN git clone --progress --depth=1 -b "mesa-$MESA_VERSION" https://gitlab.freedesktop.org/mesa/mesa.git /tmp/mesa

# Extract the list of packages from Mesa's dependency installation script and install them
COPY ./extract-and-install-deps.py /tmp/extract-and-install-deps.py
RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
	python3 /tmp/extract-and-install-deps.py '/tmp/mesa/.gitlab-ci/container/debian/x86_64_build-base.sh'

# Build Mesa
ARG MESA_BUILD_ARGS="-Dplatforms=x11,wayland -Degl=disabled -Dgallium-drivers=swrast -Dgbm=disabled -Dgles1=disabled -Dgles2=disabled -Dglx=disabled -Dopengl=false -Dshared-llvm=disabled -Dvulkan-drivers=swrast -Dxlib-lease=disabled"
RUN mkdir /tmp/mesa/build
WORKDIR /tmp/mesa/build
RUN meson .. --prefix=/opt/mesa $MESA_BUILD_ARGS
RUN ninja install

# Update the path in the ICD JSON file to match the location where we will copy the Lavapipe library
RUN sed -i 's|/opt/mesa/lib|/usr/lib|' /opt/mesa/share/vulkan/icd.d/lvp_icd.x86_64.json

# Copy Lavapipe into a plain Ubuntu 22.04 image
FROM ubuntu:22.04
COPY --from=builder /opt/mesa/lib/x86_64-linux-gnu/libvulkan_lvp.so /usr/lib/x86_64-linux-gnu/libvulkan_lvp.so
COPY --from=builder /opt/mesa/share/vulkan/icd.d/lvp_icd.x86_64.json /etc/vulkan/icd.d/lvp_icd.x86_64.json

# Disable interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install Lavapipe's runtime dependecies
RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache
RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
	apt-get update && \
	apt-get install -y --no-install-recommends \
		libbsd0 \
		libdrm2 \
		libexpat1 \
		libffi8 \
		liblzma5 \
		libmd0 \
		libtinfo6 \
		libudev1 \
		libunwind8 \
		libvulkan1 \
		libwayland-client0 \
		libx11-xcb1 \
		libxau6 \
		libxcb1 \
		libxcb-dri3-0 \
		libxcb-present0 \
		libxcb-randr0 \
		libxcb-shm0 \
		libxcb-sync1 \
		libxcb-xfixes0 \
		libxdmcp6 \
		libxshmfence1 \
		zlib1g

# Install `vkcube` for testing purposes
RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt \
	apt-get update && apt-get install -y --no-install-recommends vulkan-tools

# Create a non-root user
RUN useradd --create-home --home /home/nonroot --shell /bin/bash --uid 1000 nonroot && \
	usermod -a -G audio,video nonroot
USER nonroot

# copy the UE project into the lavapipe image
ARG PROJECT_PATH=.
COPY $PROJECT_PATH /ue-project/
WORKDIR /ue-project/

ENTRYPOINT ["./Minimal.sh", "-AllowCPUDevices", "-RenderOffscreen", "-Windowed", "-ResX=1920", "-RexY=720", "-ForceRes"]

