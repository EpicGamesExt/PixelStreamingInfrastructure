import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { remark } from 'remark';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import { RootContent } from 'mdast';

function getUrl() {
    const gitRemote = execSync(`git remote get-url origin`, { encoding: 'utf-8' }).trim();
    return gitRemote.replace(/^git@([^:]+):(.+)\.git$/, 'https://$1/$2');
}

export function clearChanges(_logfilePath: string) {
    const template = readFileSync(_logfilePath);
    const tree = remark().use(parse).parse(template);

    tree.children = tree.children.slice(
        0,
        tree.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1
    );

    const modifiedMarkdown = remark().use(stringify, { bullet: '-' }).stringify(tree);
    writeFileSync(_logfilePath, modifiedMarkdown);
}

export function addVersionChanges(
    logfilePath: string,
    packagePath: string,
    previousTag: string,
    currentTag: string,
    versionLabel: string
) {
    const repoUrl = getUrl();

    // get log entries
    const logEntries = execSync(`git log ${previousTag}..${currentTag} --oneline ${packagePath}`, {
        encoding: 'utf-8'
    });

    // build the new changelog entry
    const newNodes: RootContent[] = [
        {
            type: 'heading',
            depth: 2,
            children: [
                {
                    type: 'link',
                    url: `${repoUrl}/releases/tag/${currentTag}`,
                    children: [{ type: 'text', value: `${versionLabel}` }]
                }
            ]
        },
        {
            type: 'list',
            ordered: false,
            spread: false,
            children: logEntries
                .trim()
                .split('\n')
                .map((comment) => {
                    const matches = comment.match(/([0-9a-z]+) (.*)$/);
                    if (matches) {
                        const commitHash = matches[1];
                        const commitMessage = matches[2];
                        return {
                            type: 'listItem',
                            spread: false,
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'link',
                                            url: `${repoUrl}/commit/${commitHash}`,
                                            children: [{ type: 'text', value: commitHash }]
                                        },
                                        { type: 'text', value: ` ${commitMessage}` }
                                    ]
                                }
                            ]
                        };
                    } else {
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
                    }
                })
        }
    ];

    const template = readFileSync(logfilePath);
    const tree = remark().use(parse).parse(template);

    tree.children.splice(
        tree.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1,
        0,
        ...newNodes
    );

    const modifiedMarkdown = remark().use(stringify, { bullet: '-' }).stringify(tree);
    writeFileSync(logfilePath, modifiedMarkdown);
}
