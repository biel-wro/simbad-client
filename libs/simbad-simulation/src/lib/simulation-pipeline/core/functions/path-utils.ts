export function extractFilename(path: string) {
    return path.split('/').slice(-1)[0];
}
