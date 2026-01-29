import cls from 'classnames/bind';
import React from 'react';

import { CheckIcon, CrossIcon, Icon, WarningIcon } from '@emingy/core/ui/Icon';

import { EType } from '../../constants';

import styles from './index.module.scss';

import type { TProps } from './types.ts';

const BLOCK_NAME = 'StatusIndicator';
const cn = cls.bind(styles);

export const StatusIndicator = ({ type }: TProps) => {
    const getIcon = () => {
        switch (type) {
            case EType.Success:
                return CheckIcon;
            case EType.Warning:
                return WarningIcon;
            default:
                return CrossIcon;
        }
    };

    return (
        <div
            className={cn(`${BLOCK_NAME}`, {
                [`${BLOCK_NAME}__success`]: type === EType.Success,
                [`${BLOCK_NAME}__warning`]: type === EType.Warning,
                [`${BLOCK_NAME}__error`]: type === EType.Error,
            })}
        >
            <Icon icon={getIcon()} size="sm" />
        </div>
    );
};

export type TStatusIndicatorProps = TProps;
