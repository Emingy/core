import type { Meta } from 'storybook-react-rsbuild';

import { type TTypographyProps, Typography } from './src';

const TypographyTypes = Object.keys(Typography);

const meta: Meta = {
    title: 'UI/Typography',
    component: Typography.Base,
    argTypes: {
        type: {
            control: 'select',
            options: TypographyTypes,
        },
        children: { control: 'text' },
        weight: { control: 'inline-radio', options: [undefined, 'medium', 'semibold', 'bold'] },
        isItalic: { control: 'boolean' },
        align: { control: 'inline-radio', options: [undefined, 'center', 'right', 'justify'] },
        isTruncated: { control: 'boolean' },
        maxLines: { control: { type: 'number', min: 1, max: 100, step: 1 } },
        textCase: {
            control: 'inline-radio',
            options: [undefined, 'uppercase', 'lowercase', 'capitalize'],
        },
    },
    args: {
        type: TypographyTypes[0],
        children: 'Lorem ipsum',
        weight: undefined,
        isItalic: false,
        align: undefined,
        isTruncated: false,
        maxLines: undefined,
        textCase: undefined,
    },
};

export default meta;

export const Demo = ({
    type,
    ...rest
}: { type: keyof typeof Typography } & TTypographyProps<'p'>) => {
    return Typography[type](rest);
};
