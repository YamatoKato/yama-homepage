import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/cover-image.jpg'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicons/cover-image.jpg'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicons/cover-image.jpg'
        />
        <link rel='manifest' href='/favicons/cover-image.jpg' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
