import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/app-context';
import { v4 as uuidv4 } from 'uuid';

const apps = [
  { id: 'chrome', name: 'Chrome' },
  { id: 'vscode', name: 'VS Code' },
  { id: 'slack', name: 'Slack' },
  { id: 'notion', name: 'Notion' },
  { id: 'figma', name: 'Figma' },
  { id: 'spotify', name: 'Spotify' },
  { id: 'zoom', name: 'Zoom' },
  { id: 'terminal', name: 'Terminal' },
];

const NewSession: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [duration, setDuration] = useState(30);
  const [amount, setAmount] = useState(0);
  const [manualAppName, setManualAppName] = useState('');
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [currentUrlInput, setCurrentUrlInput] = useState('');
  const navigate = useNavigate();
  const { setCurrentSession, addSession } = useApp();
  
  const handleAppToggle = (appName: string) => {
    if (selectedApps.includes(appName)) {
      setSelectedApps(selectedApps.filter(app => app !== appName));
    } else {
      setSelectedApps([...selectedApps, appName]);
    }
  };
  
  const handleAddManualApp = () => {
    const trimmedName = manualAppName.trim();
    if (trimmedName && !selectedApps.includes(trimmedName)) {
      setSelectedApps([...selectedApps, trimmedName]);
      setManualAppName('');
    } else if (selectedApps.includes(trimmedName)) {
      alert(`${trimmedName} is already selected.`);
    }
  };
  
  const handleAddUrl = () => {
    const trimmedUrl = currentUrlInput.trim();
    if (trimmedUrl && !blockedUrls.includes(trimmedUrl)) {
      if (trimmedUrl.includes('.') || trimmedUrl.startsWith('http')) {
        setBlockedUrls([...blockedUrls, trimmedUrl]);
        setCurrentUrlInput('');
      } else {
        alert('Please enter a valid URL or domain name.');
      }
    } else if (blockedUrls.includes(trimmedUrl)) {
      alert(`URL '${trimmedUrl}' is already added.`);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedApps.length === 0) {
      alert('Please select at least one app');
      return;
    }
    
    const newSession = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      duration,
      apps: selectedApps,
      amount,
      status: 'in-progress' as 'in-progress',
      distractions: 0,
    };
    
    setCurrentSession(newSession);
    addSession(newSession);
    
    navigate('/payment');
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Focus Session</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Your Focus Apps</CardTitle>
              <CardDescription>
                Select the applications you'll be using during this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {apps.map((app) => (
                  <div key={app.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={app.id}
                      checked={selectedApps.includes(app.name)}
                      onCheckedChange={() => handleAppToggle(app.name)}
                    />
                    <Label htmlFor={app.id} className="cursor-pointer">
                      {app.name}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 mt-4 pt-4 border-t">
                <Input
                  placeholder="Add custom app..."
                  value={manualAppName}
                  onChange={(e) => setManualAppName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddManualApp(); } }}
                />
                <Button type="button" onClick={handleAddManualApp} variant="secondary">
                  Add App
                </Button>
              </div>
              {selectedApps.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Label className="font-medium">Selected Apps:</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    {selectedApps.map((app) => (
                      <li key={app}>{app}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Block Websites</CardTitle>
              <CardDescription>
                Enter URLs or domain names to block during your session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="e.g., youtube.com or news.com"
                  value={currentUrlInput}
                  onChange={(e) => setCurrentUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
                />
                <Button type="button" onClick={handleAddUrl} variant="secondary">
                  Add URL
                </Button>
              </div>
              {blockedUrls.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Label className="font-medium">Blocked URLs/Domains:</Label>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    {blockedUrls.map((url, index) => (
                      <li key={`${url}-${index}`}>{url}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Session Duration</CardTitle>
              <CardDescription>
                How long do you want your focus session to be?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="duration">Duration</Label>
                  <span className="text-muted-foreground">{duration} minutes</span>
                </div>
                <Slider
                  id="duration"
                  min={5}
                  max={120}
                  step={5}
                  value={[duration]}
                  onValueChange={(values) => setDuration(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Stake Amount</CardTitle>
              <CardDescription>
                How much do you want to stake for this session?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (ETH)</Label>
                <Input
                  id="amount"
                  type="number"
                  max={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">
                  If you complete your session successfully, you'll retain this amount.
                  Otherwise, it will be donated to charity.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Button type="submit" className="w-full">
            Start Session
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewSession;
