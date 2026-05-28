import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EType } from '../constants';
import { ToggleButton } from '..';

describe('[SNAPSHOT] ToggleButton', () => {
    it('should render basic toggle button', () => {
        const { container } = render(<ToggleButton>Click me</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render primary type', () => {
        const { container } = render(<ToggleButton type={EType.Primary}>Primary</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render secondary type', () => {
        const { container } = render(<ToggleButton type={EType.Secondary}>Secondary</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled state', () => {
        const { container } = render(<ToggleButton disabled>Disabled</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render checked state', () => {
        const { container } = render(
            <ToggleButton checked readOnly>
                Checked
            </ToggleButton>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix', () => {
        const { container } = render(<ToggleButton prefix="$">Price</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with postfix', () => {
        const { container } = render(<ToggleButton postfix="→">Next</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix and postfix', () => {
        const { container } = render(
            <ToggleButton prefix="$" postfix="USD">
                100
            </ToggleButton>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<ToggleButton className="custom-toggle">Custom</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom id', () => {
        const { container } = render(<ToggleButton id="custom-id">Custom ID</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render all combinations', () => {
        const { container } = render(
            <ToggleButton type={EType.Primary} prefix="←" postfix="→" className="complex-toggle">
                Complex Toggle
            </ToggleButton>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state', () => {
        const { container } = render(<ToggleButton isLoading>Loading</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state with primary type', () => {
        const { container } = render(
            <ToggleButton isLoading type={EType.Primary}>
                Loading
            </ToggleButton>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state with secondary type', () => {
        const { container } = render(
            <ToggleButton isLoading type={EType.Secondary}>
                Loading
            </ToggleButton>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with isFullWidth', () => {
        const { container } = render(<ToggleButton isFullWidth>Full Width Toggle</ToggleButton>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
