## Software rendering UE streamer

### Prepare the project

You will need to build and package the project targeting SM5. Package it to this directory to make it easy.

### Build the image using docker

Run `./build.sh <image tag> <directory where UE is packaged>`
Supply the tag you want to tag the image as and the location of the packaged project.
Note that docker will use the current directory as the root so if its packaged in `./Packaged/Linux` you will want to supply `/Packaged/Linux` as the path.
Also note that the entrypoint refers to `./Minimal.sh` to start the project. So your project should be named Minimal or update the Dockerfile.

