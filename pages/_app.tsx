import AsideProvider from 'context/aside'
import MessageProvider from 'context/message'
import { ModalProvider } from 'context/modal'
import { NavbarProvider } from 'context/navbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GF - Gestão Financeira</title>
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </Head>
      <AsideProvider>
        <MessageProvider>
          <ModalProvider>
            <NavbarProvider>
              <Component {...pageProps} />
            </NavbarProvider>
          </ModalProvider>
        </MessageProvider>
      </AsideProvider>
    </>
  )
}