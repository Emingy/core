import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Avatar } from '..';

describe('[SNAPSHOT] Avatar', () => {
    it('should render basic avatar', () => {
        const { container } = render(<Avatar src="/test.jpg" alt="Test" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(
            <Avatar src="/test.jpg" alt="Test" className="custom-avatar" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled avatar', () => {
        const { container } = render(<Avatar src="/test.jpg" alt="Test" disabled />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title', () => {
        const { container } = render(<Avatar src="/test.jpg" alt="Test" title="User Avatar" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with different src', () => {
        const { container } = render(<Avatar src="/avatar.png" alt="Avatar" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render complex avatar', () => {
        const { container } = render(
            <Avatar src="/user.jpg" alt="User" className="user-avatar" title="John Doe" disabled />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
