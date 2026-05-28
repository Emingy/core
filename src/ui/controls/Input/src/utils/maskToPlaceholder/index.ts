export const maskToPlaceholder = (mask: string): string => {
    // Supports both comma and hyphen as separators: d{1,3} or d{1-3}
    return mask.replace(/([dw*])(?:\{(\d+)(?:[,-]\d+)?\})?/g, (_match, char, count) => {
        const repeatCount = count ? parseInt(count, 10) : 1;

        switch (char) {
            case 'd':
                return '1'.repeat(repeatCount);
            case 'w':
                return 'a'.repeat(repeatCount);
            default:
                return '*'.repeat(repeatCount);
        }
    });
};
