import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { EAlign, ETextCase, ETypographyType, EWeight } from '../constants';
import { Typography } from '..';

describe('[UNIT] Typography', () => {
    const typographyTypes = Object.keys(Typography) as (keyof typeof Typography)[];

    for (const type of typographyTypes) {
        it(`Render ${type}`, () => {
            const Element = Typography[type];
            const testMessage = `Some test message with ${type}`;
            render(<Element>{testMessage}</Element>);

            if (type.includes('Heading')) {
                expect(screen.getByRole('heading', { name: testMessage })).toBeDefined();
            } else {
                expect(screen.getByText(testMessage)).toBeDefined();
            }
        });

        it(`${type} tag name`, () => {
            const Element = Typography[type];
            render(<Element>{type}</Element>);

            if (type.includes('Heading1')) {
                expect(screen.getByRole('heading', { name: type }).tagName).toEqual('H1');
            } else if (type.includes('Heading2')) {
                expect(screen.getByRole('heading', { name: type }).tagName).toEqual('H2');
            } else if (type.includes('Heading3')) {
                expect(screen.getByRole('heading', { name: type }).tagName).toEqual('H3');
            } else {
                expect(screen.getByText(type).tagName).toEqual('P');
            }
        });
    }

    it('Align variants', () => {
        const variants = Object.values(EAlign);

        expect(variants).toEqual(['center', 'right', 'justify']);
    });
    it('Case variants', () => {
        const variants = Object.values(ETextCase);

        expect(variants).toEqual(['uppercase', 'lowercase', 'capitalize']);
    });
    it('Type variants', () => {
        const variants = Object.values(ETypographyType);

        expect(variants).toEqual([
            'heading-1',
            'heading-2',
            'heading-3',
            'title',
            'subtitle',
            'large',
            'base',
            'small',
            'micro',
        ]);
    });
    it('Weight variants', () => {
        const variants = Object.values(EWeight);

        expect(variants).toEqual(['medium', 'semibold', 'bold']);
    });

    it('Custom tag', () => {
        render(<Typography.Base elementType="code">Code</Typography.Base>);

        expect(screen.getByText('Code').tagName).toEqual('CODE');
    });

    it('Rest props', () => {
        const restProps = {
            id: 'test-container',
            'data-testid': 'styled-wrapper',
            'aria-describedby': 'help-text-id',
            tabIndex: '0',
        };

        render(<Typography.Base {...restProps}>with rest</Typography.Base>);

        for (const [attribute, value] of Object.entries(restProps)) {
            expect(screen.getByText('with rest').getAttribute(attribute)).toStrictEqual(value);
        }
    });
});
