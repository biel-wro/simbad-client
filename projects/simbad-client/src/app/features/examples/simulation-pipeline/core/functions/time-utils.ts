export function timeToTimeString(startTimestamp: string, endTimestamp?: string) {
    const now = Date.now();
    const start = Date.parse(startTimestamp);
    const diff = endTimestamp ? Date.parse(endTimestamp) - start : now - start;
    return new Date(diff).toISOString().substr(11, 8);
}
