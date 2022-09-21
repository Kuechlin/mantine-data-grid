import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { examples, pages } from './pages';
import CodeDemo from './components/CodeDemo';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell navbar={<Navbar />} header={<Header />}>
          <Routes>
            {pages.map(({ path, element: Element }, i) => (
              <Route key={i} path={path} element={<Element />} />
            ))}
            {Object.values(examples).map(({ path, element: Example, code }, i) => (
              <Route
                key={i}
                path={path}
                element={
                  <CodeDemo code={code}>
                    <Example />
                  </CodeDemo>
                }
              />
            ))}
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
