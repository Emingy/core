import type { TFieldError } from '../../types';

export const findFirstFieldError = (
    fields: Map<string, TFieldError>
): [string, TFieldError] | undefined => {
    let result: [string, TFieldError] | undefined;

    for (const entry of fields) {
        if (!result) {
            result = entry;
            continue;
        }

        const [, current] = entry;
        const [, best] = result;
        const position = best.element.compareDocumentPosition(current.element);

        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            result = entry;
        }
    }

    return result;
};
