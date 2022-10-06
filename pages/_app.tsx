import type { AppProps } from 'next/app';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';
import { Drawer } from '@components/Drawer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Drawer />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
