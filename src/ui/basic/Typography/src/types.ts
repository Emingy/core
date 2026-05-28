import type { ElementType, PropsWithChildren } from 'react';

import { EAlign, ETextCase, EWeight } from './constants';

type TPropsBase = PropsWithChildren<{
    /**
     * @description Sets the font weight.
     * @example 'medium' | 'semibold' | 'bold'
     */
    weight?: `${EWeight}`;

    /**
     * @description Additional CSS class name(s) to apply to the root element.
     */
    className?: string;

    /**
     * @description Allows overriding the default HTML tag used for rendering.
     * Useful for rendering text styles with different semantics (e.g., 'span', 'div').
     * @default (determined by component type, e.g., 'h1', 'p')
     */
    elementType?: ElementType;

    /**
     * @description Determines if the text should be rendered with an italic font style.
     * @default false
     */
    isItalic?: boolean;

    /**
     * @description Sets the horizontal alignment of the text.
     * @example 'center' | 'right' | 'justify'
     */
    align?: `${EAlign}`;

    /**
     * @description Truncates single-line text with an ellipsis (...) if it overflows its container.
     * Requires CSS properties like `overflow: hidden` and `white-space: nowrap`.
     * @default false
     */
    isTruncated?: boolean;

    /**
     * @description Limits the text to a specified number of lines, appending an ellipsis
     * on overflow (multiline truncation).
     * Requires specific CSS support (e.g., -webkit-line-clamp).
     */
    maxLines?: number;

    /**
     * @description Applies a text case transformation (e.g., UPPERCASE, lowercase).
     * @example 'uppercase' | 'lowercase' | 'capitalize'
     */
    textCase?: `${ETextCase}`;
}>;

export type TProps<T extends ElementType = 'p'> = TPropsBase &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TPropsBase | 'children'>;
