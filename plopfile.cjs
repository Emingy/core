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
