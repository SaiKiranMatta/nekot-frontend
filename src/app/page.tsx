"use client";

import { Account } from "@/components/Account";
import { ApproveSpender } from "@/components/token/ApproveSpender";
import { BurnToken } from "@/components/token/BurnToken";
import { TokenInfo } from "@/components/token/TokenInfo";
import { TransferToken } from "@/components/token/TransferToken";
import { ViewBalance } from "@/components/token/ViewBalance";
import { WalletOptions } from "@/components/WalletOptions";
import { useAccount } from "wagmi";

function App() {
    const { isConnected, address } = useAccount();
    return (
        <div className=" min-h-screen  max-w-screen flex flex-col justify-center items-center">
            {isConnected && address ? (
                <div className=" flex flex-col space-y-4">
                    <Account />
                    <TokenInfo />
                    <ViewBalance address={address} />
                    <TransferToken />
                    <ApproveSpender />
                    <BurnToken />
                </div>
            ) : (
                <WalletOptions />
            )}
        </div>
    );
}

export default App;
