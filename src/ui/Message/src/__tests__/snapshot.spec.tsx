import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { render } from '@testing-library/react';

import { EType } from '../constants';
import { Message } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[SNAPSHOT] Message', () => {
    it('should render success message', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Success}>Success content</Message>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render warning message', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Warning}>Warning content</Message>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render error message', () => {
        const { container } = renderWithRouter(<Message type={EType.Error}>Error content</Message>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with title', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Success} title="Important">
                Content with title
            </Message>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render without title', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Success}>Content only</Message>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Success} className="custom-msg">
                Styled
            </Message>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render all types with title', () => {
        for (const type of Object.values(EType)) {
            const { container } = renderWithRouter(
                <Message type={type} title={`${type} title`}>
                    {type} content
                </Message>
            );
            expect(container.firstChild).toMatchSnapshot();
        }
    });
});
