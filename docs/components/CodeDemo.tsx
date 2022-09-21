import { Tabs } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { ReactNode } from 'react';
import { Code, Components } from 'tabler-icons-react';

export default function CodeDemo({ code, children }: { code: string; children: ReactNode }) {
  return (
    <Tabs variant="pills" defaultValue="comp">
      <Tabs.List position="right">
        <Tabs.Tab value="comp" icon={<Components />} children="Component" />
        <Tabs.Tab value="code" children="Code" icon={<Code />} />
      </Tabs.List>
      <Tabs.Panel value="comp" pt="sm">
        {children}
      </Tabs.Panel>
      <Tabs.Panel value="code" pt="sm">
        <Prism withLineNumbers language="tsx" children={code.replace('../../../src', 'mantine-data-grid')} />
      </Tabs.Panel>
    </Tabs>
  );
}
