/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Clock, ArrowUpDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Token {
    symbol: string;
    chain: string;
    icon: string;
}

const tokens: Token[] = [
    {
        symbol: "USDT",
        chain: "BNB",
        icon: "/ethereum.svg?height=24&width=24",
    },
    {
        symbol: "USDC",
        chain: "AVAX",
        icon: "/ethereum.svg?height=24&width=24",
    },
];

export function TransferTokenCard() {
    const [fromToken, setFromToken] = useState<Token>(tokens[0]);
    const [toToken, setToToken] = useState<Token>(tokens[1]);
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [recipientAddress, setRecipientAddress] = useState(
        "0x79DcD66e8bC69dae488c3E0F35e0693815bD7d6"
    );

    const handleNumberInput = (
        value: string,
        setter: (value: string) => void
    ) => {
        // Only allow numbers and decimals
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleSwapTokens = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    const { isConnected } = useAccount();

    return (
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-xl border-zinc-800 shadow-2xl">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-medium text-white font-['Inter'] tracking-tight">
                        Transfer
                    </h1>
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <Clock className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="text-right text-sm text-zinc-400 font-['Inter']">
                    Balance: 103149{" "}
                    <span className="text-white font-medium">MAX</span>
                </div>

                {/* Pay Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <label className="text-sm text-zinc-400 mb-2 block font-['Inter']">
                            Pay:
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                value={fromAmount}
                                onChange={(e) =>
                                    handleNumberInput(
                                        e.target.value,
                                        setFromAmount
                                    )
                                }
                                placeholder="0.00"
                                className="w-full border-0 bg-transparent text-2xl text-white placeholder:text-zinc-700 focus:outline-none font-['Inter'] font-light"
                            />
                            <Select
                                value={fromToken.symbol}
                                onValueChange={(value) =>
                                    setFromToken(
                                        tokens.find((t) => t.symbol === value)!
                                    )
                                }
                            >
                                <SelectTrigger className="w-[140px] border-0 bg-zinc-800 text-white rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={fromToken.icon}
                                            alt={fromToken.symbol}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <div className="font-['Inter']">
                                            <div className="font-medium">
                                                {fromToken.symbol}
                                            </div>
                                            <div className="text-xs text-zinc-400">
                                                {fromToken.chain}
                                            </div>
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {tokens.map((token) => (
                                        <SelectItem
                                            key={token.symbol}
                                            value={token.symbol}
                                        >
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={token.icon}
                                                    alt={token.symbol}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <div className="font-['Inter']">
                                                    <div className="font-medium">
                                                        {token.symbol}
                                                    </div>
                                                    <div className="text-xs text-zinc-400">
                                                        {token.chain}
                                                    </div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="relative h-0">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleSwapTokens}
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white hover:bg-zinc-200 z-10"
                        >
                            <ArrowUpDown className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Receive Section */}
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <label className="text-sm text-zinc-400 mb-2 block font-['Inter']">
                            Receive:
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                value={toAmount}
                                onChange={(e) =>
                                    handleNumberInput(
                                        e.target.value,
                                        setToAmount
                                    )
                                }
                                placeholder="0.00"
                                className="w-full border-0 bg-transparent text-2xl text-white placeholder:text-zinc-700 focus:outline-none font-['Inter'] font-light"
                            />
                            <Select
                                value={toToken.symbol}
                                onValueChange={(value) =>
                                    setToToken(
                                        tokens.find((t) => t.symbol === value)!
                                    )
                                }
                            >
                                <SelectTrigger className="w-[140px] border-0 bg-zinc-800 text-white rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={toToken.icon}
                                            alt={toToken.symbol}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <div className="font-['Inter']">
                                            <div className="font-medium">
                                                {toToken.symbol}
                                            </div>
                                            <div className="text-xs text-zinc-400">
                                                {toToken.chain}
                                            </div>
                                        </div>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {tokens.map((token) => (
                                        <SelectItem
                                            key={token.symbol}
                                            value={token.symbol}
                                        >
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={token.icon}
                                                    alt={token.symbol}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                                <div className="font-['Inter']">
                                                    <div className="font-medium">
                                                        {token.symbol}
                                                    </div>
                                                    <div className="text-xs text-zinc-400">
                                                        {token.chain}
                                                    </div>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Recipient Address */}
                <div className="space-y-2">
                    <label className="text-white font-['Inter']">
                        Recipient Address
                    </label>
                    <div className="flex gap-2">
                        <Input
                            value={recipientAddress}
                            onChange={(e) =>
                                setRecipientAddress(e.target.value)
                            }
                            className="bg-zinc-900 border-0 text-zinc-400 rounded-2xl font-['Inter']"
                        />
                        <Button
                            variant="ghost"
                            className="rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 font-['Inter']"
                        >
                            Edit
                        </Button>
                    </div>
                </div>

                {/* Fee Information */}
                <div className="space-y-3 text-sm font-['Inter']">
                    <div className="flex justify-between text-zinc-400">
                        <span>Slippage</span>
                        <span>0%</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                        <span>Gas on destination</span>
                        <span>0 BNB</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                        <span>Fee</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                        <span>Gas cost</span>
                        <span>0.0 BNB</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                        <span>Estimated time for transfer</span>
                        <span>0 min</span>
                    </div>
                </div>

                {/* Action Button */}
                {isConnected ? (
                    <Button className="w-full py-6 text-white bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-['Inter'] font-medium">
                        Transfer
                    </Button>
                ) : (
                    <div className="flex justify-center">
                        <ConnectButton />
                    </div>
                )}
            </div>
        </Card>
    );
}
