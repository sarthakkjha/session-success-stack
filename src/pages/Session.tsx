import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Session: React.FC = () => {
  const { currentSession, updateSession } = useApp();
  const [timeLeft, setTimeLeft] = useState(currentSession?.duration || 0);
  const [distractions, setDistractions] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(100);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!currentSession) {
      navigate('/new-session');
    }
  }, [currentSession, navigate]);
  
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1/60;
        if (newTime <= 0) {
          clearInterval(timer);
          handleSuccess();
          return 0;
        }
        setProgress((newTime / (currentSession?.duration || 1)) * 100);
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, timeLeft, currentSession]);
  
  useEffect(() => {
    const checkApps = setInterval(() => {
      const isUsingForbiddenApp = Math.random() < 0.1;
      
      if (isUsingForbiddenApp && isActive) {
        setDistractions((prev) => prev + 1);
        toast({
          title: "Distraction detected!",
          description: "You're using an app that's not on your allowed list.",
          variant: "destructive"
        });
        
        if (distractions >= 2) {
          handleFailure();
        }
      }
    }, 10000);
    
    return () => clearInterval(checkApps);
  }, [distractions, isActive]);
  
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSuccess = () => {
    if (currentSession) {
      updateSession(currentSession.id, {
        status: 'success',
        distractions
      });
      navigate('/session-complete?status=success');
    }
  };
  
  const handleFailure = () => {
    if (currentSession) {
      updateSession(currentSession.id, {
        status: 'failed',
        distractions
      });
      navigate('/session-complete?status=failed');
    }
  };
  
  const handleGiveUp = () => {
    handleFailure();
  };

  if (!currentSession) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Focus Session</CardTitle>
                <CardDescription>
                  Stay focused on your chosen apps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-brand-500" />
                      <span className="font-medium">Time Remaining</span>
                    </div>
                    <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">Distractions</span>
                    </div>
                    <span className="text-2xl font-bold">{distractions}/3</span>
                  </div>
                  <Progress 
                    value={(distractions / 3) * 100} 
                    className="h-2 bg-amber-100 dark:bg-amber-900/30"
                  />
                  <p className="text-sm text-muted-foreground">
                    After 3 distractions, your session will end as a failure.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Allowed Apps</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentSession.apps.map(app => (
                      <div key={app} className="px-2 py-1 bg-brand-100 dark:bg-brand-900/30 rounded text-sm">
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Session Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{currentSession.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Staked</p>
                      <p className="font-medium">${currentSession.amount}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" onClick={handleGiveUp}>
                  Give Up
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="glass">
              <CardHeader>
                <CardTitle>Focus Tips</CardTitle>
                <CardDescription>
                  AI-powered advice to help you stay focused
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Use the Pomodoro Technique
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer break.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Minimize Distractions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Put your phone in another room or on silent mode to avoid getting distracted.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Stay Hydrated
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Keep a water bottle nearby. Staying hydrated improves brain function.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
