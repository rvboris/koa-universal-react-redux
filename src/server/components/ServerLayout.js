import React from 'react';
import env, { config, filter } from '../../shared/env';

export default function ServerLayout({ initialState, body, assets, locale, title, description }) {
  const inlineScript = [
    `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`,
    `window.__NODE_ENV__ = ${JSON.stringify(env)}`,
    `window.__CONFIG__ = ${JSON.stringify(filter(config))}`,
  ];
  return (
    <html lang={ locale }>
      <head>
        <meta name="description" content={ description }/>
        <meta charSet="utf-8"/>

        <link rel="icon" type="image/ico" href="/favicon.ico" />

        { assets.style.map((href, idx) => <link key={ idx } rel="stylesheet" href={ href } />) }

        <title>{ title }</title>

        <script dangerouslySetInnerHTML={{ __html: inlineScript.join(';') }}></script>
      </head>

      <body>
        <div id="body" dangerouslySetInnerHTML={ { __html: body } } />

        { assets.script.map((src, idx) => <script key={ idx } src={ src } />)}
      </body>
    </html>
  );
}
