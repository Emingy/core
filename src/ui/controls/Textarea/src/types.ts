import type { ChangeEvent, HTMLProps, ReactNode } from 'react';

import type { EResize } from './constants';

type TPropsCommon = {
    /**
     * @description Title or label displayed above the textarea field.
     * Recommended for accessibility (should be associated with the field's 'id').
     */
    title?: string;
    /**
     * @description Prefix (icon, text, or ReactNode) displayed before the textarea field.
     */
    prefix?: ReactNode;
    /**
     * @description Postfix (icon, text, or ReactNode) displayed after the textarea field.
     */
    postfix?: ReactNode;
    /**
     * @description Validation error message. Applies error-specific styling and is shown
     * in a tooltip over the field (via 'FormErrorTooltipProvider').
     */
    error?: string;
    /**
     * @description Flag indicating the disabled state of the field.
     * The field cannot receive input and has specific disabled styles.
     * @default false
     */
    disabled?: boolean;
    /**
     * @description Controls whether and in which direction the field can be resized by the user.
     * @default 'none'
     */
    resize?: `${EResize}`;
    /**
     * @description Minimum width of the field. A number is treated as pixels, a string is used as-is.
     * @default '100%'
     */
    minWidth?: number | string;
    /**
     * @description Maximum width of the field. A number is treated as pixels, a string is used as-is.
     * @default '100%'
     */
    maxWidth?: number | string;
    /**
     * @description Minimum height of the field. A number is treated as pixels, a string is used as-is.
     * @default 100
     */
    minHeight?: number | string;
    /**
     * @description Maximum height of the field. A number is treated as pixels, a string is used as-is.
     * @default 400
     */
    maxHeight?: number | string;
    /**
     * @description Maximum number of characters. Also renders a "current/max" counter
     * in the bottom-right corner of the field.
     */
    maxLength?: number;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    validate?: (value: string) => boolean;
    value?: string;
};

export type TProps = TPropsCommon &
    Omit<HTMLProps<HTMLTextAreaElement>, 'onChange' | 'value' | 'maxLength'>;
