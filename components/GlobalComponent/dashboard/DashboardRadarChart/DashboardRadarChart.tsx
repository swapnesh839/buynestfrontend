'use client';

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,Radar, Legend, Tooltip } from 'recharts';

interface DataItem {
  city: string;
  sell?: number;
  fullMark: number;
}

const data: DataItem[] = [
  { city: "Bhubaneswar", sell: 210, fullMark: 150 },
  { city: "Delhi", sell: 10, fullMark: 150 },
  { city: "Bangalore", sell: 160, fullMark: 150 },
  { city: "Hydrabad", sell: 180, fullMark: 150 },
  { city: "Jaipur", sell: 140, fullMark: 150 }
];

export default function DashboardRadarChart() {
  return (
    <ResponsiveContainer className="shadow-md border bg-white rounded-md" width="100%" minHeight={250}>
      <RadarChart outerRadius="60%" data={data}>
        <PolarGrid stroke="grey" />
        <PolarAngleAxis dataKey="city" stroke="#334155" />
        {/* <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#94a3b8" /> */}
        <Radar name="Sell" dataKey="sell" stroke="#00A7A7" fill="#00A7A7" fillOpacity={0.6} />
        <Tooltip/>
        {/* <Radar name="Student B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} /> */}
        <Legend  margin={{ top: 50, right: 5, bottom: 5, left: 5 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
