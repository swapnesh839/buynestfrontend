"use client"
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User, MapPin, Lock, Settings, CheckCircle, AlertCircle, ArrowLeftCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

export default function usersignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    confirmPassword: '',
    marketingPreferences: [] as string[],
    agreeTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        break
      case 2:
        if (!formData.addressLine1) newErrors.addressLine1 = "Address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
        if (!formData.country) newErrors.country = "Country is required"
        break
      case 3:
        if (!formData.password) newErrors.password = "Password is required"
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
        break
      case 4:
        if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions"
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep() && step < 5) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // Here you would typically handle the form submission
      console.log('Form submitted:', formData)
    }
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    return strength
  }
  const router =useRouter()
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center"><User className="mr-2 text-[#00A19C]" /> Personal Information</CardTitle>
              <CardDescription>Please provide your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center"><MapPin className="mr-2 text-[#00A19C]" /> Address Details</CardTitle>
              <CardDescription>Where should we deliver your orders?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={(e) => updateFormData('addressLine1', e.target.value)}
                  required
                />
                {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) => updateFormData('addressLine2', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    required
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    required
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => updateFormData('country', value)}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center"><Lock className="mr-2 text-[#00A19C]" /> Account Security</CardTitle>
              <CardDescription>Create a secure password for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <div className="flex mt-1 space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 w-1/4 rounded-full ${
                        passwordStrength(formData.password) >= level
                          ? 'bg-[#00A19C]'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength(formData.password) - 1] || 'Very Weak'}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
              </p>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center"><Settings className="mr-2 text-[#00A19C]" /> Preferences and Confirmation</CardTitle>
              <CardDescription>Almost done! Just a few more details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Marketing Preferences</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Email', 'SMS', 'Phone', 'Mail'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox
                        id={`pref-${pref.toLowerCase()}`}
                        onCheckedChange={(checked) => {
                          const newPrefs = checked
                            ? [...formData.marketingPreferences, pref]
                            : formData.marketingPreferences.filter((p) => p !== pref)
                          updateFormData('marketingPreferences', newPrefs)
                        }}
                      />
                      <Label htmlFor={`pref-${pref.toLowerCase()}`}>{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => updateFormData('agreeTerms', checked as boolean)}
                  required
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
            </CardContent>
          </>
        )
      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center"><CheckCircle className="mr-2 text-[#00A19C]" /> Review Your Information</CardTitle>
              <CardDescription>Please review your information before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <h3 className="font-semibold">Personal Information</h3>
                  <p>Name: {formData.firstName} {formData.lastName}</p>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>{formData.addressLine1}</p>
                  <p>{formData.addressLine2}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <p>{formData.country}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Marketing Preferences</h3>
                <p>{formData.marketingPreferences.join(', ') || 'None selected'}</p>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy.
                </AlertDescription>
              </Alert>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white flex items-center justify-center w-full fixed top-0 left-0 h-screen z-[1000]">
      <Card className="w-full h-full flex items-center m-auto justify-center relative">
      <ArrowLeftCircle className='absolute top-0 left-0 m-3 cursor-pointer' color='#00A19C' onClick={()=>{router.back()}}/>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Progress value={(step / 5) * 100} className="w-full" />
          </div>
          {renderStep()}
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {step < 5 ? (
              <Button type="button" onClick={handleNext} className="bg-[#00A19C] hover:bg-[#008B87]">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-[#00A19C] hover:bg-[#008B87]">
                Complete Registration
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}