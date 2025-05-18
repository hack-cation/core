

export const ensureAbsoluteUrl = (url) => {
    if (!url) {
        return '#';
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};