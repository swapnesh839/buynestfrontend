import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Summerheadphhones from "@/assets/Home/Summerheadphhones.png"
import SummerHeadphesones from '@/components/GlobalComponent/Home/SummerHeadphesones/SummerHeadphesones'
import HomesectiononeCard from '@/components/GlobalComponent/Home/HomesectiononeCard/HomesectiononeCard'
import Homecarousal from '@/components/GlobalComponent/Home/Homecarousal/Homecarousal'

const page = () => {
  return (
    <div className='grid grid-cols-12 w-full gap-3 p-3'>
      <div className='col-span-7'>
        <HomesectiononeCard/>
        <Homecarousal/>
      </div>
      <div className='sticky top-0 grid grid-cols-1 gap-3 col-span-5'>
        <Card style={{ background: "linear-gradient(90deg, #A1D2FF 0%, #00E0C6 100%)" }} className='min-h-[260px] relative flex flex-col justify-between '>
          <CardHeader className='text-[#016170] text-3xl'>
            Summer headphones from top brands
          </CardHeader>
          <CardContent>
            <div className='flex text-[#016170] justify-between hover:scale-105 transform transition-transform hover:underline transition-100 cursor-pointer items-center max-w-[110px]'>Buy it now <MoveRight size={17} /> </div>
          </CardContent>
          <Image className='absolute -bottom-9 -right-6 w-5/12' src={Summerheadphhones} alt="Placeholder" width={500} height={300} />
        </Card>
        <div >
        <SummerHeadphesones />
        </div>
      </div>
    </div>
  )
}

export default page