import React, { useRef } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { Button } from '@emingy/core/ui/Button';
import { Flex } from '@emingy/core/ui/Flex';
import { Typography } from '@emingy/core/ui/Typography';

import { useMessage } from './src';

const Content = () => {
    const message = useMessage();
    const idRef = useRef<string | null>(null);
    let counter = 0;

    return (
        <Flex direction="column" gap="6x">
            <Flex direction="column" gap="2x">
                <Typography.Subtitle>Message types</Typography.Subtitle>
                <Flex direction="row" gap="4x">
                    <Button
                        type="primary"
                        onClick={() =>
                            message.success({
                                title: 'Success',
                                content: 'Operation completed successfully.',
                            })
                        }
                    >
                        Success
                    </Button>
                    <Button
                        type="outlined"
                        onClick={() =>
                            message.warning({
                                title: 'Warning',
                                content: 'Please check your input.',
                            })
                        }
                    >
                        Warning
                    </Button>
                    <Button
                        type="alert"
                        onClick={() =>
                            message.error({
                                title: 'Error',
                                content: 'Something went wrong.',
                            })
                        }
                    >
                        Error
                    </Button>
                </Flex>
            </Flex>

            <Flex direction="column" gap="2x">
                <Typography.Subtitle>Without title</Typography.Subtitle>
                <Flex direction="row" gap="4x">
                    <Button type="primary" onClick={() => message.success({ content: 'Saved.' })}>
                        Success
                    </Button>
                    <Button
                        type="outlined"
                        onClick={() => message.warning({ content: 'Check your connection.' })}
                    >
                        Warning
                    </Button>
                    <Button
                        type="alert"
                        onClick={() => message.error({ content: 'Request failed.' })}
                    >
                        Error
                    </Button>
                </Flex>
            </Flex>

            <Flex direction="column" gap="2x">
                <Typography.Subtitle>Custom duration</Typography.Subtitle>
                <Flex direction="row" gap="4x">
                    <Button
                        type="primary"
                        onClick={() =>
                            message.success({
                                content: 'Disappears in 1 second.',
                                duration: 1000,
                            })
                        }
                    >
                        1s duration
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            message.success({
                                content: 'Disappears in 10 seconds.',
                                duration: 10000,
                            })
                        }
                    >
                        10s duration
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            message.success({
                                content: 'Will not auto-dismiss. Close manually.',
                                duration: 0,
                            })
                        }
                    >
                        No auto-dismiss
                    </Button>
                </Flex>
            </Flex>

            <Flex direction="column" gap="2x">
                <Typography.Subtitle>Manual close</Typography.Subtitle>
                <Flex direction="row" gap="4x">
                    <Button
                        type="primary"
                        onClick={() => {
                            idRef.current = message.success({
                                title: 'Persistent',
                                content: 'Close me with the button below.',
                                duration: 0,
                            });
                        }}
                    >
                        Show message
                    </Button>
                    <Button
                        type="outlined"
                        onClick={() => {
                            if (idRef.current) {
                                message.close(idRef.current);
                                idRef.current = null;
                            }
                        }}
                    >
                        Close by ID
                    </Button>
                    <Button type="alert" onClick={() => message.closeAll()}>
                        Close all
                    </Button>
                </Flex>
            </Flex>

            <Flex direction="column" gap="2x">
                <Typography.Subtitle>Stacking</Typography.Subtitle>
                <Button
                    type="primary"
                    onClick={() => {
                        counter++;
                        message.success({
                            title: `Message #${counter}`,
                            content: `This is message number ${counter}.`,
                        });
                    }}
                >
                    Add message
                </Button>
            </Flex>
        </Flex>
    );
};

const meta: Meta = {
    title: 'Hooks/useMessage',
    component: Content,
};

export default meta;

export const Demo = {};
