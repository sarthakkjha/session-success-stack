import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { AlertTriangle, CheckCircle, Clock, Send, Bot } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Session: React.FC = () => {
  const { currentSession, updateSession } = useApp();
  const [timeLeft, setTimeLeft] = useState(currentSession?.duration || 0);
  const [distractions, setDistractions] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(100);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: 'Hi there! I\'m your focus assistant. How can I help you stay productive today?'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleSendMessage = () => {
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
    
    setMessage('');
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
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium">Time Remaining</span>
                    </div>
                    <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
                  </div>
                  <Progress value={progress} className="h-2.5 bg-primary/20" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <span className="font-medium">Distractions</span>
                    </div>
                    <span className="text-2xl font-bold">{distractions}/3</span>
                  </div>
                  <Progress 
                    value={(distractions / 3) * 100} 
                    className="h-2.5 bg-warning/20" 
                  />
                  <p className="text-sm text-muted-foreground">
                    After 3 distractions, your session will end as a failure.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Allowed Apps</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentSession.apps.map(app => (
                      <div key={app} className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full text-sm font-medium text-primary">
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
          
          <div className="md:col-span-1 h-full">
            <Card className="glass h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Focus Assistant</CardTitle>
                </div>
                <CardDescription>
                  AI-powered advice to help you stay focused
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[400px] pr-2">
                  {chatHistory.map((chat, index) => (
                    <div 
                      key={index} 
                      className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                          chat.role === 'user' 
                            ? 'bg-primary text-white ml-auto' 
                            : 'bg-secondary text-foreground'
                        }`}
                      >
                        {chat.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl px-4 py-2 bg-secondary text-foreground">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask for focus tips..."
                    className="flex-grow rounded-full px-4 py-2 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className="rounded-full purple-gradient text-white hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
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
