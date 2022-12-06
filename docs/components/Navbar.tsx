import {
  Button,
  Avatar,
  Navbar as MantineNavbar,
  Stack,
  Text,
  NavLink,
  useMantineColorScheme,
  ScrollArea,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { pages, examples } from '../pages';

export default function Navbar() {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <MantineNavbar width={{ base: 200 }} height="100%">
      <Stack spacing="xs" p="xs">
        {pages.map(({ path, icon: Icon, color, label }) => (
          <Button
            key={path}
            component={Link}
            leftIcon={<Avatar children={<Icon size={16} />} radius="xl" size="sm" color={color} />}
            children={label}
            to={path}
            variant={location.pathname == path ? 'filled' : 'subtle'}
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
      <ScrollArea sx={{ paddingBottom: '80px' }}>
        {Object.values(examples).map((item) => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            active={location.pathname === item.path}
            pl="xl"
          />
        ))}
      </ScrollArea>
    </MantineNavbar>
  );
}
