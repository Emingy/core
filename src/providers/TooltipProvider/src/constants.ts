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

export enum EType {
    Default = 'default',
    Error = 'error',
}

export enum EActionType {
    Add = 'ADD',
    Remove = 'REMOVE',
}

export const DEFAULT_SIZE = ESize.Md;
export const DEFAULT_POSITION = EPosition.Top;
export const DEFAULT_TYPE = EType.Default;
export const TOOLTIP_OFFSET = 12;
export const VIEWPORT_EDGE_PADDING = 8;
