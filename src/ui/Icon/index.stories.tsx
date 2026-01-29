import React, { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Flex } from '../Flex';
import { Input } from '../Input';
import { Typography } from '../Typography';

import ArrowBottomIcon from './src/svg/arrow-bottom.svg?react';
import CheckIcon from './src/svg/check.svg?react';
import CrossIcon from './src/svg/cross.svg?react';
import HomeIcon from './src/svg/home.svg?react';
import InfoIcon from './src/svg/info.svg?react';
import WarningIcon from './src/svg/warning.svg?react';
import type { TSvgComponent } from './src/types';

import { Icon, type TIconProps } from './src';

const ICONS: Record<string, TSvgComponent> = {
    ArrowBottomIcon,
    CheckIcon,
    CrossIcon,
    HomeIcon,
    InfoIcon,
    WarningIcon,
};

const meta: Meta = {
    title: 'Icon/Gallery',
    component: Icon,
    argTypes: {
        icon: { table: { disable: true } },
    },
    args: {
        size: 'lg',
        color: 'inherit',
    },
};

export default meta;

export const Gallery = (props: Omit<TIconProps, 'icon'>) => {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const filtered = Object.entries(ICONS).filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCopy = (name: string) => {
        navigator.clipboard.writeText(name);
        setCopied(name);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <Flex direction="column" gap="6x">
            <Input
                title="Icon name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 16,
                    color: 'var(--color-grey-1)',
                }}
            >
                {filtered.map(([name, SvgIcon]) => (
                    <div
                        key={name}
                        onClick={() => handleCopy(name)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                            padding: 16,
                            borderRadius: 8,
                            border: '1px solid var(--color-grey-40)',
                            cursor: 'pointer',
                            background: copied === name ? 'var(--color-grey-60)' : 'transparent',
                            transition: 'background 0.2s',
                        }}
                    >
                        <Icon {...props} icon={SvgIcon} />
                        <Typography.Small>{copied === name ? 'Copied!' : name}</Typography.Small>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && <Typography.Base>No icons found</Typography.Base>}
        </Flex>
    );
};
