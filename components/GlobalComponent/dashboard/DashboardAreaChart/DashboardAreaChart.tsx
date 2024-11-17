'use client'

import React from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

// interface props {
//   Month: string
//   sale: number
// }
const data = [
  {
    "Month": "january",
    "sale": 4000,
  },
  {
    "Month": "February",
    "sale": 3000,
  },
  {
    "Month": "March",
    "sale": 2000,
  },
  {
    "Month": "April",
    "sale": 2780,
  },
  {
    "Month": "May",
    "sale": 9890,
  },
  {
    "Month": "June",
    "sale": 2390,
  },
  {
    "Month": "July",
    "sale": 3490,
  },
  {
    "Month": "August",
    "sale": 3490,
  },
  {
    "Month": "September",
    "sale": 3490,
  },
  {
    "Month": "October",
    "sale": 3490,
  },
  {
    "Month": "November",
    "sale": 3490,
  },
  {
    "Month": "December",
    "sale": 3490,
  },
]

export default function DashboardAreaChart() {
  return (
    <div className='p-4 shadow-md border rounded-md bg-white'>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorsale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A7A7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00A7A7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Month" 
          interval={0} 
          className='text-sm'
          // angle={-45}
          />
          <YAxis 
          className='text-sm'
          dataKey="sale" 
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="sale" stroke="#00A7A7" fillOpacity={1} fill="url(#colorsale)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}