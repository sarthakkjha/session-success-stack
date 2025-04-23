import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, LineChart } from '@/components/ui/custom-charts'; // Updated import
import { useApp } from '@/context/app-context';
import { CheckCircle, Clock, DollarSign, XCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, sessions, setSessions } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockSessions = [
      {
        id: '1',
        date: '2025-04-08',
        duration: 60,
        apps: ['Chrome', 'VS Code', 'Slack'],
        amount: 5,
        status: 'success',
        distractions: 1,
      },
      {
        id: '2',
        date: '2025-04-07',
        duration: 45,
        apps: ['Chrome', 'VS Code'],
        amount: 3,
        status: 'failed',
        distractions: 4,
      },
      {
        id: '3',
        date: '2025-04-06',
        duration: 30,
        apps: ['Chrome', 'Notion', 'Slack'],
        amount: 2,
        status: 'success',
        distractions: 0,
      },
    ];
    
    setSessions(mockSessions as any);
  }, [setSessions]);
  
  const statsData = {
    totalSuccessful: sessions.filter(s => s.status === 'success').length,
    totalFailed: sessions.filter(s => s.status === 'failed').length,
    totalHours: sessions.reduce((acc, s) => acc + s.duration, 0) / 60,
    totalAmount: sessions.reduce((acc, s) => acc + s.amount, 0),
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your focus sessions and productivity stats.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/new-session">
            <Button>Start New Session</Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Sessions
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalSuccessful}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 1}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Sessions
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalFailed}</div>
            <p className="text-xs text-muted-foreground">
              -{Math.floor(Math.random() * 10) + 1}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 1}% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount (ETH)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.0001 ETH</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 1}% from last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Focus Time</CardTitle>
            <CardDescription>
              Hours spent focused in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate by App</CardTitle>
            <CardDescription>
              Which apps you're most productive with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Sessions */}
      <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Date</th>
              <th className="text-left py-3 px-4 font-medium">Duration</th>
              <th className="text-left py-3 px-4 font-medium">Apps</th>
              <th className="text-left py-3 px-4 font-medium">Amount</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Distractions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b">
                <td className="py-3 px-4">
                  {new Date(session.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{session.duration} mins</td>
                <td className="py-3 px-4">{session.apps.join(', ')}</td>
                <td className="py-3 px-4">${session.amount}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs ${
                    session.status === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {session.status === 'success' ? 'Success' : 'Failed'}
                  </span>
                </td>
                <td className="py-3 px-4">{session.distractions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
