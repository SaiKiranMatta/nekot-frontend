import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AllowanceView } from "./AllowanceView";
import { ApproveSpender } from "./ApproveSpender";
import { BurnToken } from "./BurnToken";
import { DecreaseAllowance } from "./DecreaseAllowance";
import { IncreaseAllowance } from "./IncreaseAllowance";
import { MintToken } from "./MintToken";
import { RecoverToken } from "./RecoverToken";
import TokenBalanceViewer from "./TokenBalanceViewer";
import { TokenControls } from "./TokenControls";
import { TokenInfo } from "./TokenInfo";
import { TransferFrom } from "./TransferFrom";
import { TransferToken } from "./TransferToken";
import { ViewBalance } from "./ViewBalance";

interface TokenInteractionsProps {
    address: `0x${string}`;
}

const TokenInteractions = ({ address }: TokenInteractionsProps) => {
    return (
        <Tabs defaultValue="account" className="w-full my-20 px-8">
            <TabsList className=" grid grid-cols-2 mb-8">
                <TabsTrigger value="account">Read Contract</TabsTrigger>
                <TabsTrigger value="password">Write Contract</TabsTrigger>
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
    );
};

export default TokenInteractions;
