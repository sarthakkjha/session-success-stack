import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface FocusAssistantProps {
  onSendMessage: (message: string) => void;
  chatHistory: ChatMessage[];
  isLoading: boolean;
}

const FocusAssistant: React.FC<FocusAssistantProps> = ({ onSendMessage, chatHistory, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  return (
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
  );
};

export default FocusAssistant; 