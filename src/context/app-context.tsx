import React, { createContext, useContext, useState } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

interface Session {
  id: string;
  date: string;
  duration: number;
  apps: string[];
  amount: number;
  status: 'success' | 'failed' | 'in-progress';
  distractions: number;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const { connectAsync: connect, isPending: isConnecting } = useConnect();
  const { disconnectAsync: disconnect, isPending: isDisconnecting } = useDisconnect();
  const { address } = useAccount();

  const addSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
  };

  const updateSession = (sessionId: string, updates: Partial<Session>) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
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
