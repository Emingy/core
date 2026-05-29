import React from 'react';

import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import type { TTooltipItem } from '../../../types';
import { TooltipItem } from '..';

const noop = () => {};

describe('[SNAPSHOT] TooltipItem', () => {
    let trigger: HTMLDivElement;

    beforeEach(() => {
        trigger = document.createElement('div') as HTMLDivElement;
        document.body.appendChild(trigger);
    });

    afterEach(() => {
        if (trigger.parentNode) {
            trigger.parentNode.removeChild(trigger);
        }
    });

    it('should render with position top', () => {
        const item: TTooltipItem = {
            id: 'snap-1',
            text: 'Snapshot tooltip',
            position: 'top',
            trigger,
            size: 'md',
        };

        const { container } = render(<TooltipItem item={item} isExiting={false} onRemove={noop} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with size sm', () => {
        const item: TTooltipItem = {
            id: 'snap-2',
            text: 'Small tooltip',
            position: 'top',
            trigger,
            size: 'sm',
        };

        const { container } = render(<TooltipItem item={item} isExiting={false} onRemove={noop} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with isExiting true', () => {
        const item: TTooltipItem = {
            id: 'snap-3',
            text: 'Exiting tooltip',
            position: 'top',
            trigger,
            size: 'md',
        };

        const { container } = render(<TooltipItem item={item} isExiting={true} onRemove={noop} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position bottom', () => {
        const item: TTooltipItem = {
            id: 'snap-4',
            text: 'Bottom tooltip',
            position: 'bottom',
            trigger,
            size: 'md',
        };

        const { container } = render(<TooltipItem item={item} isExiting={false} onRemove={noop} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with position right', () => {
        const item: TTooltipItem = {
            id: 'snap-5',
            text: 'Right tooltip',
            position: 'right',
            trigger,
            size: 'md',
        };

        const { container } = render(<TooltipItem item={item} isExiting={false} onRemove={noop} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
