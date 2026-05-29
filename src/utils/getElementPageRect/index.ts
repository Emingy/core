export const getElementPageRect = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();

    let left = rect.left;
    let top = rect.top;

    let currentWindow: Window = window;

    while (currentWindow !== currentWindow.parent) {
        const frame = currentWindow.frameElement;

        if (!(frame instanceof HTMLElement)) {
            break;
        }

        const frameRect = frame.getBoundingClientRect();

        left += frameRect.left;
        top += frameRect.top;

        currentWindow = currentWindow.parent;
    }

    return {
        left,
        top,
        right: left + rect.width,
        bottom: top + rect.height,
        width: rect.width,
        height: rect.height,
    };
};
