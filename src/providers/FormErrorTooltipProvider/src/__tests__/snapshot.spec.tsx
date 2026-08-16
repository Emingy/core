import React from 'react';

import { TooltipContext } from '@emingy/core/providers/TooltipProvider';
import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { FormErrorTooltipProvider } from '..';

describe('[SNAPSHOT] FormErrorTooltipProvider', () => {
    it('should render children without adding wrapper elements', () => {
        const { container } = render(
            <TooltipContext.Provider value={{ showTooltip: () => {}, hideTooltip: () => {} }}>
                <FormErrorTooltipProvider>
                    <div>Form content</div>
                </FormErrorTooltipProvider>
            </TooltipContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
