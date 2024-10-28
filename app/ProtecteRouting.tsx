import Header from '@/components/GlobalComponent/Header/Header'
import Sidebar from '@/components/GlobalComponent/Sidebar/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const ProtecteRouting = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen overflow-hidden flex'>
      <Sidebar />
      <ScrollArea className='w-full'>
          <Header />
          {children}
      </ScrollArea>
    </div>
  )
}

export default ProtecteRouting