import { useReadContracts } from "wagmi";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEther } from "viem";

export function TokenInfo() {
    const { data, error, isPending } = useReadContracts({
        contracts: [
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "name",
            },
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "symbol",
            },
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "totalSupply",
            },
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "decimals",
            },
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "owner",
            },
            {
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "paused",
            },
        ],
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error loading token info</div>;

    const [name, symbol, totalSupply, decimals, owner, paused] = data || [];

    return (
        <Card className=" overflow-hidden">
            <CardHeader>
                <CardTitle>Token Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>Name: {name.result}</div>
                <div>Symbol: {symbol.result}</div>
                <div>
                    Total Supply:{" "}
                    {totalSupply.result ? formatEther(totalSupply.result) : "0"}
                </div>
                <div>Decimals: {decimals.result}</div>
                <div>Owner: {owner.result}</div>
                <div>Status: {paused.result ? "Paused" : "Active"}</div>
            </CardContent>
        </Card>
    );
}
