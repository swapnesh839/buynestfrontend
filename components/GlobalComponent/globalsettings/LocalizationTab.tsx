"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'


const LocalizationTab = () => {
    
  const [defaultLanguage, setDefaultLanguage] = useState('en')
    return (
        <Card>
            <CardHeader>
                <CardTitle>Localization Settings</CardTitle>
                <CardDescription>Configure language and regional settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="default-language">Default Language</Label>
                    <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                        <SelectTrigger id="default-language">
                            <SelectValue placeholder="Select default language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enable-auto-translation" defaultChecked />
                    <Label htmlFor="enable-auto-translation">Enable Auto-Translation</Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12">
                        <SelectTrigger id="time-format">
                            <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="12">12-hour</SelectItem>
                            <SelectItem value="24">24-hour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Enabled Languages</Label>
                    <div className="flex flex-wrap gap-2">
                        {['English', 'Spanish', 'French', 'German', 'Japanese'].map((lang) => (
                            <div key={lang} className="flex items-center space-x-2">
                                <Checkbox id={`lang-${lang.toLowerCase()}`} />
                                <Label htmlFor={`lang-${lang.toLowerCase()}`}>{lang}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LocalizationTab