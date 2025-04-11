
import React, { createContext, useContext, useState } from 'react';

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
  } | null;
  sessions: Session[];
  currentSession: Session | null;
  isAuthenticated: boolean;
  setUser: (user: { name: string; email: string; walletConnected: boolean; balance: number; } | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setSessions: (sessions: Session[]) => void;
  setCurrentSession: (session: Session | null) => void;
  addSession: (session: Session) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  connectWallet: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    walletConnected: boolean;
    balance: number;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

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

  const connectWallet = () => {
    // This would be implemented with actual blockchain connection
    setUser((prev) => (prev ? { ...prev, walletConnected: true } : null));
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
