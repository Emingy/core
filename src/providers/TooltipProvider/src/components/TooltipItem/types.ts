import type { TTooltipItem } from '../../types';

export type TProps = {
    item: TTooltipItem;
    isExiting: boolean;
    onRemove: (id: string) => void;
};
