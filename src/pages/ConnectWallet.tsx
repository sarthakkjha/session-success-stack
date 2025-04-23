import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Wallet } from 'lucide-react';
import { useConnect, useAccount } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();
  const { connect, isPending } = useConnect({
    mutation: {
      onSuccess: () => {
        navigate('/dashboard');
      },
    },
  });

  // On successful connection, you can navigate to dashboard if needed
  // const handleSuccess = () => {
  //  navigate('/dashboard');
  // };

  const handleConnect = async () => {
    try {
      await connect({ connector: coinbaseWallet() });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  // If already connected, redirect to dashboard
  const { address, isConnected } = useAccount();
  if (isConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-secondary/50">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 text-center card-hover">
          <div className="h-20 w-20 rounded-2xl purple-gradient flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect your Base wallet to stake crypto and earn rewards for your productivity sessions.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleConnect}
              disabled={isPending}
              className="w-full bg-primary text-white rounded-md py-2 hover:bg-primary/90 transition"
            >
              {isPending ? 'Connecting...' : 'Connect Wallet'}
            </button>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <button className="w-full border border-primary/30 rounded-md py-2 text-primary hover:bg-primary/10 transition" onClick={handleSkip}>
              Skip for Now
            </button>
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