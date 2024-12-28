"use client";

// app/layout.tsx
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider
                            theme={darkTheme({
                                borderRadius: "medium",
                            })}
                            modalSize="compact"
                        >
                            {children}
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
