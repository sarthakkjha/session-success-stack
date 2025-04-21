import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'wagmi/chains'
import '@coinbase/onchainkit/styles.css'

const apiKey = '50nxcTUdTaPUUa1TQQAPGd9hegjoereD';

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <OnchainKitProvider apiKey={apiKey} chain={base}>
    <App />
  </OnchainKitProvider>
)
