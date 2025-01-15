import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';

import theme from '../themes/Default.theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Fruktur&display=swap" rel="stylesheet" /> 
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            {this.props.emotionStyleTags}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
 
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
  });
 
  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
    key={style.key}
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
 
  return {
    ...initialProps,
    emotionStyleTags,
  }
}