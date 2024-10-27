"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Percent, Users, ShoppingCart, MoreHorizontal } from 'lucide-react'

const stats = [
  { 
    title: "Total Sales", 
    subtitle: "+50% Incomes", 
    value: "$278m", 
    icon: TrendingUp, 
    color: "#ff7a5a",
    subtitleColor: "#ff7a5a"
  },
  { 
    title: "Daily Sales", 
    subtitle: "-13% Sales", 
    value: "$421k", 
    icon: Percent, 
    color: "#5b9df8",
    subtitleColor: "#f87171"
  },
  { 
    title: "Daily User", 
    subtitle: "+48% New User", 
    value: "4215", 
    icon: Users, 
    color: "#4ade80",
    subtitleColor: "#4ade80"
  },
  { 
    title: "Product", 
    subtitle: "+25% New Product", 
    value: "548", 
    icon: ShoppingCart, 
    color: "#4338ca",
    subtitleColor: "#4ade80"
  },
  { 
    title: "Expenses", 
    subtitle: "Target Expenses", 
    value: "$219.0", 
    icon: MoreHorizontal, 
    color: "#fbbf24",
    subtitleColor: "#9ca3af"
  },
]

export default function Dashboardprofittracker() {
  return (
    <div className="grid grid-cols-10 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="col-span-10 md:col-span-5 lg:col-span-2 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div 
                className="rounded-full p-3 mb-4" 
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <h3 className="font-semibold text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-xs mb-2" style={{ color: stat.subtitleColor }}>{stat.subtitle}</p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}