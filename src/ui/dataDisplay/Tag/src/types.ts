import type { TIconProps } from '@emingy/core/ui/basic/Icon';

import type { EColor, ESize } from './constants';

type TDefaultProps = {
    text?: string;
    color?: `${EColor}`;
    size?: `${ESize}`;
    icon?: TIconProps['icon'];
    className?: string;
};

type TIdTag = number | string;

type TClickProps =
    | {
          onClick: (id: TIdTag) => void;
          id: TIdTag;
      }
    | {
          onClick?: never;
          id?: TIdTag;
      };

type TCloseProps =
    | {
          onClose: (id: TIdTag) => void;
          closable: boolean;
          id: TIdTag;
      }
    | {
          onClose?: never;
          closable?: never;
          id?: TIdTag;
      };

export type TProps = TDefaultProps & TClickProps & TCloseProps;
