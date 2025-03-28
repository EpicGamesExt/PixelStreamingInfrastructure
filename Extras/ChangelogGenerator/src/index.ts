import minimist from 'minimist';
import {
    buildRangeMarkdown,
    insertNewRange,
    stringifyChanges,
    serializeMarkdown,
    deserializeMarkdown,
    stripAllRanges
} from './functions.js';
import { getAllTags } from './git_calls.js';

const args = minimist(process.argv.slice(2));

const logPath: string = args['log'];
const packagePath: string = args['package_path'];
const currentTag: string = args['current'];
const previousTag: string = args['previous'];
const versionLabel: string = args['label'];
const tagPrefix: string = args['prefix'];
const init: boolean = args['init'];
const single: boolean = args['single'];

if (init && logPath && packagePath && tagPrefix) {
    // generates the changelog from all the tags matching prefix.

    const markdown = deserializeMarkdown(logPath);
    stripAllRanges(markdown);
    const tags = getAllTags(tagPrefix, false); // oldest versions first because we insert at the top one by one
    for (let i = 1; i < tags.length; ++i) {
        const versionLabel = tags[i].slice(tagPrefix.length);
        const rangeMarkdown = buildRangeMarkdown(packagePath, tags[i - 1], tags[i], versionLabel);
        insertNewRange(markdown, rangeMarkdown);
    }
    serializeMarkdown(logPath, markdown);
} else if (tagPrefix && packagePath) {
    // gets the latest changes by getting the last tag matching the prefix and comparing it with the last

    // get all matching tags in order
    const tags = getAllTags(tagPrefix, true);

    // get current tag
    const currentTag = tags[0];

    // get previous tag
    const previousTag = tags[1];

    const versionLabel = currentTag.slice(tagPrefix.length);
    const rangeMarkdown = buildRangeMarkdown(packagePath, previousTag, currentTag, versionLabel);
    if (!single) {
        const markdown = deserializeMarkdown(logPath);
        insertNewRange(markdown, rangeMarkdown);
        serializeMarkdown(logPath, markdown);
    } else {
        console.log(stringifyChanges({ type: 'root', children: rangeMarkdown }));
    }
} else if (packagePath && previousTag && currentTag && versionLabel) {
    // generates the change list from all the given tags

    const rangeMarkdown = buildRangeMarkdown(packagePath, previousTag, currentTag, versionLabel);
    if (!single) {
        const markdown = deserializeMarkdown(logPath);
        insertNewRange(markdown, rangeMarkdown);
        serializeMarkdown(logPath, markdown);
    } else {
        console.log(stringifyChanges({ type: 'root', children: rangeMarkdown }));
    }
} else {
    console.log(
        `usage: changeloggenerator --log=<path> --package_path=<path> [--single] [--prefix=<tag_prefix> [--init]] [--current=<current_tag> --previous=<previous_tag> --label=<version_label>]`
    );
}
