import { Stack, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';

export default function GettingStarted() {
  return (
    <Stack p="md">
      <Title order={2}>Install</Title>
      <Text>With npm</Text>
      <Prism language="bash" children="npm i mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs" />
      <Text>With pnpm</Text>
      <Prism language="bash" children="pnpm add mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs" />
      <Text>Usage</Text>
      <Prism withLineNumbers language="tsx" children={code} />
    </Stack>
  );
}

const code = `import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            columns={/* column definitions */}
        />
    );
}`;
