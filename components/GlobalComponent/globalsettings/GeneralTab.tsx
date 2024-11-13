"use client"
import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const GeneralTab = () => {
    const [siteName, setSiteName] = useState('Beatsflex')
    const [siteDescription, setSiteDescription] = useState('Your one-stop shop for all things audio')
    const [logoUrl, setLogoUrl] = useState('/logo.png')
    const [timezone, setTimezone] = useState('UTC')
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic site information and appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea id="site-description" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="logo-url">Logo URL</Label>
                    <div className="flex space-x-2">
                        <Input id="logo-url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">America/New_York</SelectItem>
                            <SelectItem value="Europe/London">Europe/London</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralTab