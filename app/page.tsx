// import Sidebar from '@/components/GlobalComponent/Sidebar/Sidebar'
import React from 'react'
// import AuthbashedRouting from './AuthbashedRouting'
import BeatsCarousel from '@/components/GlobalComponent/BeatsCarousel/BeatsCarousel'
import Sidebar from '@/components/GlobalComponent/Sidebar/Sidebar'

const page = () => {
  return (
    <div>
      <Sidebar/>
      <BeatsCarousel/>
      {/* <AuthbashedRouting>
        <></>
      </AuthbashedRouting> */}
    </div>
  )
}

export default page