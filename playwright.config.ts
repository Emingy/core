import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',

    fullyParallel: true,

    use: {
        baseURL: 'http://127.0.0.1:3000',
        viewport: {
            width: 1280,
            height: 720,
        },
    },

    webServer: {
        command: 'pnpm storybook',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
    },
});
