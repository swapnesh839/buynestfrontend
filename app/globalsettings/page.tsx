"use client"
import React, { useState } from 'react'
import { Save, Globe, Zap, Database, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from '@/components/ui/checkbox'

export default function GlobalSettings() {
  const [siteName, setSiteName] = useState('Beatsflex')
  const [siteDescription, setSiteDescription] = useState('Your one-stop shop for all things audio')
  const [logoUrl, setLogoUrl] = useState('/logo.png')
  const [timezone, setTimezone] = useState('UTC')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [passwordMinLength, setPasswordMinLength] = useState(8)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [defaultCurrency, setDefaultCurrency] = useState('USD')
  const [taxRate, setTaxRate] = useState(10)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50)
  const [contentModerationEnabled, setContentModerationEnabled] = useState(true)
  const [analyticsTrackingId, setAnalyticsTrackingId] = useState('UA-XXXXXXXXX-X')
  const [smtpHost, setSmtpHost] = useState('smtp.example.com')
  const [smtpPort, setSmtpPort] = useState(587)
  const [smtpUsername, setSmtpUsername] = useState('noreply@beatsflex.com')
  const [smtpPassword, setSmtpPassword] = useState('********')
  const [cacheLifetime, setCacheLifetime] = useState(3600)
  const [backupFrequency, setBackupFrequency] = useState('daily')
  const [privacyPolicy, setPrivacyPolicy] = useState('Your privacy is important to us...')
  const [termsOfService, setTermsOfService] = useState('By using our service, you agree...')
  const [defaultLanguage, setDefaultLanguage] = useState('en')

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    alert({
      title: "Settings Saved",
      description: "Your global settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className='p-2 bg-white'>
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
          <TabsList>
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
          </TabsContent>
          <TabsContent value="security">
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
          </TabsContent>
          <TabsContent value="ecommerce">
            <Card>
              <CardHeader>
                <CardTitle>E-commerce Settings</CardTitle>
                <CardDescription>Configure currency, tax, and shipping options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-shipping-threshold">Free Shipping Threshold</Label>
                  <Input id="free-shipping-threshold" type="number" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(parseFloat(e.target.value))} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content">
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
          </TabsContent>
          <TabsContent value="seo">
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
          </TabsContent>
          <TabsContent value="email">
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
          </TabsContent>
          <TabsContent value="performance">
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
          </TabsContent>
          <TabsContent value="legal">
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
          </TabsContent>
          <TabsContent value="localization">
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