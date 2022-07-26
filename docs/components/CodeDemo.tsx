import { Card, Tabs } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
import { ReactNode, useState } from 'react';
import { Code, Components } from 'tabler-icons-react';

export default function CodeDemo({
    code,
    children,
}: {
    code: string;
    children: ReactNode;
}) {
    return (
        <Tabs variant="pills" defaultValue="comp" color="gray">
            <Tabs.List position="center" grow>
                <Tabs.Tab
                    value="comp"
                    icon={<Components />}
                    children="Component"
                />
                <Tabs.Tab value="code" children="Code" icon={<Code />} />
            </Tabs.List>
            <Tabs.Panel value="comp" pt="sm">
                {children}
            </Tabs.Panel>
            <Tabs.Panel value="code" pt="sm">
                <Prism withLineNumbers language="tsx" children={code} />
            </Tabs.Panel>
        </Tabs>
    );
}
