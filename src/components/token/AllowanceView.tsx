import React, { useState } from "react";
import { formatEther } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { publicClient } from "@/client";

export function AllowanceView() {
    const [owner, setOwner] = useState("");
    const [spender, setSpender] = useState("");
    const [inputError, setInputError] = useState("");
    const [allowance, setAllowance] = useState<bigint | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllowance = async () => {
        try {
            setIsLoading(true);
            const data = await publicClient.readContract({
                address: CONTRACT_ADDRESS,
                abi: nekotAbi,
                functionName: "allowance",
                args: [owner as `0x${string}`, spender as `0x${string}`],
            });
            setAllowance(data as bigint);
        } catch (error) {
            console.error("Error fetching allowance:", error);
            setInputError(
                "Error checking allowance. Please verify the addresses."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const validateAddress = (address: string) => {
        return address.startsWith("0x") && address.length === 42;
    };

    const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOwner(value);
        validateInputs(value, spender);
    };

    const handleSpenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSpender(value);
        validateInputs(owner, value);
    };

    const validateInputs = (ownerAddress: string, spenderAddress: string) => {
        if (ownerAddress && !validateAddress(ownerAddress)) {
            setInputError("Invalid owner address format");
        } else if (spenderAddress && !validateAddress(spenderAddress)) {
            setInputError("Invalid spender address format");
        } else {
            setInputError("");
        }
    };

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateAddress(owner) && validateAddress(spender)) {
            await fetchAllowance();
        }
    };

    return (
        <Card className="w-full max-w-md overflow-hidden">
            <CardHeader>
                <CardTitle>Check Allowance</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCheck} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Owner Address (0x...)"
                            value={owner}
                            onChange={handleOwnerChange}
                            className={inputError ? "border-red-500" : ""}
                            required
                        />
                        <Input
                            placeholder="Spender Address (0x...)"
                            value={spender}
                            onChange={handleSpenderChange}
                            className={inputError ? "border-red-500" : ""}
                            required
                        />
                        {inputError && (
                            <p className="text-sm text-red-500">{inputError}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={
                            Boolean(inputError) ||
                            !owner ||
                            !spender ||
                            isLoading
                        }
                    >
                        {isLoading ? "Checking..." : "Check Allowance"}
                    </Button>

                    {allowance !== null && (
                        <div className="text-center text-lg font-medium">
                            Allowance: {formatEther(allowance)} NKT
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
