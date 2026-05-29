import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { ETagColor, ETagSize, Tag } from '..';

describe('[SNAPSHOT] Tag', () => {
    it('should render basic tag', () => {
        const { container } = render(<Tag text="Test" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Tag text="Test" className="custom-tag" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render without text', () => {
        const { container } = render(<Tag />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with grey color', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Grey} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with yellow color', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Yellow} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with red color', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Red} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with green color', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Green} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with sm size', () => {
        const { container } = render(<Tag text="Test" size={ETagSize.Sm} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with md size', () => {
        const { container } = render(<Tag text="Test" size={ETagSize.Md} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render closable tag', () => {
        const { container } = render(<Tag text="Test" closable onClose={() => {}} id="1" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render clickable tag', () => {
        const { container } = render(<Tag text="Test" onClick={() => {}} id="1" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render complex tag', () => {
        const { container } = render(
            <Tag
                text="Complex"
                color={ETagColor.Green}
                size={ETagSize.Sm}
                closable
                className="complex-tag"
                onClick={() => {}}
                onClose={() => {}}
                id="complex-1"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
