import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, ReactNode } from 'react';
import type { NavigateOptions } from 'react-router-dom';

import type { ESize, EType } from './constants';

type TButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type TPropsCommon = {
    size?: `${ESize}`;
    type?: `${EType}`;
    disabled?: boolean;
    htmlType?: TButtonProps['type'];
    prefix?: ReactNode;
    postfix?: ReactNode;
    splitted?: boolean;
    href?: string;
    navigateOptions?: NavigateOptions;
    className?: string;
};

export type TProps = PropsWithChildren<TPropsCommon> &
    Omit<TButtonProps, 'type' | 'disabled' | 'children'>;
