'use client';

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,Radar, Legend } from 'recharts';

interface DataItem {
  subject: string;
  sell?: number;
  fullMark: number;
}

const data: DataItem[] = [
  { subject: "Bhubaneswar", sell: 210, fullMark: 150 },
  { subject: "Delhi", sell: 10, fullMark: 150 },
  { subject: "Bangalore", sell: 160, fullMark: 150 },
  { subject: "Hydrabad", sell: 180, fullMark: 150 },
  { subject: "Jaipur", sell: 140, fullMark: 150 }
];

export default function DashboardRadarChart() {
  return (
    <ResponsiveContainer className="shadow-md border rounded-md bg-white" width="100%" minHeight={250}>
      <RadarChart outerRadius="60%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" stroke="#334155" />
        {/* <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#94a3b8" /> */}
        <Radar name="Sell" dataKey="sell" stroke="green" fill="green" fillOpacity={0.6} />
        {/* <Radar name="Student B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} /> */}
        <Legend  margin={{ top: 50, right: 5, bottom: 5, left: 5 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
