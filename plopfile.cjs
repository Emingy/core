module.exports = function (plop) {
    plop.setGenerator('ui-component', {
        description: 'Create ui component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name (example Button)',
            },
        ],

        actions: [
            {
                type: 'addMany',
                base: '.plop-templates/UIComponent',
                destination: 'src/ui/{{pascalCase name}}',
                templateFiles: '.plop-templates/UIComponent/**/*.hbs',
            },
        ],
    });

    plop.setGenerator('icon', {
        description: 'Create SVG icon file and register export',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Icon name (example: arrow-left)',
            },
            {
                type: 'editor',
                name: 'svg',
                message: 'Paste SVG code',
            },
        ],

        actions: [
            {
                type: 'add',
                path: 'src/ui/Icon/src/svg/{{kebabCase name}}.svg',
                template: '{{{svg}}}',
                transform: (content) =>
                    content.replace(
                        /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
                        'currentColor',
                    ),
            },
            {
                type: 'append',
                path: 'src/ui/Icon/index.ts',
                template:
                    "export { default as {{pascalCase name}}Icon } from './src/svg/{{kebabCase name}}.svg?react';",
            },
            {
                type: 'append',
                path: 'src/ui/Icon/index.stories.tsx',
                pattern: /import \w+Icon from '\.\/src\/svg\/.+\.svg\?react';/,
                template:
                    "import {{pascalCase name}}Icon from './src/svg/{{kebabCase name}}.svg?react';",
            },
            {
                type: 'append',
                path: 'src/ui/Icon/index.stories.tsx',
                pattern: /^\s+\w+Icon,$/m,
                template: '    {{pascalCase name}}Icon,',
            },
        ],
    });

    plop.setGenerator('styles-variable', {
        description: 'Create styles variable',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Variable group name (example Colors)',
            },
        ],

        actions: [
            {
                type: 'addMany',
                base: '.plop-templates/styles/Variable',
                destination: 'src/styles/variables/{{camelCase name}}',
                templateFiles: '.plop-templates/styles/Variable/**/*.hbs',
            },
        ],
    });

    plop.setGenerator('styles-mixin', {
        description: 'Create styles mixin',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Mixin group name (example Colors)',
            },
        ],

        actions: [
            {
                type: 'addMany',
                base: '.plop-templates/styles/Mixin',
                destination: 'src/styles/mixins/{{camelCase name}}',
                templateFiles: '.plop-templates/styles/Mixin/**/*.hbs',
            },
        ],
    });

    plop.setGenerator('hook', {
        description: 'Create hook',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Hook name (example useDeviceType)',
            },
        ],

        actions: [
            {
                type: 'addMany',
                base: '.plop-templates/hook',
                destination: 'src/hooks/{{camelCase name}}',
                templateFiles: '.plop-templates/hook/**/*.hbs',
            },
        ],
    });
};
