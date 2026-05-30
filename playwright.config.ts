import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',

    fullyParallel: true,

    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 1,
            threshold: 0.05,
        },
    },

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
