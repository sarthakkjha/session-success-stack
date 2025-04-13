import React from 'react';
import { Button } from '@/components/ui/button';

const ScreenActivityMonitor: React.FC = () => {
  const monitorScreenActivity = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/screenpipe");
      const data = await res.json();
      console.log(data.data[0].content.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button onClick={monitorScreenActivity}>
      Track Screen
    </Button>
  );
};

export default ScreenActivityMonitor; 