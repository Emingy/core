import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, ReactNode } from 'react';
import type { NavigateOptions } from 'react-router-dom';

import type { TIcon } from '@emingy/core/ui/Icon';

import type { ESize, EType } from './constants';

type TButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type TPropsCommon = {
    size?: `${ESize}`;
    type?: `${EType}`;
    disabled?: boolean;
    htmlType?: TButtonProps['type'];
    prefix?: ReactNode;
    postfix?: ReactNode;
    splitted?: boolean;
    isLoading?: boolean;
    href?: string;
    navigateOptions?: NavigateOptions;
    isFullWidth?: boolean;
    className?: string;
    icon?: TIcon;
};

export type TProps = PropsWithChildren<TPropsCommon> &
    Omit<TButtonProps, 'type' | 'disabled' | 'children'>;
