import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { remark } from 'remark';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import minimist from 'minimist';
import { RootContent } from 'mdast';

const args = minimist(process.argv.slice(2));

let currentTag: string;
let previousTag: string;
let versionLabel: string;

if (args._.length == 3) {
    const tagPrefix = args._[2];

    // get current tag
    currentTag = execSync(`git describe --tags --abbrev=0 --match "${tagPrefix}*"`, {
        encoding: 'utf-8'
    }).trim();

    // get previous tag
    previousTag = execSync(`git describe --tags --abbrev=0 --match "${tagPrefix}*" ${currentTag}^`, {
        encoding: 'utf-8'
    }).trim();

    versionLabel = currentTag.slice(tagPrefix.length);
} else if (args._.length == 5) {
    versionLabel = args._[2];
    currentTag = args._[4];
    previousTag = args._[3];

} else {
    console.log(`usage: changeloggenerator <log_path> <package_path> <tag_prefix>`);
    console.log(`    or changeloggenerator <log_path> <package_path> <version_label> <previous_tag_or_commit> <new_tag_or_commit>`);
    process.exit(1);
}

const templatePath = args._[0];
const packagePath = args._[1];

// get log entries
const logEntries = execSync(
    `git log ${previousTag}..${currentTag} --oneline --pretty=format:%s ${packagePath}`,
    { encoding: 'utf-8' }
);

// build the new changelog entry
const newNodes: RootContent[] = [
    {
        type: 'heading',
        depth: 2,
        children: [{ type: 'text', value: `${versionLabel}` }]
    },
    {
        type: 'list',
        ordered: false,
        spread: false,
        children: logEntries.split('\n').map((comment) => {
            return {
                type: 'listItem',
                spread: false,
                children: [
                    {
                        type: 'paragraph',
                        children: [{ type: 'text', value: comment }]
                    }
                ]
            };
        })
    }
];

const template = readFileSync(templatePath);
const tree = remark().use(parse).parse(template);

tree.children.splice(
    tree.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1,
    0,
    ...newNodes
);

const modifiedMarkdown = remark().use(stringify, { bullet: '-' }).stringify(tree);
writeFileSync(templatePath, modifiedMarkdown);
// console.log(modifiedMarkdown);
