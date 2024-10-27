import DashboardAreaChart from '@/components/GlobalComponent/dashboard/DashboardAreaChart/DashboardAreaChart'
import DashboardCurrectusercard from '@/components/GlobalComponent/dashboard/DashboardCurrectusercard/DashboardCurrectusercard'
import Dashboardprofittracker from '@/components/GlobalComponent/dashboard/Dashboardprofittracker/Dashboardprofittracker'
import DashboardRadarChart from '@/components/GlobalComponent/dashboard/DashboardRadarChart/DashboardRadarChart'
import React from 'react'
const data = [
  {
    "Month": "january",
    "sale": 4000,
    // "pv": 2400,
    // "amt": 2400
  },
  {
    "Month": "February",
    "sale": 3000,
    // "pv": 1398,
    // "amt": 7210
  },
  {
    "Month": "March",
    "sale": 2000,
    // "pv": 9800,
    // "amt": 2690
  },
  {
    "Month": "April",
    "sale": 2780,
    // "pv": 3908,
    // "amt": 1000
  },
  {
    "Month": "May",
    "sale": 9890,
    // "pv": 2800,
    // "amt": 2181
  },
  {
    "Month": "June",
    "sale": 2390,
    // "pv": 3800,
    // "amt": 2500
  },
  {
    "Month": "July",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
  {
    "Month": "August",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
  {
    "Month": "September",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
  {
    "Month": "October",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
  {
    "Month": "November",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
  {
    "Month": "December",
    "sale": 3490,
    // "pv": 4300,
    // "amt": 9090
  },
]

const page = () => {
  return (
    <div className='grid grid-cols-12 gap-3 p-3'>
      <div className="col-span-12 grid grid-cols-12 gap-3">
        <div className='col-span-12'>
          <Dashboardprofittracker />
        </div>
        <div className='col-span-12 grid grid-cols-12 gap-3'>
        <div className='col-span-12 lg:col-span-4'>
          <DashboardRadarChart />
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <DashboardRadarChart />
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <DashboardRadarChart />
        </div>
        </div>
      </div>
      <div className='col-span-12'>
        <DashboardAreaChart data={data} />
      </div>
      <div className='col-span-12 md:col-span-4'>
        <DashboardCurrectusercard/>
      </div>
    </div>
  )
}

export default page