export enum EDirection {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right',
}

export enum ETriggerMode {
    Click = 'click',
    Hover = 'hover',
}

export enum EWidthMode {
    Trigger = 'trigger',
    Content = 'content',
}

export const DEFAULT_DIRECTION = EDirection.Bottom;
export const DEFAULT_TRIGGER_MODE: `${ETriggerMode}`[] = [ETriggerMode.Click];
export const DEFAULT_WIDTH_MODE = EWidthMode.Trigger;
export const DROPDOWN_OFFSET = 8;
export const HOVER_CLOSE_DELAY = 150;
