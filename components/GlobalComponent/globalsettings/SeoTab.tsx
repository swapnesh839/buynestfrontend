"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

const SeoTab = () => {
    const [analyticsTrackingId, setAnalyticsTrackingId] = useState('UA-XXXXXXXXX-X')
    return (
        <Card>
            <CardHeader>
                <CardTitle>SEO & Analytics Settings</CardTitle>
                <CardDescription>Configure search engine optimization and analytics tracking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="meta-title">Default Meta Title</Label>
                    <Input id="meta-title" defaultValue="Beatsflex | Your One-Stop Audio Shop" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="meta-description">Default Meta Description</Label>
                    <Textarea id="meta-description" defaultValue="Discover the best audio gear at Beatsflex. We offer a wide range of headphones, speakers, and accessories for music lovers and audiophiles." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="analytics-id">Google Analytics Tracking ID</Label>
                    <Input id="analytics-id" value={analyticsTrackingId} onChange={(e) => setAnalyticsTrackingId(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-sitemap" defaultChecked />
                    <Label htmlFor="enable-sitemap">Auto-generate Sitemap</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-robots" defaultChecked />
                    <Label htmlFor="enable-robots">Enable robots.txt</Label>
                </div>
            </CardContent>
        </Card>
    )
}

export default SeoTab