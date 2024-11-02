"use client";

import { config } from "@/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

export function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
