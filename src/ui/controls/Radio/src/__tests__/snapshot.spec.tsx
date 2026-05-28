import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Radio } from '..';

describe('[SNAPSHOT] Radio', () => {
    it('should render basic radio', () => {
        const { container } = render(<Radio label="Basic radio" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description', () => {
        const { container } = render(
            <Radio label="Radio with description" description="This is a helpful description" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with error', () => {
        const { container } = render(
            <Radio label="Radio with error" error="This field is required" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description and error (error takes priority)', () => {
        const { container } = render(
            <Radio label="Radio" description="Description text" error="Error text" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Radio label="Custom radio" className="my-custom-class" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled radio', () => {
        const { container } = render(<Radio label="Disabled radio" disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render checked radio', () => {
        const { container } = render(<Radio label="Checked radio" checked readOnly />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom id', () => {
        const { container } = render(<Radio label="Custom ID" id="custom-radio-id" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with value', () => {
        const { container } = render(<Radio label="Radio with value" value="option1" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Radio
                label="Full featured radio"
                description="Description text"
                className="custom-class"
                id="full-radio"
                value="full-option"
                disabled
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
