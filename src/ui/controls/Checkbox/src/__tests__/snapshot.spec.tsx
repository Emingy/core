import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Checkbox } from '..';

describe('[SNAPSHOT] Checkbox', () => {
    it('should render basic checkbox', () => {
        const { container } = render(<Checkbox label="Basic checkbox" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description', () => {
        const { container } = render(
            <Checkbox
                label="Checkbox with description"
                description="This is a helpful description"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with error', () => {
        const { container } = render(
            <Checkbox label="Checkbox with error" error="This field is required" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description and error (error takes priority)', () => {
        const { container } = render(
            <Checkbox label="Checkbox" description="Description text" error="Error text" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(
            <Checkbox label="Custom checkbox" className="my-custom-class" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled checkbox', () => {
        const { container } = render(<Checkbox label="Disabled checkbox" disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render checked checkbox', () => {
        const { container } = render(<Checkbox label="Checked checkbox" checked readOnly />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom id', () => {
        const { container } = render(<Checkbox label="Custom ID" id="custom-checkbox-id" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Checkbox
                label="Full featured checkbox"
                description="Description text"
                className="custom-class"
                id="full-checkbox"
                disabled
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
