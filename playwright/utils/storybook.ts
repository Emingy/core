type TArgs = Record<string, string | boolean | number>;

const serializeArg = (value: string | boolean | number): string => {
    if (typeof value === 'boolean') return `!${value}`;
    return String(value);
};

const serializeArgs = (args: TArgs): string =>
    Object.entries(args)
        .map(([k, v]) => `${k}:${serializeArg(v)}`)
        .join(';');

export const storyUrl = (id: string, args?: TArgs): string => {
    const base = `/?path=/story/${id}`;
    if (!args || Object.keys(args).length === 0) return base;
    return `${base}&args=${serializeArgs(args)}`;
};

export const iframeUrl = (id: string, args?: TArgs): string => {
    const base = `/iframe.html?id=${id}`;
    if (!args || Object.keys(args).length === 0) return base;
    return `${base}&args=${serializeArgs(args)}`;
};
