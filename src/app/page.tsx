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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenBalanceViewer from "@/components/token/TokenBalanceViewer";

function App() {
    const { isConnected, address } = useAccount();
    return (
        <div className=" min-h-screen  flex flex-col  items-center">
            {isConnected && address ? (
                <Tabs defaultValue="account" className="w-full my-20 px-4">
                    <TabsList className=" grid grid-cols-2 mb-8">
                        <TabsTrigger value="account">Read Contract</TabsTrigger>
                        <TabsTrigger value="password">
                            Write Contract
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div className=" grid md:grid-cols-3 grid-cols-2 gap-4">
                            <TokenInfo />
                            <ViewBalance address={address} />
                            <AllowanceView />
                            <TokenBalanceViewer />
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div className=" grid md:grid-cols-3 grid-cols-2 gap-4">
                            <TransferToken />
                            <TransferFrom />
                            <RecoverToken />
                            <ApproveSpender />
                            <IncreaseAllowance />
                            <DecreaseAllowance />
                            <MintToken />
                            <TokenControls />
                            <BurnToken />
                        </div>
                    </TabsContent>
                </Tabs>
            ) : (
                <WalletOptions />
            )}
        </div>
    );
}

export default App;
