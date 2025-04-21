import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import { OnchainKitProvider } from '@coinbase/onchainkit'

const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
}

const apiKey = import.meta.env.VITE_ONCHAINKIT_API_KEY;

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <OnchainKitProvider apiKey={apiKey} chain={base}>
    <App />
  </OnchainKitProvider>
)
