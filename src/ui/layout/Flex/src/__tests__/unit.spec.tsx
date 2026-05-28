import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { EFlexAlign, EFlexDirection, EFlexGap, EFlexJustify } from '../constants';
import { Flex } from '..';

describe('[UNIT] Flex', () => {
    it(`Render`, () => {
        render(
            <Flex data-testid="flex">
                <div />
            </Flex>
        );

        expect(screen.getByTestId('flex')).toBeDefined();
    });

    it('Flex direction variants', () => {
        const variants = Object.values(EFlexDirection);

        expect(variants).toEqual(['row', 'column', 'row-reverse', 'column-reverse']);
    });
    it('Flex justify variants', () => {
        const variants = Object.values(EFlexJustify);

        expect(variants).toEqual([
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
        ]);
    });
    it('Flex align variants', () => {
        const variants = Object.values(EFlexAlign);

        expect(variants).toEqual(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']);
    });
    it('Flex gap variants', () => {
        const variants = Object.values(EFlexGap);

        expect(variants).toEqual(['1x', '2x', '4x', '6x', '8x', '10x', '12x']);
    });

    it('Rest props', () => {
        const restProps = {
            id: 'test-container',
            'data-testid': 'flex',
            'aria-label': 'help-text-id',
        };

        render(
            <Flex {...restProps}>
                <div />
            </Flex>
        );

        for (const [attribute, value] of Object.entries(restProps)) {
            expect(screen.getByTestId('flex').getAttribute(attribute)).toStrictEqual(value);
        }
    });
});
