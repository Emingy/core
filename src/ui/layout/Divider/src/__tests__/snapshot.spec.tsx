import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EType } from '../constants';
import { Divider } from '..';

describe('[SNAPSHOT] Divider', () => {
    it('should render basic divider', () => {
        const { container } = render(<Divider />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render horizontal divider', () => {
        const { container } = render(<Divider type={EType.Horizontal} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render vertical divider', () => {
        const { container } = render(<Divider type={EType.Vertical} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with label', () => {
        const { container } = render(<Divider label="OR" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render horizontal with label', () => {
        const { container } = render(<Divider type={EType.Horizontal} label="Section" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render vertical with label', () => {
        const { container } = render(<Divider type={EType.Vertical} label="Text" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = render(<Divider className="custom-divider" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const { container } = render(
            <Divider type={EType.Vertical} label="Divider" className="my-custom-divider" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
