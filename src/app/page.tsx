"use client";

import { Account } from "@/components/Account";
import { AllowanceView } from "@/components/token/AllowanceView";
import { ApproveSpender } from "@/components/token/ApproveSpender";
import { BurnToken } from "@/components/token/BurnToken";
import { DecreaseAllowance } from "@/components/token/DecreaseAllowance";
import { IncreaseAllowance } from "@/components/token/IncreaseAllowance";
import { MintToken } from "@/components/token/MintToken";
import { RecoverToken } from "@/components/token/RecoverToken";
import { TokenControls } from "@/components/token/TokenControls";
import { TokenInfo } from "@/components/token/TokenInfo";
import { TransferFrom } from "@/components/token/TransferFrom";
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
                    <MintToken />
                    <TokenControls />
                    <IncreaseAllowance />
                    <RecoverToken />
                    <DecreaseAllowance />
                    <TransferToken />
                    <ApproveSpender />
                    <TransferFrom />
                    <AllowanceView />
                    <BurnToken />
                </div>
            ) : (
                <WalletOptions />
            )}
        </div>
    );
}

export default App;
