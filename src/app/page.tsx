import { BackgroundAnimation } from "@/components/ui/background-animation";
import { TransferTokenCard } from "@/features/TransferTokenCard";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
    return (
        <main className="relative min-h-screen">
            <BackgroundAnimation />
            <div className="relative z-10 p-4">
                <div className="absolute top-4 right-4">
                    <ConnectButton accountStatus={"address"} />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <TransferTokenCard />
                </div>
            </div>
        </main>
    );
}
