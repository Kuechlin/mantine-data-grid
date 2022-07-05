import {
    Button,
    Center,
    MantineProvider,
    Stack,
    Title,
    Paper,
    Tabs,
    Container,
    Grid,
    Space,
    Group,
} from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrandGithub } from 'tabler-icons-react';
import Demo from './components/Demo';
import Code from './components/Code';
import Documentation from './components/Documentation';
import Properties from './components/Properties';
import Styles from './components/Styles';
import { useHash } from '@mantine/hooks';

const tabs = ['#demo', '#docs', '#props', '#styles'];

function Main() {
    const [hash, setHash] = useHash();

    return (
        <Grid justify="center" gutter={24} m={0}>
            <Grid.Col span={12}>
                <Center>
                    <Group>
                        <Title>Mantine Data Grid</Title>
                        <Button
                            children={<BrandGithub />}
                            component="a"
                            href="https://github.com/Kuechlin/mantine-data-grid"
                            target="_blank"
                            color="gray"
                        />
                    </Group>
                </Center>
            </Grid.Col>
            <Grid.Col md={12} lg={10}>
                <Paper withBorder>
                    <Tabs
                        active={hash ? tabs.findIndex((x) => x === hash) : 0}
                        onTabChange={(i) => setHash(tabs[i])}
                        styles={(theme) => ({
                            tabLabel: {
                                fontWeight: 'bold',
                                fontSize: theme.fontSizes.xl,
                            },
                            tabControl: {
                                height: '56px',
                            },
                        })}
                        tabPadding={0}
                        grow
                    >
                        <Tabs.Tab label="Demo">
                            <Demo />
                        </Tabs.Tab>
                        <Tabs.Tab label="Documentation">
                            <Documentation />
                        </Tabs.Tab>
                        <Tabs.Tab label="Component props">
                            <Properties />
                        </Tabs.Tab>
                        <Tabs.Tab label="Styles API">
                            <Styles />
                        </Tabs.Tab>
                    </Tabs>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider
            theme={{ colorScheme: 'dark' }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Main />
        </MantineProvider>
    </React.StrictMode>
);
