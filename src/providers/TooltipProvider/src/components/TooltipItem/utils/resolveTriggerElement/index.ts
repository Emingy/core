export const resolveTriggerElement = (trigger: HTMLElement): HTMLElement => {
    const { width, height } = trigger.getBoundingClientRect();
    const hasEmptyBox = width === 0 && height === 0;

    if (hasEmptyBox && trigger.firstElementChild instanceof HTMLElement) {
        return trigger.firstElementChild;
    }

    return trigger;
};
