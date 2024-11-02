import React, { useState } from "react";
import { formatEther } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { publicClient } from "@/client";

const TokenBalanceViewer = () => {
    const [address, setAddress] = useState("");
    const [inputError, setInputError] = useState("");
    const [data, setData] = useState<bigint | null>(null);

    const fetchTokenBalance = async () => {
        const data = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: nekotAbi,
            functionName: "balanceOf",
            args: [address as `0x${string}`],
        });
        setData(data as bigint);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);

        if (value && (!value.startsWith("0x") || value.length !== 42)) {
            setInputError(
                "Please enter a valid Ethereum address (0x... format, 42 characters)"
            );
        } else {
            setInputError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (address && address.startsWith("0x") && address.length === 42) {
            fetchTokenBalance();
        }
    };

    return (
        <Card className=" w-full">
            <CardHeader>
                <CardTitle>Token Balance Checker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Enter Ethereum address (0x...)"
                            value={address}
                            onChange={handleAddressChange}
                            className={inputError ? "border-red-500" : ""}
                        />
                        {inputError && (
                            <p className="text-sm text-red-500">{inputError}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={Boolean(inputError) || !address}
                        className="w-full"
                    >
                        Check Balance
                    </Button>
                </form>

                {data && (
                    <div className="text-center text-lg font-medium">
                        Balance: {formatEther(data)} NKT
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TokenBalanceViewer;
