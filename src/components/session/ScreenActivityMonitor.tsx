import { useState, useEffect, useRef } from 'react';

interface UseScreenActivityMonitorProps {
  allowedApps: string[];
  onMaxDistractions: () => void;
}

export const useScreenActivityMonitor = ({ allowedApps, onMaxDistractions }: UseScreenActivityMonitorProps) => {
  const [switchCount, setSwitchCount] = useState(0);
  const unauthorizedAppRef = useRef<string | null>(null);
  const consecutiveCountRef = useRef<number>(0);

  const playNotificationSound = () => {
    const audio = new Audio('assets/notification.mp3');
    audio.play().catch(error => console.error('Error playing notification sound:', error));
  };

  const sendNotification = (appName: string, isFinalWarning: boolean = false) => {
    playNotificationSound();
    
    const message = isFinalWarning 
      ? "Session terminated due to excessive app switching or staying on unauthorized app too long"
      : `Unauthorized app detected. You have ${4 - switchCount} switches remaining.`;
    
    if (Notification.permission === "granted") {
      new Notification("Focus Alert", {
        body: message,
        icon: "assets/logo.png",
        requireInteraction: true,
        tag: 'app-detection'
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Focus Alert", {
            body: message,
            icon: "assets/logo.png",
            requireInteraction: true,
            tag: 'app-detection'
          });
        }
      });
    }

    if (isFinalWarning) {
      onMaxDistractions();
    }
  };

  const handleUnauthorizedApp = (appName: string) => {
    if (unauthorizedAppRef.current !== appName) {
      unauthorizedAppRef.current = appName;
      consecutiveCountRef.current = 0;
      
      setSwitchCount(prev => {
        const newCount = prev + 1;
        if (newCount > 4) {
          sendNotification(appName, true);
          return newCount;
        }
        sendNotification(appName);
        return newCount;
      });
    }
  };

  const handleAllowedApp = () => {
    unauthorizedAppRef.current = null;
    consecutiveCountRef.current = 0;
  };

  const checkConsecutiveDetections = (appName: string) => {
    consecutiveCountRef.current += 1;
    if (consecutiveCountRef.current >= 30) {
      sendNotification(appName, true);
      handleAllowedApp();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const monitorScreenActivity = async () => {
      try {
        const res = await fetch("http://localhost:6969/api/screenpipe");
        const data = await res.json();
        const appName = data.data[0]?.content?.appName;
        
        if (appName && !allowedApps.includes(appName) && appName !== 'Electron' && appName !== 'Coincentrate') {
          if (!unauthorizedAppRef.current) {
            handleUnauthorizedApp(appName);
          } else if (unauthorizedAppRef.current === appName) {
            checkConsecutiveDetections(appName);
          }
        } else if (unauthorizedAppRef.current) {
          handleAllowedApp();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    monitorScreenActivity();
    intervalId = setInterval(monitorScreenActivity, 1000);

    return () => clearInterval(intervalId);
  }, [allowedApps, onMaxDistractions, switchCount]);

  return { distractions: switchCount };
}; 