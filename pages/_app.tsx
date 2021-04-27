import { AppProps, Container } from 'next/app'
import React from "react"

const App = ({ Component, pageProps }: AppProps) => (
  <Container>
    <Component {...pageProps} />
  </Container>
)

export default App
