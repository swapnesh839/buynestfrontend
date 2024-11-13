"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PerformanceTab = () => {
    
  const [cacheLifetime, setCacheLifetime] = useState(3600)
  const [backupFrequency, setBackupFrequency] = useState('daily')
    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
                <CardDescription>Configure caching, optimization, and maintenance options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="cache-lifetime">Cache Lifetime (seconds)</Label>
                    <Input id="cache-lifetime" type="number" value={cacheLifetime} onChange={(e) => setCacheLifetime(parseInt(e.target.value))} />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-minification" defaultChecked />
                    <Label htmlFor="enable-minification">Enable CSS/JS Minification</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-gzip" defaultChecked />
                    <Label htmlFor="enable-gzip">Enable GZIP Compression</Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                        <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
                    <Input id="max-upload-size" type="number" defaultValue={10} />
                </div>
            </CardContent>
        </Card>
    )
}

export default PerformanceTab