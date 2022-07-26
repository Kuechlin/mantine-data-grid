import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MantineProvider
            theme={{ colorScheme: 'dark' }}
            withGlobalStyles
            withNormalizeCSS
        >
            <App />
        </MantineProvider>
    </BrowserRouter>
);
