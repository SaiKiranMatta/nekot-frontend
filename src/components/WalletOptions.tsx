import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

export function WalletOptions() {
    const { connectors, connect } = useConnect();

    return (
        <Card className=" max-w-3xl min-w-96 mx-auto mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-6 w-6" />
                    Wallet Connection
                </CardTitle>
            </CardHeader>
            <CardContent className=" flex flex-col space-y-4">
                {connectors.map((connector) => (
                    <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
}
