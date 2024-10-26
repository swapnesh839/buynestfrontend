import * as React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Headphones, Home, Compass, Heart, ShoppingCart, Store, User, Clock, MessageSquare, Settings, Plus } from "lucide-react"

export default function Sidebar() {
  return (
    <div className={"h-screen min-w-[240px] max-w-[300px] border-r"}>
      <div className="p-4 border-b bg-[#00a7a7] text-white">
        <div className="flex items-center gap-2">
          <Headphones size={24} />
          <h1 className="text-xl font-semibold">Beatsflex.</h1>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <NavItem icon={Home} label="Home" />
          <NavItem icon={Compass} label="Explore" />
          <NavItem icon={Heart} label="Saved" />
          <NavItem icon={ShoppingCart} label="Cart" />
          <NavItem icon={Store} label="Selling" />
          <NavItem icon={User} label="Profile" />
          <NavItem icon={Clock} label="Purchase History" />
          <NavItem icon={MessageSquare} label="Contact us" />
          <NavItem icon={Settings} label="Settings" />
        </nav>
      </ScrollArea>
      <div className="p-4 bg-[#e6f7ff] mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-2 text-[#00a7a7]">
          <Plus size={16} />
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold">Need Help</span>
            <span className="text-xs">Customer Service</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-4">
      <Icon size={20} />
      {label}
    </Button>
  )
}