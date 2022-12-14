import { ColorModeScript, Switch } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from 'styles/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Switch onChange={console.log} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
