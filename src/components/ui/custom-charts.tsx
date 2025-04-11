
import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line } from 'recharts';

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
  { name: 'Chrome', success: 4, failure: 1 },
  { name: 'VS Code', success: 5, failure: 0 },
  { name: 'Slack', success: 3, failure: 2 },
  { name: 'Notion', success: 2, failure: 1 },
];

export const LineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={sampleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const BarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={appData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="success" fill="#8884d8" />
        <Bar dataKey="failure" fill="#82ca9d" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
