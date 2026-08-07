import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Textarea } from '..';

describe('[SNAPSHOT] Textarea', () => {
    it('should render basic textarea', () => {
        const { container } = render(<Textarea />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title', () => {
        const { container } = render(<Textarea title="Description" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with placeholder', () => {
        const { container } = render(<Textarea placeholder="Tell us more" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with value', () => {
        const { container } = render(<Textarea value="Some text" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix', () => {
        const { container } = render(<Textarea prefix="@" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with postfix', () => {
        const { container } = render(<Textarea postfix=".com" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix and postfix', () => {
        const { container } = render(<Textarea prefix="$" postfix="USD" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled state', () => {
        const { container } = render(<Textarea disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render error state', () => {
        const { container } = render(<Textarea error />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with resize vertical', () => {
        const { container } = render(<Textarea resize="vertical" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with resize both', () => {
        const { container } = render(<Textarea resize="both" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title and value', () => {
        const { container } = render(<Textarea title="Bio" value="Hello world" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Textarea
                title="Message"
                value="Hi"
                prefix="$"
                postfix="USD"
                resize="both"
                className="custom-class"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled with error', () => {
        const { container } = render(<Textarea disabled error />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Textarea className="my-custom-textarea" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with various HTML textarea attributes', () => {
        const { container } = render(<Textarea name="bio" rows={6} maxLength={200} required />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with maxLength counter and postfix', () => {
        const { container } = render(<Textarea value="Hi" maxLength={100} postfix="chars" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom size bounds', () => {
        const { container } = render(
            <Textarea minWidth={300} maxWidth={500} minHeight={150} maxHeight={300} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
