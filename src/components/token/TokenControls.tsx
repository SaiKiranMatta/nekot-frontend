import * as React from "react";
import {
    useWriteContract,
    useWaitForTransactionReceipt,
    type BaseError,
} from "wagmi";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TokenControls() {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    function handlePause() {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "pause",
        });
    }

    function handleUnpause() {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "unpause",
        });
    }

    async function handleTransferOwnership(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newOwner = formData.get("newOwner") as `0x${string}`;

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "transferOwnership",
            args: [newOwner],
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Token Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4">
                    <Button
                        onClick={handlePause}
                        disabled={isPending}
                        variant="destructive"
                        className="flex-1"
                    >
                        Pause Token
                    </Button>
                    <Button
                        onClick={handleUnpause}
                        disabled={isPending}
                        className="flex-1"
                    >
                        Unpause Token
                    </Button>
                </div>

                <form onSubmit={handleTransferOwnership} className="space-y-4">
                    <Input
                        name="newOwner"
                        placeholder="New Owner Address (0x...)"
                        required
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="destructive"
                        className="w-full"
                    >
                        Transfer Ownership
                    </Button>
                </form>

                {hash && (
                    <div className="text-sm">Transaction Hash: {hash}</div>
                )}
                {isConfirming && (
                    <div className="text-sm">Waiting for confirmation...</div>
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
            </CardContent>
        </Card>
    );
}
