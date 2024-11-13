"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

const ContentTab = () => {
    const [contentModerationEnabled, setContentModerationEnabled] = useState(true)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>Configure content moderation and management options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch id="content-moderation" checked={contentModerationEnabled} onCheckedChange={setContentModerationEnabled} />
                    <Label htmlFor="content-moderation">Enable Content Moderation</Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="moderation-keywords">Moderation Keywords (comma-separated)</Label>
                    <Textarea id="moderation-keywords" placeholder="Enter keywords to flag for moderation" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
                    <Input id="max-upload-size" type="number" defaultValue={10} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="allowed-file-types">Allowed File Types (comma-separated)</Label>
                    <Input id="allowed-file-types" defaultValue="jpg,png,gif,pdf,mp3" />
                </div>
            </CardContent>
        </Card>
    )
}

export default ContentTab