import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',

    fullyParallel: true,
    retries: 2,

    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 2,
            threshold: 0.1,
        },
    },

    use: {
        baseURL: 'http://127.0.0.1:3000',
        viewport: {
            width: 1280,
            height: 720,
        },
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'on-first-retry',
    },

    webServer: {
        command: 'pnpm storybook',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
    },
});
