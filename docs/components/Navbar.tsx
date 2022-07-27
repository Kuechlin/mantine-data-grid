import {
  Button,
  Avatar,
  Navbar as MantineNavbar,
  Stack,
  Text,
  NavLink,
  useMantineColorScheme,
} from '@mantine/core';
import {
  Book,
  Paint,
  Rocket,
  Star,
} from 'tabler-icons-react';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import { BASE_URL } from '../constants';

export default function Navbar() {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <MantineNavbar width={{ base: 200 }} height="100%">
      <Stack spacing="xs" p="xs">
        {[
          {
            color: 'orange',
            icon: <Star size={16} />,
            label: 'Demo',
            path: BASE_URL + '/',
          },
          {
            color: 'teal',
            icon: <Rocket size={16} />,
            label: 'Getting started',
            path: BASE_URL + '/getting-started',
          },
          {
            color: 'red',
            icon: <Book size={16} />,
            label: 'Properties',
            path: BASE_URL + '/properties',
          },
          {
            color: 'indigo',
            icon: <Paint size={16} />,
            label: 'Styles',
            path: BASE_URL + '/styles',
          },
        ].map((link) => (
          <Button
            key={link.path}
            component={Link}
            leftIcon={
              <Avatar
                children={link.icon}
                radius="xl"
                size="sm"
                color={link.color}
              />
            }
            children={link.label}
            to={link.path}
            variant={
              location.pathname == link.path
                ? 'filled'
                : 'subtle'
            }
            color={dark ? 'gray' : 'blue'}
            styles={{
              inner: {
                justifyContent: 'start',
              },
            }}
          />
        ))}
        <Text color="dimmed" weight="bold" size="xl">
          Examples
        </Text>
      </Stack>
      {[
        {
          label: 'Default',
          path: BASE_URL + '/example',
        },
        {
          label: 'Custom Filter',
          path: BASE_URL + '/example/custom-filter',
        },
        {
          label: 'Async data',
          path: BASE_URL + '/example/async',
        },
      ].map((item) => (
        <NavLink
          key={item.path}
          component={Link}
          to={item.path}
          label={item.label}
          active={location.pathname === item.path}
          pl="xl"
        />
      ))}
    </MantineNavbar>
  );
}
