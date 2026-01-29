import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from 'storybook-react-rsbuild';

import { AppProvider } from '@emingy/core/providers';
import { PageWrapper } from '@emingy/core/ui';

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
            <MemoryRouter>
                <AppProvider>
                    <PageWrapper>
                        <Story />
                    </PageWrapper>
                </AppProvider>
            </MemoryRouter>
        ),
    ],
};

export default preview;
