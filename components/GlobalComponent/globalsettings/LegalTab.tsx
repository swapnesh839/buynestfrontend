"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from '@/components/ui/textarea'

const LegalTab = () => {
    
  const [privacyPolicy, setPrivacyPolicy] = useState('Your privacy is important to us...')
  const [termsOfService, setTermsOfService] = useState('By using our service, you agree...')
  return (
    <Card>
              <CardHeader>
                <CardTitle>Legal Settings</CardTitle>
                <CardDescription>Configure privacy policy and terms of service.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="privacy-policy">Privacy Policy</Label>
                  <Textarea id="privacy-policy" value={privacyPolicy} onChange={(e) => setPrivacyPolicy(e.target.value)} rows={10} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms-of-service">Terms of Service</Label>
                  <Textarea id="terms-of-service" value={termsOfService} onChange={(e) => setTermsOfService(e.target.value)} rows={10} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enable-cookie-consent" defaultChecked />
                  <Label htmlFor="enable-cookie-consent">Enable Cookie Consent Banner</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookie-consent-text">Cookie Consent Text</Label>
                  <Textarea id="cookie-consent-text" defaultValue="This website uses cookies to ensure you get the best experience on our website." />
                </div>
              </CardContent>
            </Card>
  )
}

export default LegalTab