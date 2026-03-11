import { getRootCssVariables } from '@storybook-utils/getRootCssVariables';

type TColorGroup = Array<{
    groupName: string;
    vars: Array<{
        name: string;
        value: string;
    }>;
}>;

export const getColorGroups = (): TColorGroup => {
    const cssVars = getRootCssVariables();
    const colorVarKeys = Object.keys(cssVars).filter((key) => key.includes('--color-'));
    const sortedColorVarKeys = colorVarKeys.sort((currentColor, nextColor) => {
        const currentColorCode = currentColor.match(/--color-\w+-(\d+)/)?.[1];
        const nextColorCode = nextColor.match(/--color-\w+-(\d+)/)?.[1];

        return Number(currentColorCode) - Number(nextColorCode);
    });

    const colorGroupNames = sortedColorVarKeys.reduce((colorGroupName: string[], colorVarKey) => {
        const matchWithTransparent = colorVarKey.match(/--color-(\w+)-(\w+)-(\w+)$/);
        const match = colorVarKey.match(/--color-(\w+)-(\w+)$/);

        const currentGroupName = matchWithTransparent?.[3]
            ? `${matchWithTransparent?.[1]}-${matchWithTransparent?.[3]}`
            : match?.[1];

        if (currentGroupName && !colorGroupName.includes(currentGroupName)) {
            return [...colorGroupName, currentGroupName];
        }

        return colorGroupName;
    }, []);

    return colorGroupNames.reduce((colors: TColorGroup, colorGroupName) => {
        return [
            ...colors,
            {
                groupName: colorGroupName,
                vars: colorVarKeys.reduce(
                    (
                        currentVars: Array<{
                            name: string;
                            value: string;
                        }>,
                        varKey
                    ) => {
                        if (colorGroupName.match(/(\w+)-(\w+)/)) {
                            const [colorName, opacity] = colorGroupName.split('-');

                            if (new RegExp(`--color-${colorName}-\\w+-${opacity}`).test(varKey)) {
                                return [
                                    ...currentVars,
                                    {
                                        name: varKey,
                                        value: cssVars[varKey],
                                    },
                                ];
                            }
                        }

                        if (new RegExp(`--color-${colorGroupName}-`).test(varKey)) {
                            return [
                                ...currentVars,
                                {
                                    name: varKey,
                                    value: cssVars[varKey],
                                },
                            ];
                        }

                        return currentVars;
                    },
                    []
                ),
            },
        ];
    }, []);
};
