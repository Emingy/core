export enum EMaskType {
    Digital = 'digital',
    Letter = 'letter',
    Any = 'any',
    Static = 'static',
}

export type TParsedMask = Array<
    | {
          type: Exclude<`${EMaskType}`, `${EMaskType.Static}`>;
          min: number;
          max: number;
      }
    | {
          type: `${EMaskType.Static}`;
          value: string;
      }
>;

export const parseMask = (mask: string): TParsedMask => {
    const result: TParsedMask = [];
    let lastIndex = 0;

    // Supports both comma and hyphen as separators: d{1,3} or d{1-3}
    const regex = /[dw*](?:\{(\d+)(?:[,-](\d+))?\})?/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(mask)) !== null) {
        const [fullMatch] = match;
        const start = match.index;
        const end = start + fullMatch.length;

        if (start > lastIndex) {
            const staticValue = mask.slice(lastIndex, start);
            result.push({ type: EMaskType.Static, value: staticValue });
        }

        const char = fullMatch[0];
        const type = (() => {
            switch (char) {
                case 'd':
                    return EMaskType.Digital;
                case 'w':
                    return EMaskType.Letter;
                case '*':
                    return EMaskType.Any;
                default:
                    return EMaskType.Any;
            }
        })();

        const minStr = match[1];
        const maxStr = match[2] ?? match[1];
        const min = minStr ? parseInt(minStr, 10) : 1;
        const max = maxStr ? parseInt(maxStr, 10) : 1;

        if (min > max) {
            throw new Error(`Invalid range in "${fullMatch}": min (${min}) > max (${max})`);
        }

        result.push({ type, min, max });

        lastIndex = end;
    }

    if (lastIndex < mask.length) {
        result.push({ type: EMaskType.Static, value: mask.slice(lastIndex) });
    }

    return result;
};
