import cls from 'classnames/bind';
import React, { type MouseEvent } from 'react';

import { CrossIcon, Icon } from '@emingy/core/ui/basic/Icon';
import { Typography } from '@emingy/core/ui/basic/Typography';

import styles from './index.module.scss';

import { EColor, ESize } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Tag';
const cn = cls.bind(styles);

export const Tag = ({
    text,
    color = EColor.Purple,
    size = ESize.Md,
    icon,
    closable = false,
    className,
    id,
    onClick,
    onClose,
}: TProps) => {
    const handleClick = () => {
        if (typeof onClick !== 'function') {
            return;
        }

        onClick(id);
    };

    const handleCloseClick = (event: MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();

        if (typeof onClose !== 'function') {
            return;
        }

        onClose(id);
    };

    const TextNode = (() => {
        switch (size) {
            case ESize.Md:
                return Typography.Base;
            case ESize.Sm:
                return Typography.Micro;
            default:
                return Typography.Base;
        }
    })();

    return (
        <button
            className={cn(`${BLOCK_NAME}`, className, `${BLOCK_NAME}__${color}`, {
                [`${BLOCK_NAME}__small`]: size === ESize.Sm,
                [`${BLOCK_NAME}__clickable`]: typeof onClick === 'function',
            })}
            onClick={handleClick}
        >
            {icon && <Icon icon={icon} size="xs" />}
            {text && <TextNode>{text}</TextNode>}
            {closable && (
                <Icon
                    icon={CrossIcon}
                    onClick={handleCloseClick}
                    size="xs"
                    data-testid="tag-close"
                />
            )}
        </button>
    );
};

export type TTagProps = TProps;
export { EColor as ETagColor, ESize as ETagSize };
