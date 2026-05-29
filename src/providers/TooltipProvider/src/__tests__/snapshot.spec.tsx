import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { TooltipProvider } from '..';

describe('[SNAPSHOT] TooltipProvider', () => {
    it('should render with children', () => {
        const { container } = render(
            <TooltipProvider>
                <div>Child content</div>
            </TooltipProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with text children', () => {
        const { container } = render(
            <TooltipProvider>
                <span>App content</span>
            </TooltipProvider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
