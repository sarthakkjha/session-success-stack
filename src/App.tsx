import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { AppProvider } from "@/context/app-context";
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet } from 'viem/chains'
import { coinbaseWallet } from 'wagmi/connectors'
import { http } from 'viem'

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ConnectWallet from "@/pages/ConnectWallet";
import Dashboard from "@/pages/Dashboard";
import NewSession from "@/pages/NewSession";
import Session from "@/pages/Session";
import SessionComplete from "@/pages/SessionComplete";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [mainnet],
  connectors: [
    coinbaseWallet({
      appName: 'Session Success',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/connect-wallet" element={<ConnectWallet />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/new-session" element={<NewSession />} />
                    <Route path="/session" element={<Session />} />
                    <Route path="/session-complete" element={<SessionComplete />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
