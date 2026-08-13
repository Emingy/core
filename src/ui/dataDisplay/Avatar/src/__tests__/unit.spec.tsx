import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { describe, expect, it } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Avatar } from '..';

describe('[UNIT] Avatar', () => {
    it('Renders as a div when onClick, to and href are not passed', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const root = container.firstElementChild;

        expect(root?.tagName).toBe('DIV');
    });

    it('Renders as a button when onClick is passed', () => {
        const { container } = render(<Avatar src="/test.jpg" onClick={() => {}} />);
        const root = container.firstElementChild;

        expect(root?.tagName).toBe('BUTTON');
    });

    it('Renders as a link when to is passed', () => {
        const { container } = render(
            <MemoryRouter>
                <Avatar src="/test.jpg" to="/profile" />
            </MemoryRouter>
        );
        const root = container.querySelector('[class*="Avatar"]');

        expect(root?.tagName).toBe('A');
        expect(root?.getAttribute('href')).toBe('/profile');
    });

    it('Renders as a link when href is passed', () => {
        const { container } = render(<Avatar src="/test.jpg" href="/profile" />);
        const root = container.querySelector('[class*="Avatar"]');

        expect(root?.tagName).toBe('A');
        expect(root?.getAttribute('href')).toBe('/profile');
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
        const spinner = container.querySelector('[class*="Spinner"]');

        expect(spinner).not.toBeNull();
    });

    it('Applies Avatar base class', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const root = container.firstElementChild;

        expect(root?.className).toContain('Avatar');
    });

    it('Applies custom className', () => {
        const { container } = render(<Avatar src="/test.jpg" className="custom-avatar" />);
        const root = container.firstElementChild;

        expect(root?.className).toContain('custom-avatar');
    });

    it('Applies loading class initially', () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const root = container.firstElementChild;

        expect(root?.className).toContain('Avatar__loading');
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
            const spinner = container.querySelector('[class*="Spinner"]');
            expect(spinner).toBeNull();
        });
    });

    it('Removes loading class after image loads', async () => {
        const { container } = render(<Avatar src="/test.jpg" />);
        const img = container.querySelector('img');

        if (img) {
            fireEvent.load(img);
        }

        await waitFor(() => {
            const root = container.firstElementChild;
            expect(root?.className).not.toContain('Avatar__loading');
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
            const spinner = container.querySelector('[class*="Spinner"]');
            expect(spinner).toBeNull();
        });
    });

    it('Passes rest props to image', () => {
        render(<Avatar src="/test.jpg" alt="Test" title="User Avatar" />);
        const img = screen.getByRole('img');

        expect(img.getAttribute('title')).toBe('User Avatar');
    });

    describe('with onClick', () => {
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
            const { container } = render(<Avatar src="/test.jpg" onClick={() => {}} disabled />);
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
    });

    describe('without onClick', () => {
        it('Does not render a button', () => {
            const { container } = render(<Avatar src="/test.jpg" />);
            const button = container.querySelector('button');

            expect(button).toBeNull();
        });
    });

    describe('without src', () => {
        it('Does not apply loading class', () => {
            const { container } = render(<Avatar />);
            const root = container.firstElementChild;

            expect(root?.className).not.toContain('Avatar__loading');
        });

        it('Does not render a spinner', () => {
            const { container } = render(<Avatar />);
            const spinner = container.querySelector('[class*="Spinner"]');

            expect(spinner).toBeNull();
        });

        it('Applies placeholder class', () => {
            const { container } = render(<Avatar />);
            const root = container.firstElementChild;

            expect(root?.className).toContain('Avatar__placeholder');
        });

        it('Renders the person icon placeholder', () => {
            const { container } = render(<Avatar />);
            const icon = container.querySelector('svg');

            expect(icon).not.toBeNull();
        });
    });

    describe('on image error', () => {
        it('Applies placeholder class', async () => {
            const { container } = render(<Avatar src="/invalid.jpg" />);
            const img = container.querySelector('img');

            if (img) {
                fireEvent.error(img);
            }

            await waitFor(() => {
                const root = container.firstElementChild;
                expect(root?.className).toContain('Avatar__placeholder');
            });
        });

        it('Renders the person icon placeholder', async () => {
            const { container } = render(<Avatar src="/invalid.jpg" />);
            const img = container.querySelector('img');

            if (img) {
                fireEvent.error(img);
            }

            await waitFor(() => {
                const icon = container.querySelector('svg');
                expect(icon).not.toBeNull();
            });
        });

        it('Hides the placeholder once a new src loads successfully', async () => {
            const { container, rerender } = render(<Avatar src="/invalid.jpg" />);
            const img = container.querySelector('img');

            if (img) {
                fireEvent.error(img);
            }

            await waitFor(() => {
                const root = container.firstElementChild;
                expect(root?.className).toContain('Avatar__placeholder');
            });

            rerender(<Avatar src="/valid.jpg" />);
            const nextImg = container.querySelector('img');
            if (nextImg) {
                fireEvent.load(nextImg);
            }

            await waitFor(() => {
                const root = container.firstElementChild;
                expect(root?.className).not.toContain('Avatar__placeholder');
            });
        });
    });
});
