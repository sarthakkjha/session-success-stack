
import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, Area, AreaChart as RechartsAreaChart } from 'recharts';

// Sample data for the charts - in a real app this would come from props
const sampleData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2.5 },
  { name: 'Sat', hours: 1 },
  { name: 'Sun', hours: 3.5 },
];

const appData = [
  { name: 'VS Code', success: 5, failure: 0 },
  { name: 'Chrome', success: 4, failure: 1 },
  { name: 'Notion', success: 3, failure: 1 },
  { name: 'Slack', success: 2, failure: 2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-2 rounded-md border border-border">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const LineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="hours" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          activeDot={{ r: 8, strokeWidth: 0, fill: '#8b5cf6' }} 
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const AreaChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="hours" 
          stroke="#8b5cf6" 
          fillOpacity={1} 
          fill="url(#colorHours)" 
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export const BarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={appData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="success" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failure" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
