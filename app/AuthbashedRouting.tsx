"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { NavConstraints } from '@/Constraints/NavConstraints';
import Unauthorizedimg from "@/assets/Unauthorized.png"
import Reduxprovider from '@/config/redux/reduxprovider';

// type AllowedUserType = 'admin' | 'superadmin';

interface AuthbashedRoutingtype {
  usertype: "user" | "admin" | "superadmin" 
  // | "subadmin",
  children: React.ReactNode;
}
const authobj = {
  user:"UserNav",
  admin:"AdminNav",
  superadmin:"SuperAdminNav"
}
const AuthbashedRouting = ({ children, usertype }: AuthbashedRoutingtype) => {
  const [isAuthorized, setIsauthorized] = useState(false)
  console.log(children, usertype);
  useEffect(() => {
    if (authobj[usertype] in NavConstraints) {
      console.log(`Navigation for ${usertype}:`, authobj[usertype]);
      setIsauthorized(true); 
    } else {
      console.log("User type not authorized");
      setIsauthorized(false);
    }
  }, [usertype]);

  const Authpage = () => {
    return (
      <Reduxprovider>
        {isAuthorized ?
          children :
          <div className='flex items-center justify-center h-screen w-full z-[1001] fixed top-0 left-0'>
            <Image className='w-3/4 max-w-96 min-w-40' src={Unauthorizedimg} alt="Unauthorized" width={500} height={300} />
          </div>}
      </Reduxprovider>
    )
  }

  return (
    // <div>{children}</div>
    <div>
      <Authpage />
    </div>
  )
}

export default React.memo(AuthbashedRouting)