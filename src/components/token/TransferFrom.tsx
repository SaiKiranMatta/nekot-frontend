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

export function TransferFrom() {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const from = formData.get("from") as `0x${string}`;
        const to = formData.get("to") as `0x${string}`;
        const amount = formData.get("amount") as string;

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "transferFrom",
            args: [from, to, parseEther(amount)],
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transfer From</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    <Input
                        name="from"
                        placeholder="From Address (0x...)"
                        required
                    />
                    <Input
                        name="to"
                        placeholder="To Address (0x...)"
                        required
                    />
                    <Input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        step="0.000001"
                        required
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? "Confirming..." : "Transfer From"}
                    </Button>
                    {hash && (
                        <div className="text-sm">Transaction Hash: {hash}</div>
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