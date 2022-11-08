import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Navside from '../components/Navside'
import type { AppProps } from 'next/app'
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Navbar/>
      <Navside/>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp
