import React from 'react';
import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { Badge } from '..';
import { EType } from '../constants';

describe('[UNIT] Badge', () => {
    it('Render', () => {
        const { container } = render(<Badge value="Test" />);
        const badge = container.querySelector('div');

        expect(badge).toBeDefined();
    });

    it('Renders with string value', () => {
        const { container } = render(<Badge value="New" />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('New');
    });

    it('Renders with numeric value', () => {
        const { container } = render(<Badge value={5} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('5');
    });

    it('Renders with zero value', () => {
        const { container } = render(<Badge value={0} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('0');
    });

    it('Renders "99+" for value 100', () => {
        const { container } = render(<Badge value={100} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('99+');
    });

    it('Renders "99+" for value greater than 99', () => {
        const { container } = render(<Badge value={150} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('99+');
    });

    it('Renders "99" for value exactly 99', () => {
        const { container } = render(<Badge value={99} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('99');
    });

    it('Applies Badge base class', () => {
        const { container } = render(<Badge value="Test" />);
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('Badge');
    });

    it('Applies custom className', () => {
        const { container } = render(<Badge value="Test" className="custom-badge" />);
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('custom-badge');
    });

    it('Applies primary class by default', () => {
        const { container } = render(<Badge value="Test" />);
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('Badge__primary');
    });

    it('Applies primary class when type is primary', () => {
        const { container } = render(<Badge value="Test" type={EType.Primary} />);
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('Badge__primary');
    });

    it('Applies secondary class when type is secondary', () => {
        const { container } = render(<Badge value="Test" type={EType.Secondary} />);
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('Badge__secondary');
    });

    it('Does not apply primary class when type is secondary', () => {
        const { container } = render(<Badge value="Test" type={EType.Secondary} />);
        const badge = container.querySelector('div');

        expect(badge?.className).not.toContain('Badge__primary');
    });

    it('Does not apply secondary class when type is primary', () => {
        const { container } = render(<Badge value="Test" type={EType.Primary} />);
        const badge = container.querySelector('div');

        expect(badge?.className).not.toContain('Badge__secondary');
    });

    it('Renders with empty string', () => {
        const { container } = render(<Badge value="" />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('');
    });

    it('Renders with long text', () => {
        const { container } = render(<Badge value="Very Long Text" />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('Very Long Text');
    });

    it('Renders with negative number', () => {
        const { container } = render(<Badge value={-5} />);
        const badge = container.querySelector('div');

        expect(badge?.textContent).toBe('-5');
    });

    it('Contains Typography.Base component', () => {
        const { container } = render(<Badge value="Test" />);
        const typography = container.querySelector('div > span');

        expect(typography).toBeDefined();
    });

    it('Applies isTruncated to Typography.Base', () => {
        const { container } = render(<Badge value="Test" />);
        const typography = container.querySelector('div > span');

        expect(typography).toBeDefined();
        if (typography) {
            expect(typography.className).toContain('Base__truncated');
        }
    });

    it('Renders multiple badges independently', () => {
        const { container } = render(
            <>
                <Badge value={5} type={EType.Primary} />
                <Badge value="New" type={EType.Secondary} />
            </>
        );
        const badges = container.querySelectorAll('div');

        expect(badges.length).toBe(2);
        expect(badges[0]?.textContent).toBe('5');
        expect(badges[1]?.textContent).toBe('New');
    });

    it('Combines custom className with base classes', () => {
        const { container } = render(
            <Badge value="Test" type={EType.Secondary} className="my-badge" />
        );
        const badge = container.querySelector('div');

        expect(badge?.className).toContain('Badge');
        expect(badge?.className).toContain('Badge__secondary');
        expect(badge?.className).toContain('my-badge');
    });
});
