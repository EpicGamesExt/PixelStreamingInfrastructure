import { execSync } from 'child_process';

export function getRemoteUrl(remoteName: string) {
    const cmd = `git remote get-url ${remoteName}`;
    let gitRemote: string;

    try {
        gitRemote = execSync(cmd, { encoding: 'utf-8' }).trim();
    } catch (e) {
        console.error(`Failed to get remote url for ${remoteName}: `, e);
        return '';
    }

    if (gitRemote.startsWith('https://')) {
        return gitRemote.replace(/(.+)\.git$/, '$1');
    }
    return gitRemote.replace(/^git@([^:]+):(.+)\.git$/, 'https://$1/$2');
}

export function getLogEntries(previousTag: string, currentTag: string, packagePath: string): string[] {
    const cmd = `git log ${previousTag}..${currentTag} --oneline ${packagePath}`;
    try {
        return execSync(cmd, { encoding: 'utf-8' }).trim().split('\n');
    } catch (e) {
        console.error(`Failed to get log entries for ${previousTag}..${currentTag}: `, e);
        return [];
    }
}

export function getAllTags(tagPrefix: string, reversed: boolean) {
    const sorter = reversed ? 'sort -Vr' : 'sort -V';
    const cmd = `git tag -l ${tagPrefix}* | grep -E '^${tagPrefix}[^-]+-[^-]+$' | ${sorter}`;
    try {
        return execSync(cmd, { encoding: 'utf-8' }).trim().split('\n');
    } catch (e) {
        console.error(`Failed to get all tags matching ${tagPrefix}: `, e);
        return [];
    }
}
