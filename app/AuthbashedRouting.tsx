"use client"
import Image from 'next/image';
import React from 'react'
import Unauthorizedimg from "@/assets/Unauthorized.png"

// type AllowedUserType = 'admin' | 'superadmin';

interface AuthbashedRoutingtype {
  UserAccess?: ['all'] |['admin' | 'superadmin']|["admin"];
  children: React.ReactNode;
}
const AuthbashedRouting = ({ children, UserAccess = ["all"] }: AuthbashedRoutingtype) => {
  console.log(children, UserAccess);

  const Authpage = () => {
    return (
      <div className='flex items-center justify-center h-screen w-full fixed top-0 left-0'>
        <Image className='w-3/4 max-w-96' src={Unauthorizedimg} alt="Unauthorized" width={500} height={300} />
      </div>
    )
  }

  return (
    // <div>{children}</div>
    <div>
      <Authpage />
    </div>
  )
}

export default AuthbashedRouting