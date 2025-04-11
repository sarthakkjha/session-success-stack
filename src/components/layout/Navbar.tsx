
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useApp } from '@/context/app-context';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useApp();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/75 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl purple-gradient flex items-center justify-center shadow-md">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">Focus<span className="bg-clip-text text-transparent purple-gradient">Flow</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-foreground/70'
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/new-session" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/new-session' ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                New Session
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {!isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="purple-gradient text-white hover:opacity-90">Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {user?.walletConnected ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Wallet Connected
                  </span>
                ) : (
                  <Link to="/connect-wallet">
                    <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">Connect Wallet</Button>
                  </Link>
                )}
              </span>
              <div className="h-9 w-9 rounded-full purple-gradient flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.[0].toUpperCase() || 'U'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
