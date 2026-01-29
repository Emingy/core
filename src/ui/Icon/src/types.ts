import type { FC, SVGProps } from 'react';

import type { EColor, ESize } from './constants';

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export type TProps = {
    icon: TSvgComponent;
    size?: `${ESize}`;
    color?: `${EColor}`;
    className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'ref'>;
