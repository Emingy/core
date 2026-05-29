export enum EPosition {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right',
}

export enum ESize {
    Md = 'md',
    Sm = 'sm',
}

export enum EActionType {
    Add = 'ADD',
    Remove = 'REMOVE',
}

export const DEFAULT_SIZE = ESize.Md;
export const DEFAULT_POSITION = EPosition.Top;
export const TOOLTIP_OFFSET = 12;
