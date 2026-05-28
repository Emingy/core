type TParams = {
    currentCursorPosition: number;
    oldValue: string;
    newMaskedValue: string;
};

export const calculateCursorPosition = ({
    currentCursorPosition,
    oldValue,
    newMaskedValue,
}: TParams): number => {
    const isAtEnd = currentCursorPosition >= oldValue.length;

    if (isAtEnd) {
        return newMaskedValue.length;
    }

    const diff = newMaskedValue.length - oldValue.length;
    return Math.max(0, Math.min(currentCursorPosition + diff, newMaskedValue.length));
};
