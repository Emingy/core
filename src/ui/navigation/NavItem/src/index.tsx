import cls from 'classnames/bind';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ArrowBottomIcon, Icon } from '@emingy/core/ui/basic/Icon';
import { Typography } from '@emingy/core/ui/basic/Typography';
import { Badge } from '@emingy/core/ui/dataDisplay/Badge';
import { Tag } from '@emingy/core/ui/dataDisplay/Tag';
import { Dropdown } from '@emingy/core/ui/layout/Dropdown';
import { isExternalUrl } from '@emingy/core/utils/isExternalUrl';
import { omitProp } from '@emingy/core/utils/omitProp';

import styles from './index.module.scss';

import type { TNavItemAsButtonProps, TNavItemAsLinkProps, TProps } from './types';

const BLOCK_NAME = 'NavItem';
const cn = cls.bind(styles);

const NavItemContent = ({
    prefix,
    label,
    tags,
    badge,
    subItems,
}: Pick<TProps, 'prefix' | 'label' | 'tags' | 'badge' | 'subItems'>) => (
    <>
        {prefix && <span className={cn(`${BLOCK_NAME}__prefix`)}>{prefix}</span>}
        <Typography.Large elementType="span" className={cn(`${BLOCK_NAME}__label`)}>
            {label}
        </Typography.Large>
        {tags && tags.length > 0 && (
            <span className={cn(`${BLOCK_NAME}__tags`)}>
                {tags.map((tag, index) => (
                    <Tag key={tag.id ?? index} size="sm" {...tag} />
                ))}
            </span>
        )}
        {badge && <Badge {...badge} className={cn(`${BLOCK_NAME}__badge`)} />}
        {subItems && subItems.length > 0 && (
            <Icon icon={ArrowBottomIcon} size="sm" className={cn(`${BLOCK_NAME}__chevron`)} />
        )}
    </>
);

const NavItemAsButton = ({
    onClick,
    prefix,
    label,
    tags,
    badge,
    subItems,
    active,
    disabled,
    className,
    style,
    ...restProps
}: TNavItemAsButtonProps) => (
    <button
        {...restProps}
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={style}
        className={cn(BLOCK_NAME, className, {
            [`${BLOCK_NAME}__active`]: active,
            [`${BLOCK_NAME}__disabled`]: disabled,
        })}
    >
        <NavItemContent
            prefix={prefix}
            label={label}
            tags={tags}
            badge={badge}
            subItems={subItems}
        />
    </button>
);

const NavItemAsLink = ({
    to,
    prefix,
    label,
    tags,
    badge,
    subItems,
    active,
    disabled,
    className,
    style,
    ...restProps
}: TNavItemAsLinkProps) => (
    <a
        {...restProps}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className={cn(BLOCK_NAME, className, {
            [`${BLOCK_NAME}__active`]: active,
            [`${BLOCK_NAME}__disabled`]: disabled,
        })}
    >
        <NavItemContent
            prefix={prefix}
            label={label}
            tags={tags}
            badge={badge}
            subItems={subItems}
        />
    </a>
);

const NavItemAsNavLink = ({
    to,
    prefix,
    label,
    tags,
    badge,
    subItems,
    active,
    disabled,
    className,
    style,
    ...restProps
}: TNavItemAsLinkProps) => (
    <NavLink
        {...restProps}
        to={to}
        style={style}
        className={({ isActive }) =>
            cn(BLOCK_NAME, className, {
                [`${BLOCK_NAME}__active`]: active ?? isActive,
                [`${BLOCK_NAME}__disabled`]: disabled,
            })
        }
    >
        <NavItemContent
            prefix={prefix}
            label={label}
            tags={tags}
            badge={badge}
            subItems={subItems}
        />
    </NavLink>
);

export const NavItem = (props: TProps) => {
    const { subItems } = props;

    const trigger = (() => {
        if (props.onClick) {
            return <NavItemAsButton {...omitProp(props, 'containerRef')} onClick={props.onClick} />;
        }

        if (isExternalUrl(props.to)) {
            return <NavItemAsLink {...omitProp(props, 'containerRef')} to={props.to} />;
        }

        return <NavItemAsNavLink {...omitProp(props, 'containerRef')} to={props.to} />;
    })();

    if (!subItems || subItems.length === 0) {
        return trigger;
    }

    return (
        <Dropdown
            triggerMode={['hover']}
            direction="right"
            widthMode="content"
            containerRef={props.containerRef}
            content={(panelRef) =>
                subItems.map((subItem, index) => (
                    <NavItem key={subItem.to ?? index} {...subItem} containerRef={panelRef} />
                ))
            }
        >
            {trigger}
        </Dropdown>
    );
};

export type TNavItemProps = TProps;
