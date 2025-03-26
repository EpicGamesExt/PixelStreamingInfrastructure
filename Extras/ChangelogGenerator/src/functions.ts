import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { remark } from 'remark';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import { RootContent } from 'mdast';

export function clearChanges(_logfilePath: string) {
    const template = readFileSync(_logfilePath);
    const tree = remark().use(parse).parse(template);

    tree.children = tree.children.slice(0,
        tree.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1,
    );

    const modifiedMarkdown = remark().use(stringify, { bullet: '-' }).stringify(tree);
    writeFileSync(_logfilePath, modifiedMarkdown);
}

export function addVersionChanges(
    _logfilePath: string,
    _packagePath: string,
    _previousTag: string,
    _currentTag: string,
    _versionLabel: string
) {
    // get log entries
    const logEntries = execSync(
        `git log ${_previousTag}..${_currentTag} --oneline --pretty=format:%s ${_packagePath}`,
        { encoding: 'utf-8' }
    );

    // build the new changelog entry
    const newNodes: RootContent[] = [
        {
            type: 'heading',
            depth: 2,
            children: [{ type: 'text', value: `${_versionLabel}` }]
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

    const template = readFileSync(_logfilePath);
    const tree = remark().use(parse).parse(template);

    tree.children.splice(
        tree.children.findIndex((node) => node.type === 'html' && node.value.includes('<!-- BEGIN -->')) + 1,
        0,
        ...newNodes
    );

    const modifiedMarkdown = remark().use(stringify, { bullet: '-' }).stringify(tree);
    writeFileSync(_logfilePath, modifiedMarkdown);
}
