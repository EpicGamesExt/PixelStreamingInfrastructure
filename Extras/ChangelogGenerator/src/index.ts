import { execSync } from 'child_process';
import minimist from 'minimist';
import { addVersionChanges, clearChanges } from './functions.js';

const args = minimist(process.argv.slice(2));

const logPath = args['log'];
const packagePath = args['package_path'];
const currentTag = args['current'];
const previousTag = args['previous'];
const versionLabel = args['label'];
const tagPrefix = args['prefix'];
const init = args['init'];

if (init && logPath && packagePath && tagPrefix) {
    // generates the changelog from all the tags matching prefix.

    clearChanges(logPath);

    const tags = execSync(`git tag -l ${tagPrefix}*`, { encoding: 'utf-8' }).trim().split('\n');
    for (let i = 1; i < tags.length; ++i) {
        const versionLabel = tags[i].slice(tagPrefix.length);
        addVersionChanges(logPath, packagePath, tags[i - 1], tags[i], versionLabel);
    }
} else if (tagPrefix && logPath && packagePath) {
    // gets the latest changes by getting the last tag matching the prefix and comparing it with the last

    // get current tag
    const currentTag = execSync(`git describe --tags --abbrev=0 --match "${tagPrefix}*"`, {
        encoding: 'utf-8'
    }).trim();

    // get previous tag
    const previousTag = execSync(`git describe --tags --abbrev=0 --match "${tagPrefix}*" ${currentTag}^`, {
        encoding: 'utf-8'
    }).trim();

    const versionLabel = currentTag.slice(tagPrefix.length);
    addVersionChanges(logPath, packagePath, previousTag, currentTag, versionLabel);
} else if (logPath && packagePath && previousTag && currentTag && versionLabel) {
    // generates the change list from all the given tags

    addVersionChanges(logPath, packagePath, previousTag, currentTag, versionLabel);
} else {
    console.log(
        `usage: changeloggenerator --log=<path> --package_path=<path> [--prefix=<tag_prefix> [--init]] [--current=<current_tag> --previous=<previous_tag> --label=<version_label>]`
    );
}
