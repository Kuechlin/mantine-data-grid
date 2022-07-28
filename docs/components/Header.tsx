import {
  Button,
  Title,
  Group,
  Header as HeaderMantine,
  Avatar,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core';

import {
  BrandGithub,
  MoonStars,
  Sun,
  Table,
} from 'tabler-icons-react';

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <HeaderMantine height={68}>
      <Group position="apart" align="center" p="xs">
        <Group align="center">
          <Avatar
            children={<Table size={32} />}
            color="blue"
            radius="xl"
            size={48}
          />
          <Title>Mantine Data Grid</Title>
        </Group>
        <Group align="center">
          <a
            href="https://www.npmjs.com/package/mantine-data-grid"
            target="_blank"
            rel="noopener noreferrer">
            <img src="https://img.shields.io/npm/v/mantine-data-grid?style=flat-square" />
          </a>

          <ActionIcon variant="default" size="lg"
            component="a"
            href="https://github.com/Kuechlin/mantine-data-grid"
            target="_blank"
            rel="noopener noreferrer">
            <BrandGithub size={16} />
          </ActionIcon>

          <ActionIcon variant="default" onClick={() => toggleColorScheme()} size="lg">
            {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
        </Group>
      </Group>
    </HeaderMantine>
  );
}
