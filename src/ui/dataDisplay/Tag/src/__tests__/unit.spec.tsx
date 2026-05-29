import React from 'react';

import { describe, expect, it, rstest } from '@rstest/core';
import { fireEvent, render } from '@testing-library/react';

import { ETagColor, ETagSize, Tag } from '..';

describe('[UNIT] Tag', () => {
    it('Render', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(button).toBeDefined();
    });

    it('Renders as button element', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(button?.tagName).toBe('BUTTON');
    });

    it('Renders text content', () => {
        const { container } = render(<Tag text="Hello" />);

        expect(container.textContent).toContain('Hello');
    });

    it('Applies Tag base class', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag');
    });

    it('Applies custom className', () => {
        const { container } = render(<Tag text="Test" className="custom-tag" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('custom-tag');
    });

    it('Applies default purple color class', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__purple');
    });

    it('Applies grey color class', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Grey} />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__grey');
    });

    it('Applies yellow color class', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Yellow} />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__yellow');
    });

    it('Applies red color class', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Red} />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__red');
    });

    it('Applies green color class', () => {
        const { container } = render(<Tag text="Test" color={ETagColor.Green} />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__green');
    });

    it('Does not apply small class for md size', () => {
        const { container } = render(<Tag text="Test" size={ETagSize.Md} />);
        const button = container.querySelector('button');

        expect(button?.className).not.toContain('Tag__small');
    });

    it('Applies small class for sm size', () => {
        const { container } = render(<Tag text="Test" size={ETagSize.Sm} />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__small');
    });

    it('Applies clickable class when onClick provided', () => {
        const { container } = render(<Tag text="Test" onClick={rstest.fn()} id="1" />);
        const button = container.querySelector('button');

        expect(button?.className).toContain('Tag__clickable');
    });

    it('Does not apply clickable class without onClick', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(button?.className).not.toContain('Tag__clickable');
    });

    it('Calls onClick with id when clicked', () => {
        let receivedId: string | number | undefined;
        const handleClick = (id: string | number) => {
            receivedId = id;
        };

        const { container } = render(<Tag text="Test" onClick={handleClick} id="tag-1" />);
        const button = container.querySelector('button');

        if (button) {
            fireEvent.click(button);
        }

        expect(receivedId).toBe('tag-1');
    });

    it('Calls onClick with numeric id', () => {
        let receivedId: string | number | undefined;
        const handleClick = (id: string | number) => {
            receivedId = id;
        };

        const { container } = render(<Tag text="Test" onClick={handleClick} id={42} />);
        const button = container.querySelector('button');

        if (button) {
            fireEvent.click(button);
        }

        expect(receivedId).toBe(42);
    });

    it('Does not throw when clicked without onClick', () => {
        const { container } = render(<Tag text="Test" />);
        const button = container.querySelector('button');

        expect(() => {
            if (button) {
                fireEvent.click(button);
            }
        }).not.toThrow();
    });

    it('Renders close icon when closable', () => {
        const { container } = render(<Tag text="Test" closable onClose={rstest.fn()} id="1" />);
        const svgs = container.querySelectorAll('svg');

        expect(svgs.length).toBeGreaterThan(0);
    });

    it('Does not render close icon without closable', () => {
        const { container } = render(<Tag text="Test" />);
        const svgs = container.querySelectorAll('svg');

        expect(svgs.length).toBe(0);
    });

    it('Calls onClose with id when close icon clicked', () => {
        let closedId: string | number | undefined;
        const handleClose = (id: string | number) => {
            closedId = id;
        };

        const { container } = render(<Tag text="Test" closable onClose={handleClose} id="tag-1" />);
        const svg = container.querySelector('svg');

        if (svg) {
            fireEvent.click(svg);
        }

        expect(closedId).toBe('tag-1');
    });

    it('Close click does not bubble to button onClick', () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true;
        };

        const { container } = render(
            <Tag text="Test" closable onClick={handleClick} onClose={rstest.fn()} id="1" />
        );
        const svg = container.querySelector('svg');

        if (svg) {
            fireEvent.click(svg);
        }

        expect(clicked).toBe(false);
    });

    it('Renders icon when icon prop provided', () => {
        const MockIcon = () => <svg data-testid="mock-icon" />;

        const { container } = render(<Tag text="Test" icon={MockIcon} />);
        const svgs = container.querySelectorAll('svg');

        expect(svgs.length).toBeGreaterThan(0);
    });

    it('Does not render text when text not provided', () => {
        const { container } = render(<Tag />);

        expect(container.textContent).toBe('');
    });
});
