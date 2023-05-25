import { Tabs } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { IconCode, IconComponents } from '@tabler/icons-react';
import { ReactNode } from 'react';

export default function CodeDemo({ code, children }: { code: string; children: ReactNode }) {
  return (
    <Tabs variant="pills" defaultValue="comp">
      <Tabs.List position="right">
        <Tabs.Tab value="comp" icon={<IconComponents />} children="Component" />
        <Tabs.Tab value="code" children="Code" icon={<IconCode />} />
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
