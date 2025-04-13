import React from 'react';

interface SessionDetailsProps {
  duration: number;
  amount: number;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ duration, amount }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Session Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-medium">{duration} minutes</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Amount Staked</p>
          <p className="font-medium">${amount}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails; 