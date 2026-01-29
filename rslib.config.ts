import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig } from '@rslib/core';

const isLibBuild = process.env.TYPE === 'lib';

export default defineConfig({
    lib: [
        {
            bundle: false,
            dts: isLibBuild,
            format: 'esm',
        },
    ],
    source: {
        entry: {
            index: isLibBuild
                ? [
                      './src/**',
                      '!src/storybook/**/*',
                      '!src/**/*.{stories,spec}.*',
                      '!src/**/*.{mdx,snap}',
                      '!src/**/story',
                      '!src/styles/**',
                  ]
                : ['./src/**', '!**/dist', '!**/node_modules'],
        },
    },
    output: {
        target: 'web',
        cleanDistPath: true,
        distPath: isLibBuild ? './lib' : './dist',
        copy: isLibBuild
            ? {
                  patterns: [
                      {
                          from: './src/styles',
                          to: './styles',
                          globOptions: {
                              dot: false,
                              ignore: ['**/story/**/*', '**/*.mdx', '**/*.stories.*'],
                          },
                      },
                  ],
              }
            : undefined,
    },
    plugins: [
        pluginReact(),
        pluginSass(),
        pluginSvgr({
            svgrOptions: {
                exportType: 'default',
            },
        }),
    ],
    resolve: {
        alias: {
            '@emingy/core': './src/*',
            '@storybook-components': './src/storybook/components/*',
            '@storybook-utils': './src/storybook/utils/*',
        },
    },

    tools: isLibBuild
        ? {
              rspack: (config, { mergeConfig }) => {
                  return mergeConfig(config, {
                      output: {
                          chunkFilename: '[name].[ext]',
                      },
                  });
              },
          }
        : {},
});
