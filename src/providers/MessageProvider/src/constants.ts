export enum EMessagePosition {
    TopLeft = 'top-left',
    TopCenter = 'top-center',
    TopRight = 'top-right',
    BottomLeft = 'bottom-left',
    BottomCenter = 'bottom-center',
    BottomRight = 'bottom-right',
}

export enum EActionType {
    Add = 'ADD',
    Remove = 'REMOVE',
    Clear = 'CLEAR',
}

export const DEFAULT_DURATION = 5000;
export const DEFAULT_POSITION = EMessagePosition.BottomRight;
