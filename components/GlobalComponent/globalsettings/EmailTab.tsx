"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from '@/components/ui/switch'

const EmailTab = () => {
    const [smtpHost, setSmtpHost] = useState('smtp.example.com')
    const [smtpPort, setSmtpPort] = useState(587)
    const [smtpUsername, setSmtpUsername] = useState('noreply@beatsflex.com')
    const [smtpPassword, setSmtpPassword] = useState('********')
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email server and notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" type="number" value={smtpPort} onChange={(e) => setSmtpPort(parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input id="smtp-username" value={smtpUsername} onChange={(e) => setSmtpUsername(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input id="smtp-password" type="password" value={smtpPassword} onChange={(e) => setSmtpPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="from-email">From Email Address</Label>
                    <Input id="from-email" type="email" defaultValue="noreply@beatsflex.com" />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-email-notifications" defaultChecked />
                    <Label htmlFor="enable-email-notifications">Enable Email Notifications</Label>
                </div>
            </CardContent>
        </Card>
    )
}

export default EmailTab