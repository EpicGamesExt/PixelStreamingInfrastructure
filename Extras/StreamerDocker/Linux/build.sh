#!/bin/bash
docker buildx build --progress=plain -t $1 --build-arg "MESA_VERSION=24.1.5" --build-arg "PROJECT_PATH=$2" .

