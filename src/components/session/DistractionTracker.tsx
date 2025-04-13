import React from 'react';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

interface DistractionTrackerProps {
  distractions: number;
  maxDistractions: number;
}

const DistractionTracker: React.FC<DistractionTrackerProps> = ({ distractions, maxDistractions }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span className="font-medium">Distractions</span>
        </div>
        <span className="text-2xl font-bold">{distractions}/{maxDistractions}</span>
      </div>
      <Progress 
        value={(distractions / maxDistractions) * 100} 
        className="h-2.5 bg-warning/20" 
      />
      <p className="text-sm text-muted-foreground">
        After {maxDistractions} distractions, your session will end as a failure.
      </p>
    </div>
  );
};

export default DistractionTracker; 