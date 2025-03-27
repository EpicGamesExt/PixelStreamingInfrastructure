import { execSync } from 'child_process';
import minimist from 'minimist';
import { clearChanges, getLatestChanges, mergeChanges, stringifyChanges, writeToFile } from './functions.js';

const args = minimist(process.argv.slice(2));

const logPath = args['log'];
const packagePath = args['package_path'];
const currentTag = args['current'];
const previousTag = args['previous'];
const versionLabel = args['label'];
const tagPrefix = args['prefix'];
const init = args['init'];
const single = args['single'];

if (init && logPath && packagePath && tagPrefix) {
    // generates the changelog from all the tags matching prefix.

    clearChanges(logPath);

    const tags = execSync(`git tag -l ${tagPrefix}* | grep -E '^${tagPrefix}[^-]+-[^-]+$'`, {
        encoding: 'utf-8'
    })
        .trim()
        .split('\n');
    for (let i = 1; i < tags.length; ++i) {
        const versionLabel = tags[i].slice(tagPrefix.length);
        const changes = getLatestChanges(logPath, packagePath, tags[i - 1], tags[i], versionLabel);
        const merged = mergeChanges(logPath, changes);
        writeToFile(logPath, merged);
    }
} else if (tagPrefix && packagePath) {
    // gets the latest changes by getting the last tag matching the prefix and comparing it with the last

    // get all matching tags in order
    const tags = execSync(
        `git tag -l ${tagPrefix}* | grep -E '^${tagPrefix}[^-]+-[^-]+$' | sort -Vr`,
        {
            encoding: 'utf-8'
        }
    ).trim();

    // get current tag
    const currentTag = tags[0];

    // get previous tag
    const previousTag = tags[1];

    const versionLabel = currentTag.slice(tagPrefix.length);
    const changes = getLatestChanges(logPath, packagePath, previousTag, currentTag, versionLabel);
    if (!single) {
        const merged = mergeChanges(logPath, changes);
        writeToFile(logPath, merged);
    } else {
        console.log(stringifyChanges({ type: 'root', children: changes }));
    }
} else if (packagePath && previousTag && currentTag && versionLabel) {
    // generates the change list from all the given tags

    const changes = getLatestChanges(logPath, packagePath, previousTag, currentTag, versionLabel);
    if (!single) {
        const merged = mergeChanges(logPath, changes);
        writeToFile(logPath, merged);
    } else {
        console.log(stringifyChanges({ type: 'root', children: changes }));
    }
} else {
    console.log(
        `usage: changeloggenerator --log=<path> --package_path=<path> [--single] [--prefix=<tag_prefix> [--init]] [--current=<current_tag> --previous=<previous_tag> --label=<version_label>]`
    );
}
