import React, { createContext, useContext, useState } from 'react';
import { useConnect, useAccount, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { formatEther, parseEther } from 'viem';
import { mainnet } from 'viem/chains'; // Import the chain used in wagmi config (App.tsx)

interface Session {
  id: string;
  date: string;
  duration: number;
  apps: string[];
  amount: number;
  status: 'success' | 'failed' | 'in-progress';
  distractions: number;
  paymentTxHash?: string;
  paymentStatus?: 'pending' | 'completed' | 'refunded';
  recipientAddress?: `0x${string}`; // Use correct type here
}

interface AppContextType {
  user: {
    name: string;
    email: string;
    walletConnected: boolean;
    balance: number;
    address?: string;
  } | null;
  sessions: Session[];
  currentSession: Session | null;
  isAuthenticated: boolean;
  setUser: (user: { name: string; email: string; walletConnected: boolean; balance: number; address?: string; } | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setSessions: (sessions: Session[]) => void;
  setCurrentSession: (session: Session | null) => void;
  addSession: (session: Session) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  isConnecting: boolean;
  isDisconnecting: boolean;
  address: string | undefined;
  makeSessionPayment: (session: Session, recipientAddress?: `0x${string}`) => Promise<string | undefined>; // Update parameter type
  refundSessionPayment: (sessionId: string) => Promise<boolean>;
  isProcessingPayment: boolean;
  isPending: boolean;
  lastTransaction: { hash: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define platform address inside the component scope
  const PLATFORM_WALLET_ADDRESS: `0x${string}` = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

  const [user, setUser] = useState<{
    name: string;
    email: string;
    walletConnected: boolean;
    balance: number;
    address?: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<{ hash: string } | null>(null);

  const { connectAsync: connect, isPending: isConnecting } = useConnect();
  const { disconnectAsync: disconnect, isPending: isDisconnecting } = useDisconnect();
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const { data: transactionReceipt } = useWaitForTransactionReceipt({
    hash: lastTransaction?.hash as `0x${string}` | undefined,
  });

  const addSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
  };

  const updateSession = (sessionId: string, updates: Partial<Session>) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );

    // If we're updating the current session, also update it
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const connectWallet = async () => {
    try {
      await connect({ connector: coinbaseWallet() });
      setUser((prev) =>
        prev ? {
          ...prev,
          walletConnected: true,
          address: address
        } : null
      );
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setUser((prev) =>
        prev ? {
          ...prev,
          walletConnected: false,
          address: undefined
        } : null
      );
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  // Make a payment for a session
  const makeSessionPayment = async (session: Session, recipientAddress: `0x${string}` = PLATFORM_WALLET_ADDRESS): Promise<string | undefined> => {
    if (!address) { // Ensure address (from useAccount) exists
      throw new Error('Wallet not connected');
    }

    try {
      setIsProcessingPayment(true);

      // Send ETH transaction
      const amountInEth = parseEther(session.amount.toString());

      // Send transaction
      const hash = await writeContractAsync({
        abi: [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'payable',
            inputs: [],
            outputs: [],
          },
        ],
        address: recipientAddress, // Use correctly typed parameter
        functionName: 'transfer',
        value: amountInEth,
        account: address,       // Add connected account address
        chain: mainnet,         // Add the chain configured in App.tsx
      });

      setLastTransaction({ hash });

      // Update session with payment info
      updateSession(session.id, {
        paymentTxHash: hash,
        paymentStatus: 'pending',
        recipientAddress // Use correctly typed parameter
      });

      return hash;
    } catch (error) {
      console.error('Payment failed:', error);
      return undefined;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Refund payment for a session
  const refundSessionPayment = async (sessionId: string): Promise<boolean> => {
    const session = sessions.find(s => s.id === sessionId);
    // Check recipientAddress type safety here too if needed, though it should be correct now
    if (!session || !session.paymentTxHash || !session.recipientAddress) {
      console.error('Refund cannot proceed: Session data missing or invalid.');
      return false;
    }

    try {
      setIsProcessingPayment(true);

      // In a real app, this would involve an on-chain transaction
      // For now, just simulate success and log
      console.log(`Simulating refund for session ${sessionId}...`);

      // Call writeContractAsync here if implementing actual refund transaction
      // const refundHash = await writeContractAsync({ ... });
      // console.log('Refund transaction hash:', refundHash);

      // Assuming simulation/transaction is successful, update status
      updateSession(sessionId, {
        paymentStatus: 'refunded'
      });

      console.log(`Refund processed for session ${sessionId}. Status updated to refunded.`);
      return true;
    } catch (error) {
      console.error('Refund failed:', error);
      // updateSession(sessionId, { paymentStatus: 'failed' }); // Removed: 'failed' is not a valid PaymentStatus
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        sessions,
        currentSession,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        setSessions,
        setCurrentSession,
        addSession,
        updateSession,
        connectWallet,
        disconnectWallet,
        isConnecting,
        isDisconnecting,
        address,
        makeSessionPayment,
        refundSessionPayment,
        isProcessingPayment,
        isPending,
        lastTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
