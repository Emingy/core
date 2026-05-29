import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { TooltipContext } from '../../../../../providers/TooltipProvider/src/context';
import { Tooltip } from '..';

const noop = () => {};

const renderWithContext = (ui: React.ReactElement) => {
    return render(
        <TooltipContext.Provider value={{ showTooltip: noop, hideTooltip: noop }}>
            {ui}
        </TooltipContext.Provider>
    );
};

describe('[SNAPSHOT] Tooltip', () => {
    it('should render with children', () => {
        const { container } = renderWithContext(
            <Tooltip text="Hello tooltip">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position top', () => {
        const { container } = renderWithContext(
            <Tooltip text="Top tooltip" position="top">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position bottom', () => {
        const { container } = renderWithContext(
            <Tooltip text="Bottom tooltip" position="bottom">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position left', () => {
        const { container } = renderWithContext(
            <Tooltip text="Left tooltip" position="left">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position right', () => {
        const { container } = renderWithContext(
            <Tooltip text="Right tooltip" position="right">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size md', () => {
        const { container } = renderWithContext(
            <Tooltip text="Medium tooltip" size="md">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render without size prop', () => {
        const { container } = renderWithContext(
            <Tooltip text="No size tooltip">
                <span>Hover me</span>
            </Tooltip>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
