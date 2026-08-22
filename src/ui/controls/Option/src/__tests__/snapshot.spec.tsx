import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EType } from '../constants';
import { Option } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] Option', () => {
    it('should render basic option', () => {
        const { container } = render(<Option>Basic Option</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render alert type', () => {
        const { container } = render(<Option type={EType.Alert}>Delete</Option>);
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

    it('should render as button', () => {
        const { container } = render(<Option element="button">Button Option</Option>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as button with prefix and description', () => {
        const { container } = render(
            <Option element="button" prefix="⭐" description="Button description">
                Button With Prefix
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as link', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about">
                Link Option
            </Option>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as link with prefix and description', () => {
        const { container } = renderWithRouter(
            <Option element="link" to="/about" prefix="⭐" description="Link description">
                Link With Prefix
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
