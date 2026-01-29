export const getPreparedValue = (value: string | number) => {
    if (typeof value === 'number') {
        if (value > 99) {
            return '99+';
        }

        return `${value}`;
    }

    return value;
};
