import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import type { TSvgComponent } from '@emingy/core/ui/Icon/src/types';
import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { ESize, EType } from '../constants';
import { Button } from '..';

const MockIcon: TSvgComponent = (props) => (
    <svg {...props}>
        <path d="M0 0h24v24H0z" />
    </svg>
);

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('[SNAPSHOT] Button', () => {
    it('should render basic button', () => {
        const { container } = renderWithRouter(<Button>Click me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render primary type', () => {
        const { container } = renderWithRouter(<Button type={EType.Primary}>Primary</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render secondary type', () => {
        const { container } = renderWithRouter(<Button type={EType.Secondary}>Secondary</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render ghosted type', () => {
        const { container } = renderWithRouter(<Button type={EType.Ghosted}>Ghosted</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render outlined type', () => {
        const { container } = renderWithRouter(<Button type={EType.Outlined}>Ghosted</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render alert type', () => {
        const { container } = renderWithRouter(<Button type={EType.Alert}>Alert</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render small size', () => {
        const { container } = renderWithRouter(<Button size={ESize.Sm}>Small</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render medium size', () => {
        const { container } = renderWithRouter(<Button size={ESize.Md}>Medium</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render large size', () => {
        const { container } = renderWithRouter(<Button size={ESize.Lg}>Large</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render disabled state', () => {
        const { container } = renderWithRouter(<Button disabled>Disabled</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix', () => {
        const { container } = renderWithRouter(<Button prefix="$">Price</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with postfix', () => {
        const { container } = renderWithRouter(<Button postfix="→">Next</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with prefix and postfix', () => {
        const { container } = renderWithRouter(
            <Button prefix="$" postfix="USD">
                100
            </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render splitted button', () => {
        const { container } = renderWithRouter(<Button splitted>Split</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = renderWithRouter(<Button className="custom-button">Custom</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with htmlType submit', () => {
        const { container } = renderWithRouter(<Button htmlType="submit">Submit</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render all combinations', () => {
        const { container } = renderWithRouter(
            <Button
                type={EType.Primary}
                size={ESize.Lg}
                prefix="←"
                postfix="→"
                className="complex-button"
            >
                Complex Button
            </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state', () => {
        const { container } = renderWithRouter(<Button isLoading>Loading</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state with primary type', () => {
        const { container } = renderWithRouter(
            <Button isLoading type={EType.Primary}>
                Loading
            </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render loading state with secondary type', () => {
        const { container } = renderWithRouter(
            <Button isLoading type={EType.Secondary}>
                Loading
            </Button>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with isFullWidth', () => {
        const { container } = renderWithRouter(<Button isFullWidth>Full Width Button</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with icon', () => {
        const { container } = renderWithRouter(<Button icon={MockIcon}>With Icon</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with icon and without children', () => {
        const { container } = renderWithRouter(<Button icon={MockIcon} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
