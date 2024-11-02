"use client";

import { useState, useEffect } from "react";
import {
    useAccount,
    useDisconnect,
    useConnect,
    useBalance,
    useAccountEffect,
    useEnsName,
    useEnsAvatar,
    Connector,
} from "wagmi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { type ReactNode } from "react";

const WalletNavbar = () => {
    const { address, isConnected, connector: activeConnector } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect, connectors } = useConnect();
    const [isClient, setIsClient] = useState(false);

    // Get ENS data if available
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

    // Get balance
    const { data: balance } = useBalance({
        address,
    });

    // Handle account changes
    useAccountEffect({
        onConnect(data) {
            console.log("Connected!", data);
        },
        onDisconnect() {
            console.log("Disconnected!");
        },
    });

    // Hydration fix
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Format address for display
    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const displayName = ensName || (address ? formatAddress(address) : "");

    // Create wallet switcher items
    const renderWalletSwitcherItems = (): ReactNode[] => {
        return connectors
            .filter((connector) => {
                return Boolean(connector.id !== activeConnector?.id);
            })
            .map((connector) => (
                <DropdownMenuItem
                    key={connector.id}
                    onClick={() => {
                        disconnect();
                        connect({ connector });
                    }}
                    className="cursor-pointer"
                >
                    <Wallet className="w-4 h-4 mr-2" />
                    {connector.name}
                </DropdownMenuItem>
            ));
    };

    return (
        <nav className="w-screen bg-background border-b  flex fixed top-0 z-50">
            <div className=" px-8 py-3 w-full">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">Nekot tokeN</div>
                    <div className="flex items-center gap-4 mx-4">
                        {isConnected ? (
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2"
                                        >
                                            {ensAvatar ? (
                                                <img
                                                    src={ensAvatar}
                                                    alt="ENS Avatar"
                                                    className="w-5 h-5 rounded-full"
                                                />
                                            ) : (
                                                <Wallet className="w-5 h-5" />
                                            )}
                                            {displayName}
                                            <ChevronDown className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <DropdownMenuLabel>
                                            Connected with{" "}
                                            {activeConnector?.name}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>
                                            {balance && (
                                                <span className="text-sm font-medium">
                                                    {parseFloat(
                                                        balance.formatted
                                                    ).toFixed(4)}{" "}
                                                    {balance.symbol}
                                                </span>
                                            )}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        {/* Switch Wallet Section */}
                                        {renderWalletSwitcherItems().length >
                                            0 && (
                                            <>
                                                <DropdownMenuLabel>
                                                    Switch Wallet
                                                </DropdownMenuLabel>
                                                {renderWalletSwitcherItems()}
                                                <DropdownMenuSeparator />
                                            </>
                                        )}

                                        <DropdownMenuItem
                                            onClick={() => disconnect()}
                                            className="text-red-600 cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Disconnect
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <Wallet className="w-4 h-4" />
                                Not Connected
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default WalletNavbar;
