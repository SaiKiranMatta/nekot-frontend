import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
    chains: [sepolia],
    connectors: [
        // injected(),
        coinbaseWallet(),
        walletConnect({
            projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
        }),
    ],
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    transports: {
        [sepolia.id]: http(),
    },
});
