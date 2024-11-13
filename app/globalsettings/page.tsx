"use client"
import React from 'react'
import { Save, Globe, Zap, Database } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import GeneralTab from "@/components/GlobalComponent/globalsettings/GeneralTab"
import PerformanceTab from "@/components/GlobalComponent/globalsettings/PerformanceTab"
import SecurityTab from '@/components/GlobalComponent/globalsettings/SecurityTab'
import EcommerceTab from '@/components/GlobalComponent/globalsettings/EcommerceTab'
import ContentTab from '@/components/GlobalComponent/globalsettings/ContentTab'
import SeoTab from '@/components/GlobalComponent/globalsettings/SeoTab'
import EmailTab from '@/components/GlobalComponent/globalsettings/EmailTab'
import LegalTab from '@/components/GlobalComponent/globalsettings/LegalTab'
import LocalizationTab from '@/components/GlobalComponent/globalsettings/LocalizationTab'


export default function GlobalSettings() {

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    alert({
      title: "Settings Saved",
      description: "Your global settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto p-3">
      <div className='p-3 bg-white border shadow-md rounded-md'>
        <h1 className="text-3xl font-bold mb-6">Global Settings</h1>

        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Site Performance</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good</div>
              <Progress value={75} className="w-[80%]" />
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Requests</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">Processed this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className='w-full justify-around overflow-scroll scrollbar-hidden px-2'>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          <TabsContent value="security">
            <SecurityTab/>
          </TabsContent>
          <TabsContent value="ecommerce">
            <EcommerceTab/>
          </TabsContent>
          <TabsContent value="content">
            <ContentTab/>
          </TabsContent>
          <TabsContent value="seo">
            <SeoTab/>
          </TabsContent>
          <TabsContent value="email">
            <EmailTab/>
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceTab/>
          </TabsContent>
          <TabsContent value="legal">
            <LegalTab/>
          </TabsContent>
          <TabsContent value="localization">
            <LocalizationTab/>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-[#00A19C] hover:bg-[#008B87]">
            <Save className="mr-2 h-4 w-4" /> Save All Settings
          </Button>
        </div>
      </div>
    </div>
  )
}