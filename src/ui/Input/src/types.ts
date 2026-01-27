import type { HTMLProps, PropsWithChildren, ReactNode } from 'react';

type TPropsCommon = {
    /**
     * @description Title or label displayed above the input field.
     * Recommended for accessibility (should be associated with the field's 'id').
     */
    title?: string;
    /**
     * @description Prefix (icon, text, or ReactNode) displayed before the input field.
     */
    prefix?: ReactNode;
    /**
     * @description Postfix (icon, text, or ReactNode) displayed after the input field.
     */
    postfix?: ReactNode;
    /**
     * @description Flag indicating a validation error state.
     * Applies error-specific styling.
     * @default false
     */
    error?: boolean;
    /**
     * @description Flag indicating the disabled state of the field.
     * The field cannot receive input and has specific disabled styles.
     * @default false
     */
    disabled?: boolean;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement> & { target: { unmaskedValue: string } }
    ) => void;
    validate?: (value: string) => boolean;
    value?: string;
};

type TPropsDependent =
    | {
          /**
           * @description Placeholder text for the input field.
           */
          placeholder?: string;
          /**
           * @description Input mask (if used). Must be excluded if 'placeholder' is used.
           */
          mask?: never;
      }
    | {
          /**
           * @description Placeholder text. Must be excluded if 'mask' is used.
           */
          placeholder?: never;
          /**
           * @description Input mask (if used).
           * If provided, it takes precedence over 'placeholder' internally.
           */
          mask?: string;
      };

export type TProps = PropsWithChildren<TPropsCommon & TPropsDependent> &
    Omit<HTMLProps<HTMLInputElement>, 'placeholder' | 'onChange' | 'value'>;
