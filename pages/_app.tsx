import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';

import { SnackbarProvider } from 'notistack';

import { lightTheme, darkTheme } from '../themes';
// import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={2}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
