import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { Typography } from '..';

describe('[SNAPSHOT] Typography', () => {
    const typographyTypes = Object.keys(Typography) as (keyof typeof Typography)[];

    for (const type of typographyTypes) {
        const Element = Typography[type];
        const testMessage = `Some test message with ${type}`;

        it(`${type} default`, () => {
            render(<Element>{testMessage}</Element>);

            expect(screen.getByText(testMessage)).toMatchSnapshot();
        });

        it(`${type} with all props`, () => {
            render(
                <Element
                    weight="bold"
                    className="test"
                    elementType="code"
                    isItalic={true}
                    align="right"
                    isTruncated={true}
                    maxLines={1}
                    textCase="uppercase"
                    id="testid"
                    aria-label="some-label"
                >
                    {testMessage}
                </Element>
            );

            expect(screen.getByText(testMessage)).toMatchSnapshot();
        });
    }
});
