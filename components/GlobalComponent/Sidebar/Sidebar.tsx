"use client"
import * as React from "react"
import needhelpimg from "@/assets/NeedHelp.png"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Home, Compass, Heart, ShoppingCart, Store, Plus } from "lucide-react"
// import { Home, Compass, Heart, ShoppingCart, Store, User, Clock, MessageSquare, Settings, Plus } from "lucide-react"
import Link from "next/link"
import { NavConstraints } from "@/Constraints/NavConstraints"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import img from "@/app/favicon.ico"
import { Plus } from "lucide-react"

export default function Sidebar() {
  const usertype = "user"
  const router = useRouter()
  return (
    <div className={"h-screen min-w-[240px] max-w-[300px] border-r bg-white hidden md:flex flex-col"}>
      <div className="p-4 border-b bg-[#00a7a7] text-white">
        <div onClick={() => { router.push(NavConstraints.UserNav.home.path) }} className="flex items-center gap-2">
          <Image src={img} alt="Beatsflex" className="w-8 h-8" />
          <h1 className="text-xl font-semibold cursor-pointer">Beatsflex.</h1>
        </div>
      </div>
      <ScrollArea className="h-full">
        <nav className="flex flex-col gap-1">
          {Object.entries(NavConstraints.UserNav).map(([key, { icon, path: href, id, UserType }]) => {
            if (UserType.includes(usertype)) {
              return (
                <NavItem
                  key={id} // Use id as the key for better performance and avoiding duplication issues
                  icon={icon}
                  // label={id} 
                  label={key.charAt(0).toUpperCase() + key.slice(1)} 
                  href={href} // Correctly passing href
                />
              )
            }
            else {
              return null
            }

          })}
          {/* <NavItem href={NavConstraints.home.path} icon={Home} label="Home" />
          <NavItem href={NavConstraints.explore.path} icon={Compass} label="Explore" />
          <NavItem href={NavConstraints.saved.path} icon={Heart} label="Saved" />
          <NavItem href={NavConstraints.cart.path} icon={ShoppingCart} label="Cart" />
          <NavItem href={NavConstraints.selling.path} icon={Store} label="Selling" />
          <NavItem href={NavConstraints.profile.path} icon={User} label="Profile" />
          <NavItem href={NavConstraints.purchasehistory.path} icon={Clock} label="Purchase History" />
          <NavItem href={NavConstraints.contact.path} icon={MessageSquare} label="Contact us" />
          <NavItem href={NavConstraints.settings.path} icon={Settings} label="Settings" /> */}
        </nav>
      </ScrollArea>
      <div className="justify-center align-middle flex p-1 relative">
        <div className="w-full gap-2 text-[white] bg-[#00a7a7] relative px-3 py-5 rounded-sm">
          <Image className="absolute bottom-0 right-0 w-20 h-20" src={needhelpimg} alt="Need Help" width={100} height={100} />
          <Image className="absolute top-0 left-0 rotate-180 w-20 h-20" src={needhelpimg} alt="Need Help" width={100} height={100} />
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <div className="p-1 bg-white rounded-full"><Plus size={26} className="bg-[green] text-white rounded-full" /></div>
            <span className="font-bold">Need Help ?</span>
            <span className="text-xs">We are here to help 24/7</span>
            <Button className="bg-[#D9F4FF] hover:bg-[#D9F4FF] hover:scale-105 transform transition-all duration-300 hover:text-[#183e3e] text-[#016170]">Customer Service</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, label, href }: { icon: React.ElementType; label: string, href: string }) {
  const path = usePathname()
  const Active = path === href
  return (
    <div className={`relative mt-1 hover:bg-[#009393]/30 rounded ${Active ? "bg-[#009393]/30" : ""}`}>
      {Active && <div style={{ height: "80%" }} className="bg-[#009393] -translate-y-1/2 w-1.5 absolute left-0 top-1/2 rounded-r-md"></div>}
      <Link href={href} className="w-full px-2 ms-5 justify-start inline-flex items-center gap-2 py-3 ">
        <Icon size={20} />
        {label}
      </Link>
    </div>
  )
}