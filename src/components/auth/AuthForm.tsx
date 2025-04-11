
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Google } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    const mockUser = {
      name: mode === 'signup' ? name : 'John Doe',
      email,
      walletConnected: false,
      balance: 100,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Check if the user has a wallet connected
    navigate('/connect-wallet');
  };

  const handleGoogleAuth = () => {
    // Mock Google authentication
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      walletConnected: false,
      balance: 100,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Navigate to wallet connection
    navigate('/connect-wallet');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={handleGoogleAuth}
              className="w-full"
              type="button"
            >
              <Google className="h-4 w-4 mr-2" />
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
