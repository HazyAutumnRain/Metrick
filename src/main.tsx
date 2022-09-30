// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ChakraProvider, ComponentStyleConfig } from '@chakra-ui/react'
// import './samples/node-api'

const emotionCache = createCache({
  key: "emotion-css-cache",
  prepend: true
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CacheProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
