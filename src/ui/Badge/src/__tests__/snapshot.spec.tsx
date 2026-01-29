import React from 'react';
import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { Badge } from '..';
import { EType } from '../constants';

describe('[SNAPSHOT] Badge', () => {
    it('should render with string value', () => {
        const { container } = render(<Badge value="New" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with numeric value', () => {
        const { container } = render(<Badge value={5} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with value 99+', () => {
        const { container } = render(<Badge value={150} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with primary type', () => {
        const { container } = render(<Badge value="Test" type={EType.Primary} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with secondary type', () => {
        const { container } = render(<Badge value="Badge" type={EType.Secondary} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Badge value="Custom" className="my-badge" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with zero value', () => {
        const { container } = render(<Badge value={0} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with long text', () => {
        const { container } = render(<Badge value="Very Long Badge Text" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render complex badge', () => {
        const { container } = render(
            <Badge value={99} type={EType.Secondary} className="complex-badge" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
