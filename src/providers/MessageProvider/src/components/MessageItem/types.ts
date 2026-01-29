import type { EMessagePosition } from '../../constants';
import type { TMessageItem } from '../../types';

export type TProps = {
    item: TMessageItem;
    position: `${EMessagePosition}`;
    onRemove: (id: string) => void;
};
