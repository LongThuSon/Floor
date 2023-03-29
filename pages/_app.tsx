import type { AppProps } from 'next/app';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import '../styles/globals.scss';
import '../styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
};

export default MyApp;
