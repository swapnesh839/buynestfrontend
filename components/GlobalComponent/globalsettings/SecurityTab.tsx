"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox'

const SecurityTab = () => {
    const [passwordMinLength, setPasswordMinLength] = useState(8)
  const [sessionTimeout, setSessionTimeout] = useState(30)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure user account and authentication policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password-min-length">Minimum Password Length</Label>
                    <Input id="password-min-length" type="number" value={passwordMinLength} onChange={(e) => setPasswordMinLength(parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label>Password Complexity Requirements</Label>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="uppercase" />
                            <Label htmlFor="uppercase">Require Uppercase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lowercase" />
                            <Label htmlFor="lowercase">Require Lowercase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="numbers" />
                            <Label htmlFor="numbers">Require Numbers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="special-chars" />
                            <Label htmlFor="special-chars">Require Special Characters</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SecurityTab