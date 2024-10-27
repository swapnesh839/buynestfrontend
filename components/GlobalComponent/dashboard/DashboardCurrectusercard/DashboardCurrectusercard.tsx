"use client"
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 3000 },
    { name: 'Mar', users: 5000 },
    { name: 'Apr', users: 2780 },
    { name: 'May', users: 1890 },
    { name: 'Jun', users: 2390 },
    { name: 'Jul', users: 3490 },
];

export default function UserDashboard() {
    return (
        <div className='p-3 bg-white'>
            <div className="text-4xl font-bold text-[#00a7a7] mb-4">13,561</div>
            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00a7a7" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#00a7a7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#00a7a7"
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}