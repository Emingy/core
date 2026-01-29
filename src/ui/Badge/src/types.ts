import type { EType } from './constants';

export type TProps = {
    value: number | string;
    type?: `${EType}`;
    className?: string;
};