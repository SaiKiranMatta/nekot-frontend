import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { Providers } from "./providers";
import WalletNavbar from "@/components/WalletNavbar";
import { config } from "@/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nekot tokeN",
    description: "TeneT of Tokens",
};

export default async function RootLayout(props: { children: ReactNode }) {
    const headersList = await headers();
    const initialState = await cookieToInitialState(
        config,
        headersList.get("cookie")
    );
    return (
        <html lang="en">
            <body className={`${inter.className} w-screen overflow-x-hidden`}>
                <Providers initialState={initialState}>
                    <WalletNavbar />
                    {props.children}
                </Providers>
            </body>
        </html>
    );
}
