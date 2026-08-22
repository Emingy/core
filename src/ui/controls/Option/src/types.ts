import type { PropsWithChildren, ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

import type { EElement, EType } from './constants';

type TPropsCommon = {
    id?: string;
    type?: `${EType}`;
    isDisabled?: boolean;
    className?: string;
    prefix?: ReactNode;
    description?: string;
};

type TPropsDependent =
    | {
          element?: `${EElement.Checkbox}`;
          isSelected?: boolean;
          onSelect?: VoidFunction;
          onClick?: never;
          to?: never;
      }
    | {
          element: `${EElement.Button}`;
          onClick?: VoidFunction;
          isSelected?: never;
          onSelect?: never;
          to?: never;
      }
    | {
          element: `${EElement.Link}`;
          to: LinkProps['to'];
          onClick?: VoidFunction;
          isSelected?: never;
          onSelect?: never;
      };

export type TProps = PropsWithChildren<TPropsCommon & TPropsDependent>;
