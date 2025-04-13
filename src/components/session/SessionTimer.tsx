import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface SessionTimerProps {
  timeLeft: number;
  progress: number;
  duration: number;
}

const SessionTimer: React.FC<SessionTimerProps> = ({ timeLeft, progress, duration }) => {
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
  );
};

export default SessionTimer; 