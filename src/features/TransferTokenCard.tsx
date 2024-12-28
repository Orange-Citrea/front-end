import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export function TransferTokenCard() {
    return (
        <div>
            <Card className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex-1">
                        <Select>
                            <SelectTrigger className="w-full">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/ethereum.svg"
                                        alt="Ethereum"
                                        width={24}
                                        height={24}
                                    />
                                    <SelectValue placeholder="Ethereum" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ethereum">
                                    Ethereum
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        <Image
                            src="/switch.svg"
                            alt="Switch"
                            width={20}
                            height={20}
                        />
                    </div>

                    <div className="flex-1">
                        <Select>
                            <SelectTrigger className="w-full">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/arbitrum.svg"
                                        alt="Arbitrum"
                                        width={24}
                                        height={24}
                                    />
                                    <SelectValue placeholder="Arbitrum" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="arbitrum">
                                    Arbitrum
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Token</span>
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="usdc">USDC</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-sm text-gray-600">
                            My balance: 0
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="0.00"
                            className="flex-1"
                        />
                        <Button variant="secondary" className="w-20">
                            Max
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                            Recipient address
                        </span>
                        <span className="text-sm text-gray-600">
                            Remote balance: 0
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder="0x123456..." className="flex-1" />
                        <Button variant="secondary" className="w-20">
                            Self
                        </Button>
                    </div>
                </div>

                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Connect wallet
                </Button>
            </Card>
        </div>
    );
}
