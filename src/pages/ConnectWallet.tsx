
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { Wallet } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
            <Wallet className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect your blockchain wallet to stake crypto and earn rewards for your productivity sessions.
          </p>
          
          <div className="space-y-4">
            <Button className="w-full" onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSkip}>
              Skip for Now
            </Button>
          </div>
          
          <p className="mt-6 text-xs text-muted-foreground">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
