import * as React from "react";
import {
    useWriteContract,
    useWaitForTransactionReceipt,
    type BaseError,
} from "wagmi";
import { parseEther } from "viem";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RecoverToken() {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const tokenAddress = formData.get("tokenAddress") as `0x${string}`;
        const amount = formData.get("amount") as string;

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "recoverERC20",
            args: [tokenAddress, parseEther(amount)],
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    return (
        <Card className=" overflow-hidden">
            <CardHeader>
                <CardTitle>Recover ERC20 Tokens</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    <Input
                        name="tokenAddress"
                        placeholder="Token Address (0x...)"
                        required
                    />
                    <Input
                        name="amount"
                        placeholder="Amount to Recover"
                        type="number"
                        step="0.000001"
                        required
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="destructive"
                        className="w-full"
                    >
                        {isPending ? "Confirming..." : "Recover Tokens"}
                    </Button>
                    {hash && (
                        <div className="text-xs">Transaction Hash: {hash}</div>
                    )}
                    {isConfirming && (
                        <div className="text-sm">
                            Waiting for confirmation...
                        </div>
                    )}
                    {isConfirmed && (
                        <div className="text-sm text-green-600">
                            Transaction confirmed.
                        </div>
                    )}
                    {error && (
                        <div className="text-sm text-red-600">
                            Error:{" "}
                            {(error as BaseError).shortMessage || error.message}
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
