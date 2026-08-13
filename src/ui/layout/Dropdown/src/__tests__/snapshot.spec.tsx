import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Dropdown } from '..';

describe('[SNAPSHOT] Dropdown', () => {
    it('Closed state', () => {
        const { container } = render(
            <Dropdown content={<span>Content</span>}>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Open state', () => {
        render(
            <Dropdown content={<span>Content</span>} isOpen>
                <button type="button">Trigger</button>
            </Dropdown>
        );

        expect(document.body.querySelector('[class*="Dropdown__panel"]')).toMatchSnapshot();
    });
});
