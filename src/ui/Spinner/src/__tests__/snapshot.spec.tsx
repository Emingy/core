import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { Spinner } from '..';

describe('[SNAPSHOT] Spinner', () => {
    it('should render basic spinner', () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Spinner className="my-custom-spinner" />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
