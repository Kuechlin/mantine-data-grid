import {
    Button,
    MantineProvider,
    Title,
    Group,
    AppShell,
    Header,
    Avatar,
    Navbar,
    Stack,
    Text,
    NavLink,
} from '@mantine/core';
import ReactDOM from 'react-dom/client';
import {
    Book,
    BrandGithub,
    Paint,
    Rocket,
    Star,
    Table,
} from 'tabler-icons-react';

import Demo from './Demo';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
} from 'react-router-dom';
import GettingStarted from './GettingStarted';
import MainExample from './examples/MainExample';
import CustomFilterExample from './examples/CustomFilterExample';
import AsyncExample from './examples/AsyncExample';
import InitialStateExample from './examples/InitialStateExample';
import Properties from './Properties';
import Styles from './Styles';

const baseUrl = '/mantine-data-grid';

export default function App() {
    const location = useLocation();
    return (
        <AppShell
            navbar={
                <Navbar width={{ base: 200 }} height="100%">
                    <Stack spacing="xs" p="xs">
                        {[
                            {
                                color: 'yellow',
                                icon: <Star size={16} />,
                                label: 'Demo',
                                path: baseUrl + '/',
                            },
                            {
                                color: 'blue',
                                icon: <Rocket size={16} />,
                                label: 'Getting started',
                                path: baseUrl + '/getting-started',
                            },
                            {
                                color: 'gray',
                                icon: <Book size={16} />,
                                label: 'Properties',
                                path: baseUrl + '/properties',
                            },
                            {
                                color: 'purple',
                                icon: <Paint size={16} />,
                                label: 'Styles',
                                path: baseUrl + '/styles',
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
                                        sx={(t) => ({
                                            background: t.fn.themeColor(
                                                link.color,
                                                7
                                            ),
                                        })}
                                    />
                                }
                                children={link.label}
                                to={link.path}
                                variant={
                                    location.pathname == link.path
                                        ? 'filled'
                                        : 'subtle'
                                }
                                color="gray"
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
                            path: baseUrl + '/example',
                        },
                        {
                            label: 'Custom Filter',
                            path: baseUrl + '/example/custom-filter',
                        },
                        {
                            label: 'Async data',
                            path: baseUrl + '/example/async',
                        },
                        {
                            label: 'Initial State',
                            path: baseUrl + '/example/initial-state',
                        },
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            component={Link}
                            to={item.path}
                            label={item.label}
                            active={location.pathname === item.path}
                        />
                    ))}
                </Navbar>
            }
            header={
                <Header height={68}>
                    <Group align="center" p="xs">
                        <Avatar
                            children={<Table size={32} />}
                            color="blue"
                            radius="xl"
                            size={48}
                        />
                        <Title>Mantine Data Grid</Title>
                        <Button
                            children={<BrandGithub />}
                            component="a"
                            href="https://github.com/Kuechlin/mantine-data-grid"
                            target="_blank"
                            color="gray"
                        />
                    </Group>
                </Header>
            }
        >
            <Routes>
                <Route path={baseUrl + '/'} element={<Demo />} />
                <Route
                    path={baseUrl + '/getting-started'}
                    element={<GettingStarted />}
                />
                <Route
                    path={baseUrl + '/properties'}
                    element={<Properties />}
                />
                <Route path={baseUrl + '/styles'} element={<Styles />} />
                <Route path={baseUrl + '/example'} element={<MainExample />} />
                <Route
                    path={baseUrl + '/example/custom-filter'}
                    element={<CustomFilterExample />}
                />
                <Route
                    path={baseUrl + '/example/async'}
                    element={<AsyncExample />}
                />
                <Route
                    path={baseUrl + '/example/initial-state'}
                    element={<InitialStateExample />}
                />
            </Routes>
        </AppShell>
    );
}
