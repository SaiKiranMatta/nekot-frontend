import { useReadContract, type BaseError } from "wagmi";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEther } from "viem";
import { ReadContractErrorType } from "wagmi/actions";

export function ViewBalance({ address }: { address: `0x${string}` }) {
    const { data, error, isPending } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: nekotAbi,
        functionName: "balanceOf",
        args: [address],
    });

    if (isPending) return <div>Loading...</div>;
    if (error)
        return (
            <div className="text-red-600">
                Error:{" "}
                {(error as ReadContractErrorType).shortMessage || error.message}
            </div>
        );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <div>Balance: {data ? formatEther(data) : "0"} NKT</div>
            </CardContent>
        </Card>
    );
}
