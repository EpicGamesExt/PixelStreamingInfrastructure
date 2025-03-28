import { readFileSync, writeFileSync } from 'fs';
import { remark } from 'remark';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import { Root, RootContent } from 'mdast';
import { getLogEntries, getRemoteUrl } from './git_calls.js';

export function deserializeMarkdown(path: string) {
    const template = readFileSync(path);
    return remark().use(parse).parse(template);
}

export function serializeMarkdown(logfilePath: string, tree: Root) {
    const modifiedMarkdown = stringifyChanges(tree);
    writeFileSync(logfilePath, modifiedMarkdown);
}

export function stringifyChanges(tree: Root) {
    return remark().use(stringify, { bullet: '-' }).stringify(tree);
}

export function stripAllRanges(root: Root) {
    root.children = root.children.slice(
        0,
        root.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1
    );
}

export function insertNewRange(root: Root, newNodes: RootContent[]) {
    root.children.splice(
        root.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1,
        0,
        ...newNodes
    );
    return root;
}

export function buildRangeMarkdown(
    packagePath: string,
    startCommit: string,
    endCommit: string,
    rangeLabel: string
) {
    const repoUrl = getRemoteUrl('origin');
    const logEntries = getLogEntries(startCommit, endCommit, packagePath);
    const markdownNodes: RootContent[] = [
        {
            type: 'heading',
            depth: 2,
            children: [
                {
                    type: 'link',
                    url: `${repoUrl}/releases/tag/${endCommit}`,
                    children: [{ type: 'text', value: `${rangeLabel}` }]
                }
            ]
        },
        {
            type: 'list',
            ordered: false,
            spread: false,
            children: logEntries.map((comment) => {
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

    return markdownNodes;
}

