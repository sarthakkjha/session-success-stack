import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const Payment: React.FC = () => {
  const { currentSession } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentSession) {
      navigate('/new-session');
    }
  }, [currentSession, navigate]);

  const handlePayment = () => {
    navigate('/session');
  };

  if (!currentSession) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-secondary/30">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Payment Required</CardTitle>
          <CardDescription>
            Please pay {currentSession.amount} ETH to start your focus session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Session duration: {currentSession.duration} minutes
          </p>
          {currentSession.apps.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Apps: {currentSession.apps.join(', ')}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handlePayment} className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment; 