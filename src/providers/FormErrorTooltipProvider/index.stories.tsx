import React from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Checkbox } from '@emingy/core/ui/controls/Checkbox';
import { Input } from '@emingy/core/ui/controls/Input';
import { Flex } from '@emingy/core/ui/layout/Flex';

type TDemoArgs = {
    nameError: boolean;
    emailError: boolean;
    termsError: boolean;
};

const FormDemo = ({ nameError, emailError, termsError }: TDemoArgs) => (
    <Flex direction="column" gap="6x" style={{ maxWidth: 320 }}>
        <Input title="Name" name="name" error={nameError ? 'Name is required' : undefined} />
        <Input
            title="Email"
            name="email"
            error={emailError ? 'Enter a valid email address' : undefined}
        />
        <Checkbox
            name="terms"
            label="I agree to the terms"
            error={termsError ? 'You must agree to continue' : undefined}
        />
    </Flex>
);

const meta: Meta = {
    title: 'Providers/FormErrorTooltipProvider',
    component: FormDemo,
    argTypes: {
        nameError: {
            type: 'boolean',
        },
        emailError: {
            type: 'boolean',
        },
        termsError: {
            type: 'boolean',
        },
    },
    args: {
        nameError: true,
        emailError: false,
        termsError: false,
    },
};

export default meta;

export const Demo = (props: TDemoArgs) => <FormDemo {...props} />;
