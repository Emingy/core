import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { Flex } from '..';

describe('[SNAPSHOT] Flex', () => {
    it(`Default render`, () => {
        render(
            <Flex data-testid="flex">
                <div />
                <div />
            </Flex>
        );

        expect(screen.getByTestId('flex')).toMatchSnapshot();
    });

    it(`With all props render`, () => {
        render(
            <Flex
                data-testid="flex"
                className="test-custom-class"
                direction="column-reverse"
                justify="space-between"
                align="baseline"
                gap="12x"
                inline={true}
                wrap={true}
            >
                <div />
                <div />
            </Flex>
        );

        expect(screen.getByTestId('flex')).toMatchSnapshot();
    });
});
