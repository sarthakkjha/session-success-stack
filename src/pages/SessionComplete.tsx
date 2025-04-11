
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { CheckCircle, GiftIcon, XCircle } from 'lucide-react';

const SessionComplete: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentSession, setCurrentSession } = useApp();
  const params = new URLSearchParams(location.search);
  const status = params.get('status') as 'success' | 'failed';
  
  useEffect(() => {
    if (!currentSession) {
      navigate('/dashboard');
    }
  }, [currentSession, navigate]);
  
  const handleKeepFunds = () => {
    // In a real app, this would transfer the funds back to the user's wallet
    setCurrentSession(null);
    navigate('/dashboard');
  };
  
  const handleDonate = () => {
    // In a real app, this would donate the funds to charity
    setCurrentSession(null);
    navigate('/dashboard');
  };

  if (!currentSession) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card className="glass">
          <CardHeader className="text-center">
            {status === 'success' ? (
              <>
                <div className="mx-auto mb-4 bg-green-100 dark:bg-green-900/30 h-16 w-16 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Session Completed!</CardTitle>
                <CardDescription>
                  Congratulations! You've successfully completed your focus session.
                </CardDescription>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 bg-red-100 dark:bg-red-900/30 h-16 w-16 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-2xl">Session Failed</CardTitle>
                <CardDescription>
                  You've exceeded the distraction limit for this session.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-t border-border pt-4">
              <h3 className="font-medium mb-2">Session Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{currentSession.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount Staked</p>
                  <p className="font-medium">${currentSession.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distractions</p>
                  <p className="font-medium">{currentSession.distractions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-medium ${
                    status === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {status === 'success' ? 'Success' : 'Failed'}
                  </p>
                </div>
              </div>
            </div>
            
            {status === 'success' ? (
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">What would you like to do with your funds?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="border border-border rounded-lg p-4 text-center cursor-pointer hover:border-brand-500 transition-colors"
                    onClick={handleKeepFunds}
                  >
                    <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-medium">Keep Funds</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Return ${currentSession.amount} to your wallet
                    </p>
                  </div>
                  <div 
                    className="border border-border rounded-lg p-4 text-center cursor-pointer hover:border-brand-500 transition-colors"
                    onClick={handleDonate}
                  >
                    <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-2">
                      <GiftIcon className="h-5 w-5 text-brand-500" />
                    </div>
                    <p className="font-medium">Donate</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Donate ${currentSession.amount} to charity
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">We've donated your funds to charity</h3>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Your ${currentSession.amount} has been donated to the Global Education Fund, 
                    which helps provide education to children around the world.
                  </p>
                </div>
                <Button className="w-full" onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionComplete;
