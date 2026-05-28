export enum ETypographyType {
    Heading1 = 'heading-1',
    Heading2 = 'heading-2',
    Heading3 = 'heading-3',
    Title = 'title',
    Subtitle = 'subtitle',
    Large = 'large',
    Base = 'base',
    Small = 'small',
    Micro = 'micro',
}

export enum EAlign {
    Center = 'center',
    Right = 'right',
    Justify = 'justify',
}

export enum ETextCase {
    Uppercase = 'uppercase',
    Lowercase = 'lowercase',
    Capitalize = 'capitalize',
}

export enum EWeight {
    Medium = 'medium',
    Semibold = 'semibold',
    Bold = 'bold',
}

export const HTML_TAG_BY_TYPO_TYPE: Record<ETypographyType, React.ElementType> = {
    [ETypographyType.Heading1]: 'h1',
    [ETypographyType.Heading2]: 'h2',
    [ETypographyType.Heading3]: 'h3',
    [ETypographyType.Title]: 'p',
    [ETypographyType.Subtitle]: 'p',
    [ETypographyType.Large]: 'p',
    [ETypographyType.Base]: 'p',
    [ETypographyType.Small]: 'p',
    [ETypographyType.Micro]: 'p',
};
