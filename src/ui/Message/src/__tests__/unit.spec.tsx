import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';

import { EType } from '../constants';
import { Message } from '..';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {ui}
        </MemoryRouter>
    );
};

describe('[UNIT] Message', () => {
    it('Renders children', () => {
        renderWithRouter(<Message type={EType.Success}>Test message</Message>);

        expect(screen.getByText('Test message')).toBeDefined();
    });

    it('Renders title when provided', () => {
        renderWithRouter(
            <Message type={EType.Success} title="Title text">
                Content
            </Message>
        );

        expect(screen.getByText('Title text')).toBeDefined();
    });

    it('Does not render title when not provided', () => {
        renderWithRouter(<Message type={EType.Success}>Content</Message>);

        expect(screen.queryByText('Title text')).toBeNull();
    });

    it('Renders close button', () => {
        const { container } = renderWithRouter(<Message type={EType.Success}>Content</Message>);
        const button = container.querySelector('button');

        expect(button).toBeDefined();
    });

    it('Calls onCloseClick when close button is clicked', () => {
        let clicked = false;
        const handleClose = () => {
            clicked = true;
        };

        const { container } = renderWithRouter(
            <Message type={EType.Success} onCloseClick={handleClose}>
                Content
            </Message>
        );
        const button = container.querySelector('button') as HTMLButtonElement;

        fireEvent.click(button);

        expect(clicked).toBe(true);
    });

    it('Applies custom className', () => {
        const { container } = renderWithRouter(
            <Message type={EType.Success} className="custom-message">
                Content
            </Message>
        );
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper?.className).toContain('custom-message');
    });

    it('Applies base Message class', () => {
        const { container } = renderWithRouter(<Message type={EType.Success}>Content</Message>);
        const wrapper = container.firstChild as HTMLElement;

        expect(wrapper?.className).toContain('Message');
    });

    it('Calls onMouseEnter handler', () => {
        let entered = false;
        const handleEnter = () => {
            entered = true;
        };

        const { container } = renderWithRouter(
            <Message type={EType.Success} onMouseEnter={handleEnter}>
                Content
            </Message>
        );

        fireEvent.mouseEnter(container.firstChild as HTMLElement);

        expect(entered).toBe(true);
    });

    it('Calls onMouseLeave handler', () => {
        let left = false;
        const handleLeave = () => {
            left = true;
        };

        const { container } = renderWithRouter(
            <Message type={EType.Success} onMouseLeave={handleLeave}>
                Content
            </Message>
        );

        fireEvent.mouseLeave(container.firstChild as HTMLElement);

        expect(left).toBe(true);
    });

    it('Renders StatusIndicator with success type', () => {
        const { container } = renderWithRouter(<Message type={EType.Success}>Content</Message>);
        const indicator = container.querySelector('[class*="StatusIndicator__success"]');

        expect(indicator).toBeDefined();
    });

    it('Renders StatusIndicator with warning type', () => {
        const { container } = renderWithRouter(<Message type={EType.Warning}>Content</Message>);
        const indicator = container.querySelector('[class*="StatusIndicator__warning"]');

        expect(indicator).toBeDefined();
    });

    it('Renders StatusIndicator with error type', () => {
        const { container } = renderWithRouter(<Message type={EType.Error}>Content</Message>);
        const indicator = container.querySelector('[class*="StatusIndicator__error"]');

        expect(indicator).toBeDefined();
    });

    it('Renders children alongside title', () => {
        renderWithRouter(
            <Message type={EType.Success} title="Title">
                Body text
            </Message>
        );

        expect(screen.getByText('Title')).toBeDefined();
        expect(screen.getByText('Body text')).toBeDefined();
    });
});
