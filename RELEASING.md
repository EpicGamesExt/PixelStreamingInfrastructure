# Cutting releases

There are multiple things in this repository that can be released:

- The signalling server container image
- The `/library` NPM package
- The `/ui-library` NPM package
- The entire repo and built frontend as a Github release .zip/tar.gz archive

## The `/Common` NPM package
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes into `/Common` directory
3. Based on the changes made, bump the version number according to [semver](https://semver.org/) in the [`package.json`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Common/package.json#L3) file
4. Commit the changes to the `package.json` file.
5. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-common-library-to-npm.yml) for a build+push to NPM.

## The `/Signalling` NPM package
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes into `/Signalling` directory
3. Based on the changes made, bump the version number according to [semver](https://semver.org/) in the [`package.json`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Signalling/package.json) file
4. **Optional: Update the version of the common library in the package.json if it got bumped.
5. Commit the changes to `package.json` and potentially the `package-lock.json` file.
6. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-signalling-library-to-npm.yml) for a build+push to NPM.

## The `/library` NPM package
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes into `/library` directory
3. Based on the changes made, bump the version number according to [semver](https://semver.org/) in the [`package.json`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/library/package.json) file
4. Commit the changes to the `package.json` file.
5. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-library-to-npm.yml) for a build+push to NPM.

## The `ui-library` NPM package
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes into `/ui-library` directory
3. Based on the changes made, bump the version number according to [semver](https://semver.org/) in the [`package.json`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/ui-library/package.json#L3) file
4. **Optional: Update the version of the common library in the package.json if it got bumped ([here](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/ui-library/package.json#L19)).**
5. **Optional: Update the version of the frontent library in the package.json if it got bumped ([here](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/ui-library/package.json#L20) & [here](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/Frontend/ui-library/package.json#L38)).**
6. Commit the changes to `package.json` and potentially the `package-lock.json` file.
7. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/publish-ui-library-to-npm.yml) for a build+push to NPM.

## Signalling Server Container
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes into `/SignallingWebServer` directory
3. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/container-images.yml) for a build+push of the signalling server container image.

## The Github releases archives
1. Switch to the target branch (e.g 5.5)
2. Make/merge any changes anywhere in the repo.
3. Based on the changes made, bump the version number according to [semver](https://semver.org/) in the [`RELEASE_VERSION`](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/master/RELEASE_VERSION) file.
4. Commit the changes to `RELEASE_VERSION` file.
6. This will automatically kick off a [this action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/create-gh-release.yml) for tagged Github release with .zip and .tar.gz archives.

## Handling multiple changes
If multiple changes have been made, the order of releases should usually be like so:

1. `/Common`
2. `/Signalling`
3. `/library`
4. `/ui-library`
5. `/SignallingWebServer`
6. `RELEASE_VERSION` file
