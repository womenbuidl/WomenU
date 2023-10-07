import React from 'react';
import Head from 'next/head';

export function CustomHead(params) {
  return (
    <Head>
      <title>WomenU</title>
      <meta name="description" content="WomenU" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
