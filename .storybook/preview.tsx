import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from 'storybook-react-rsbuild';

import { AppProvider, PageWrapper } from '@emingy/core/ui';

import './preview.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <AppProvider>
                <PageWrapper>
                    <MemoryRouter>
                        <Story />
                    </MemoryRouter>
                </PageWrapper>
            </AppProvider>
        ),
    ],
};

export default preview;
