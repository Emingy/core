import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EColor, ESize } from '../constants';
import { Icon } from '..';

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props}>
        <path d="M0 0h24v24H0z" />
    </svg>
);

describe('[SNAPSHOT] Icon', () => {
    it('should render with default props', () => {
        const { container } = render(<Icon icon={MockIcon} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size xs', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Xs} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size sm', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Sm} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size md', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Md} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size lg', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Lg} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size xl', () => {
        const { container } = render(<Icon icon={MockIcon} size={ESize.Xl} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with color primary', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Primary} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with color secondary', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Secondary} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with color alert', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Alert} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with color success', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Success} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with color inherit', () => {
        const { container } = render(<Icon icon={MockIcon} color={EColor.Inherit} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Icon icon={MockIcon} className="custom-icon" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size and color combined', () => {
        const { container } = render(
            <Icon icon={MockIcon} size={ESize.Lg} color={EColor.Primary} />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with extra SVG props', () => {
        const { container } = render(<Icon icon={MockIcon} aria-label="close" role="img" />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
