import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { useToast } from '@/components/ui/use-toast';
import SessionTimer from '@/components/session/SessionTimer';
import DistractionTracker from '@/components/session/DistractionTracker';
import AllowedApps from '@/components/session/AllowedApps';
import SessionDetails from '@/components/session/SessionDetails';
import FocusAssistant from '@/components/session/FocusAssistant';
import ScreenActivityMonitor from '@/components/session/ScreenActivityMonitor';

const Session: React.FC = () => {
  const { currentSession, updateSession } = useApp();
  const [timeLeft, setTimeLeft] = useState(currentSession?.duration || 0);
  const [distractions, setDistractions] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(100);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: 'Hi there! I\'m your focus assistant. How can I help you stay productive today?'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [screenActivity, setScreenActivity] = useState<string[]>([]);
  
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

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, {role: 'user', content: message}]);
    setIsLoading(true);
    
    // Simulate AI response (in real app, call Gemini API)
    setTimeout(() => {
      const responses = [
        "Try breaking down your task into smaller, manageable chunks.",
        "Remember to take short breaks every 25 minutes to maintain focus.",
        "If you're feeling stuck, try changing your environment or approach.",
        "Great question! Focus on one task at a time to maximize productivity.",
        "I recommend setting specific goals for each session to track progress."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatHistory(prev => [...prev, {role: 'assistant', content: randomResponse}]);
      setIsLoading(false);
    }, 1000);
  };

  if (!currentSession) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-secondary/30 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
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
                <SessionTimer 
                  timeLeft={timeLeft}
                  progress={progress}
                  duration={currentSession.duration}
                />
                
                <DistractionTracker 
                  distractions={distractions}
                  maxDistractions={3}
                />
                
                <AllowedApps apps={currentSession.apps} />
                
                <SessionDetails 
                  duration={currentSession.duration}
                  amount={currentSession.amount}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive" onClick={handleGiveUp}>
                  Give Up
                </Button>
              </CardFooter>
              <CardFooter className="flex justify-end">
                <ScreenActivityMonitor
                  
                />
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-1 h-full">
            <FocusAssistant
              onSendMessage={handleSendMessage}
              chatHistory={chatHistory}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;