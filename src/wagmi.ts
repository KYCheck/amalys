import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { type Chain } from 'viem'

export const xrplevm = {
  id: 1440002,
  name: "XRPL EVM Sidechain Devnet",
  nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
  },
  blockExplorers: {
    default: { name: 'evm-sidechain', url: 'https://evm-sidechain.xrpl.org' },
  },
} as const satisfies Chain

export const config = createConfig({
  chains: [xrplevm,sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
  ],
  ssr: true,
  transports: {
    [xrplevm.id]: http(),
    [sepolia.id]: http(),
  },
})


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}