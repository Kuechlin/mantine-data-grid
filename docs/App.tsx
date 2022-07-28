import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import Routes from './pages/Routes';
import Navbar from './components/Navbar';
import Header from './components/Header';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell navbar={<Navbar />} header={<Header />}>
          <Routes />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
