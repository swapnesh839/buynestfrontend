import DashboardAreaChart from '@/components/GlobalComponent/dashboard/DashboardAreaChart/DashboardAreaChart'
import DashboardCurrectusercard from '@/components/GlobalComponent/dashboard/DashboardCurrectusercard/DashboardCurrectusercard'
import Dashboardprofittracker from '@/components/GlobalComponent/dashboard/Dashboardprofittracker/Dashboardprofittracker'
import DashboardRadarChart from '@/components/GlobalComponent/dashboard/DashboardRadarChart/DashboardRadarChart'
import React from 'react'

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
        <DashboardAreaChart />
      </div>
      <div className='col-span-12 md:col-span-4'>
        <DashboardCurrectusercard/>
      </div>
    </div>
  )
}

export default page