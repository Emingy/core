import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig } from '@rstest/core';

export default defineConfig({
    plugins: [
        pluginReact({
            swcReactOptions: {
                runtime: 'classic',
            },
        }),
        pluginSass(),
        pluginSvgr({
            svgrOptions: {
                exportType: 'default',
            },
        }),
    ],
    testEnvironment: 'jsdom',
    globals: true,
    setupFiles: ['./rstest.setup.ts'],

    coverage: {
        enabled: true,
        provider: 'istanbul',
        thresholds: {
            lines: 90,
            functions: 90,
        },
    },
});
