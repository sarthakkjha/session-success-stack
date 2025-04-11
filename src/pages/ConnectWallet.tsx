
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();
  const { connectWallet } = useApp();
  
  const handleConnectWallet = () => {
    // In a real app, this would connect to a blockchain wallet
    connectWallet();
    navigate('/dashboard');
  };
  
  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-secondary/50">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 text-center card-hover">
          <div className="h-20 w-20 rounded-2xl purple-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect your blockchain wallet to stake crypto and earn rewards for your productivity sessions.
          </p>
          
          <div className="space-y-4">
            <Button className="w-full purple-gradient text-white hover:opacity-90 group" onClick={handleConnectWallet}>
              Connect Base Wallet
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full border-primary/30" onClick={handleSkip}>
              Skip for Now
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 mr-1 text-primary" />
            <p>Your wallet is protected by our secure encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
