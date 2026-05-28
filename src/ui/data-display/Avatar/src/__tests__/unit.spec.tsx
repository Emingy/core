import React from 'react';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Avatar } from '..';

describe('[UNIT] Avatar', () => {
    it('Render', () => {
        const { container } = render(<Avatar src="/test.jpg" data-testid="avatar" />);
        const button = container.querySelector('button');

        expect(button).toBeDefined();
    });

    it('Renders as button element', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const button = container.querySelector('button');

        expect(button?.tagName).toBe('BUTTON');
    });

    it('Renders image with correct src', () => {
        render(<Avatar src="/test.jpg" alt="Test" />);
        const img = screen.getByRole('img');

        expect(img.getAttribute('src')).toBe('/test.jpg');
    });

    it('Renders image with alt text', () => {
        render(<Avatar src="/test.jpg" alt="User Avatar" />);
        const img = screen.getByRole('img');

        expect(img.getAttribute('alt')).toBe('User Avatar');
    });

    it('Shows spinner initially', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const spinner = container.querySelector('svg');

        expect(spinner).toBeDefined();
    });

    it('Applies Avatar base class', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Avatar');
    });

    it('Applies custom className', () => {
        const { container } = render(<Avatar src="/test.jpg" className="custom-avatar" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('custom-avatar');
    });

    it('Applies loading class initially', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Avatar__loading');
    });

    it('Hides image while loading', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const img = container.querySelector('img');

        expect(img?.className).toContain('Avatar__image-hidden');
    });

    it('Calls onLoad when image loads', async () => {
        let loaded = false;
        const handleLoad = () => {
            loaded = true;
        };

        const { container } = render(<Avatar src="/test.jpg" onLoad={handleLoad} />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.load(img);
        }

        await waitFor(() => {
            expect(loaded).toBe(true);
        });
    });

    it('Hides spinner after image loads', async () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.load(img);
        }

        await waitFor(() => {
            const spinner = container.querySelector('svg');
            expect(spinner).toBeNull();
        });
    });

    it('Shows image after loading', async () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.load(img);
        }

        await waitFor(() => {
            expect(img?.className).not.toContain('Avatar__image-hidden');
        });
    });

    it('Calls onError when image fails to load', async () => {
        let errored = false;
        const handleError = () => {
            errored = true;
        };

        const { container } = render(<Avatar src="/invalid.jpg" onError={handleError} />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.error(img);
        }

        await waitFor(() => {
            expect(errored).toBe(true);
        });
    });

    it('Hides spinner on error', async () => {
        const { container } = render(<Avatar src="/invalid.jpg" />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.error(img);
        }

        await waitFor(() => {
            const spinner = container.querySelector('svg');
            expect(spinner).toBeNull();
        });
    });

    it('Handles onClick event', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = render(<Avatar src="/test.jpg" onClick={handleClick} />);
        const button = container.querySelector('button');

        if (button) {
            fireEvent.click(button);
        }

        expect(clicked).toBe(true);
    });

    it('Applies disabled state', () => {
        const { container } = render(<Avatar src="/test.jpg" disabled />);
        const button = container.querySelector('button') as HTMLButtonElement;

        expect(button?.disabled).toBe(true);
    });

    it('Does not call onClick when disabled', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = render(<Avatar src="/test.jpg" onClick={handleClick} disabled />);
        const button = container.querySelector('button');

        if (button) {
            fireEvent.click(button);
        }

        expect(clicked).toBe(false);
    });

    it('Passes rest props to image', () => {
        render(<Avatar src="/test.jpg" alt="Test" title="User Avatar" />);
        const img = screen.getByRole('img');

        expect(img.getAttribute('title')).toBe('User Avatar');
    });
});
