import cls from 'classnames/bind';
import React, { type ElementType, type ReactNode, useRef } from 'react';

import { Tooltip } from '@emingy/core/ui/dataDisplay/Tooltip';

import { useIsTruncated } from './hooks/useIsTruncated';

import styles from './index.module.scss';

import { ETypographyType, HTML_TAG_BY_TYPO_TYPE } from './constants';
import type { TProps } from './types';

const BLOCK_NAME = 'Typography';
const cn = cls.bind(styles);

const getTypographyNodeByType =
    <T extends ElementType>(type: ETypographyType): ((props: TProps<T>) => ReactNode) =>
    ({
        weight,
        className,
        elementType,
        isItalic,
        align,
        isTruncated,
        maxLines,
        textCase,
        children,
        ...restProps
    }: TProps<T>) => {
        const Tag = elementType ?? HTML_TAG_BY_TYPO_TYPE[type];
        const ref = useRef<HTMLElement>(null);
        const isTextTruncated = useIsTruncated({ ref, isTruncated, maxLines, children });

        const typographyNode = (() => {
            return (
                <Tag
                    {...restProps}
                    ref={ref}
                    className={cn(`${BLOCK_NAME}`, `${BLOCK_NAME}--type-${type}`, className, {
                        [`${BLOCK_NAME}--italic`]: isItalic,
                        [`${BLOCK_NAME}--truncated`]: isTruncated,
                        [`${BLOCK_NAME}--align-${align}`]: align,
                        [`${BLOCK_NAME}--case-${textCase}`]: textCase,
                        [`${BLOCK_NAME}--weight-${weight}`]: weight,
                    })}
                    style={
                        maxLines && !isTruncated
                            ? {
                                  WebkitLineClamp: maxLines,
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                              }
                            : undefined
                    }
                >
                    {children}
                </Tag>
            );
        })();

        if (isTextTruncated) {
            return <Tooltip text={children}>{typographyNode}</Tooltip>;
        }

        return typographyNode;
    };

export const Typography = {
    Heading1: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Heading1]>(
        ETypographyType.Heading1
    ),
    Heading2: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Heading2]>(
        ETypographyType.Heading2
    ),
    Heading3: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Heading3]>(
        ETypographyType.Heading3
    ),
    Title: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Title]>(
        ETypographyType.Title
    ),
    Subtitle: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Subtitle]>(
        ETypographyType.Subtitle
    ),
    Large: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Large]>(
        ETypographyType.Large
    ),
    Base: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Base]>(
        ETypographyType.Base
    ),
    Small: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Small]>(
        ETypographyType.Small
    ),
    Micro: getTypographyNodeByType<(typeof HTML_TAG_BY_TYPO_TYPE)[ETypographyType.Micro]>(
        ETypographyType.Micro
    ),
};

export type TTypographyProps<T extends ElementType> = TProps<T>;
