# Cutting releases

There are multiple things in this repository that can be released:

- The NPM packages listed in the workspace package.json file.
- Several container images like the SignallingWebServer or SFU
- The entire repo and built frontend as a Github release .zip/tar.gz archive

## NPM packages

These releases are mostly handled by the changesets tooling.  

If there is an existing Update CHANGELOG PR for the release branch you are targeting.

1. Merging this PR into the release branch will consume change sets, update versions and changelogs.
2. When a package.json file is pushed the [publish action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/changesets-publish-npm-packages.yml) will start scanning packages in the repo.
3. If a public package is found to have a greater version number than what is published, the new version will be published.
4. A tag for the release will be made and a Github release with archives will be created.

If there is no PR for the release then no changesets have been added. If you still need to publish packages.
1. Make changes to the package.json files of the packages you require publishing.
2. Make sure the version numbers are increases appropriately.
3. Push these changes to the release branch.
4. This will kick off the [publish action](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/actions/workflows/changesets-publish-npm-packages.yml) and publish as described in the previous steps.

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

1. NPM packages
2. `/SignallingWebServer`
3. `RELEASE_VERSION` file

## Github Actions is failing because of unpublished libraries
You may get into a situation where a PR is failing Github Actions checks due to unpublished libraries, if you are certain everything is working and
up to date except that the libraries have not been published you can add this magic string to your commit `#bypass-publish-check` that will skip the check
of building everything using published libraries. Once the PR is landed, this check will run again and you can bump the library versions in a separate PR/commit.
