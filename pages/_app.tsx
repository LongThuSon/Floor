// import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
// import { store } from '../redux/store'

import '../styles/globals.scss'
import '../styles/app.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider>
    //   <Component {...pageProps} />
    // </Provider>
    <Component {...pageProps} />
  )
}

export default MyApp
