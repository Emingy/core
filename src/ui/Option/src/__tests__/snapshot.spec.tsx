import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Option } from '..';

describe('[SNAPSHOT] Option', () => {
    it('should render basic option', () => {
        const { container } = render(<Option>Basic Option</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Option className="custom-option">Custom Option</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render selected option', () => {
        const { container } = render(
            <Option isSelected onSelect={() => {}}>
                Selected Option
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled option', () => {
        const { container } = render(<Option isDisabled>Disabled Option</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix', () => {
        const { container } = render(<Option prefix="🔔">Option with Prefix</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with description', () => {
        const { container } = render(
            <Option description="This is a helpful description">Option with Description</Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix and description', () => {
        const { container } = render(
            <Option prefix="✓" description="Complete description">
                Full Option
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom id', () => {
        const { container } = render(<Option id="custom-id">Option with ID</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render selected and disabled', () => {
        const { container } = render(
            <Option isSelected isDisabled onSelect={() => {}}>
                Selected and Disabled
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render complex option', () => {
        const { container } = render(
            <Option
                id="complex-option"
                className="custom-class"
                prefix="⭐"
                description="Complex option with all props"
                isSelected
                onSelect={() => {}}
            >
                Complex Option
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
