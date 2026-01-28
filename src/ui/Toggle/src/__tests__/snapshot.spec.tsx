import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Toggle } from '..';

describe('[SNAPSHOT] Toggle', () => {
    it('should render basic toggle', () => {
        const { container } = render(<Toggle label="Basic toggle" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description', () => {
        const { container } = render(
            <Toggle label="Toggle with description" description="This is a helpful description" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with error', () => {
        const { container } = render(
            <Toggle label="Toggle with error" error="This field is required" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description and error (error takes priority)', () => {
        const { container } = render(
            <Toggle label="Toggle" description="Description text" error="Error text" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Toggle label="Custom toggle" className="my-custom-class" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled toggle', () => {
        const { container } = render(<Toggle label="Disabled toggle" disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render checked toggle', () => {
        const { container } = render(<Toggle label="Checked toggle" checked readOnly />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom id', () => {
        const { container } = render(<Toggle label="Custom ID" id="custom-toggle-id" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Toggle
                label="Full featured toggle"
                description="Description text"
                className="custom-class"
                id="full-toggle"
                disabled
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
