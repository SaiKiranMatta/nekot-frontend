import { useReadContract } from "wagmi";
import { nekotAbi, CONTRACT_ADDRESS } from "@/nekotAbi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatEther } from "viem";

export function AllowanceView() {
    const [owner, setOwner] = useState<`0x${string}`>();
    const [spender, setSpender] = useState<`0x${string}`>();
    const [shouldFetch, setShouldFetch] = useState(false);

    const {
        data: allowance,
        error,
        isPending,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: nekotAbi,
        functionName: "allowance",
        args: owner && spender ? [owner, spender] : undefined,
    });

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        setShouldFetch(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Check Allowance</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCheck} className="space-y-4">
                    <Input
                        placeholder="Owner Address (0x...)"
                        onChange={(e) =>
                            setOwner(e.target.value as `0x${string}`)
                        }
                        required
                    />
                    <Input
                        placeholder="Spender Address (0x...)"
                        onChange={(e) =>
                            setSpender(e.target.value as `0x${string}`)
                        }
                        required
                    />
                    <Button type="submit">Check Allowance</Button>

                    {isPending && <div>Loading...</div>}
                    {/* {error && (
                        <div className="text-red-600">
                            Error checking allowance
                        </div>
                    )} */}
                    {allowance && (
                        <div>Allowance: {formatEther(allowance)} tokens</div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
