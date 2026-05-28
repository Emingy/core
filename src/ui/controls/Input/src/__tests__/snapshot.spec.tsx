import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Input } from '..';

describe('[SNAPSHOT] Input', () => {
    it('should render basic input', () => {
        const { container } = render(<Input />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title', () => {
        const { container } = render(<Input title="Email" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with placeholder', () => {
        const { container } = render(<Input placeholder="Enter your email" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with value', () => {
        const { container } = render(<Input value="test@example.com" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix', () => {
        const { container } = render(<Input prefix="@" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with postfix', () => {
        const { container } = render(<Input postfix=".com" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix and postfix', () => {
        const { container } = render(<Input prefix="$" postfix="USD" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled state', () => {
        const { container } = render(<Input disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render error state', () => {
        const { container } = render(<Input error />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with mask', () => {
        const { container } = render(<Input mask="+7 (d{3}) d{3}-d{2}-d{2}" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title and value', () => {
        const { container } = render(<Input title="Phone" value="+7 (555) 123-45-67" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Input title="Amount" value="1000" prefix="$" postfix="USD" className="custom-class" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled with error', () => {
        const { container } = render(<Input disabled error />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with mask and title', () => {
        const { container } = render(
            <Input title="Phone Number" mask="+7 (d{3}) d{3}-d{2}-d{2}" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Input className="my-custom-input" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with various HTML input attributes', () => {
        const { container } = render(
            <Input type="email" name="email" autoComplete="email" required />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
