const EXTERNAL_URL_PATTERN = /^https?:\/\//;

export const isExternalUrl = (url: string): boolean => EXTERNAL_URL_PATTERN.test(url);
