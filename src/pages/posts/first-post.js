import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout/layout';

export default function FirstPost() {
  return( 
    <Layout>
      <Head>
        <title>First Paaage</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
    <div>
  <h1>First Paage!</h1>
  <h2>
        <Link href="/">Back home</Link>
      </h2>
  </div>
  </Layout>
  );
}