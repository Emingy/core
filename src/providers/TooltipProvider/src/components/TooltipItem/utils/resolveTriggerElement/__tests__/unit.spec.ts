import { describe, expect, it } from '@rstest/core';

import { resolveTriggerElement } from '..';

describe('[UNIT] resolveTriggerElement', () => {
    it('Returns the trigger itself when it has a non-empty box', () => {
        const trigger = document.createElement('label');
        Object.defineProperty(trigger, 'getBoundingClientRect', {
            value: () => ({ width: 200, height: 40 }),
        });

        expect(resolveTriggerElement(trigger)).toBe(trigger);
    });

    it('Falls back to the first element child when the trigger has an empty box', () => {
        const trigger = document.createElement('div');
        Object.defineProperty(trigger, 'getBoundingClientRect', {
            value: () => ({ width: 0, height: 0 }),
        });
        const child = document.createElement('span');
        trigger.appendChild(child);

        expect(resolveTriggerElement(trigger)).toBe(child);
    });

    it('Returns the trigger when its box is empty and it has no element child', () => {
        const trigger = document.createElement('div');
        Object.defineProperty(trigger, 'getBoundingClientRect', {
            value: () => ({ width: 0, height: 0 }),
        });

        expect(resolveTriggerElement(trigger)).toBe(trigger);
    });

    it('Returns the trigger when its box is empty and its first child is a text node', () => {
        const trigger = document.createElement('div');
        Object.defineProperty(trigger, 'getBoundingClientRect', {
            value: () => ({ width: 0, height: 0 }),
        });
        trigger.appendChild(document.createTextNode('hello'));

        expect(resolveTriggerElement(trigger)).toBe(trigger);
    });
});
