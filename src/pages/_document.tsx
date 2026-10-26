import { ReactElement } from 'react';

import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

import theme from '../themes/Default.theme';
import createEmotionCache from '../utils/createEmotionCache';

/**
 * Custom Document — injects Emotion's server-side critical CSS into the HTML
 * shell to prevent a flash of unstyled content (FOUC) on first load.
 *
 * This pattern is required when using MUI/Emotion with Next.js Pages Router.
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          {/* Preconnect to Google Fonts CDN for faster font loading */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link href='https://fonts.googleapis.com/css2?family=Fruktur&display=swap' rel='stylesheet' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          {/* Critical Emotion styles extracted on the server */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & { emotionStyleTags: ReactElement[] }> {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    // Wrap the App with the server-side Emotion cache so styles are collected
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => <App emotionCache={cache} {...props} />,
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

    return { ...initialProps, emotionStyleTags };
  }
}
