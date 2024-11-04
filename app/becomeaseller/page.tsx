'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, User, Briefcase, Package, DollarSign, Upload, CheckCircle, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const steps = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'business', title: 'Business Information', icon: Briefcase },
  { id: 'products', title: 'Product Categories', icon: Package },
  { id: 'financial', title: 'Financial Information', icon: DollarSign },
  { id: 'documents', title: 'Document Upload', icon: Upload },
  { id: 'review', title: 'Review and Submit', icon: CheckCircle },
]

export default function BecomeASeller() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    categories: [] as string[],
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    taxId: '',
    idProof: null as File | null,
    businessLicense: null as File | null,
    taxDocument: null as File | null,
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: string | boolean | string[] | File | null) => {
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
        if (!formData.businessName) newErrors.businessName = "Business name is required"
        if (!formData.businessType) newErrors.businessType = "Business type is required"
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
        if (!formData.country) newErrors.country = "Country is required"
        break
      case 3:
        if (formData.categories.length === 0) newErrors.categories = "Select at least one category"
        break
      case 4:
        if (!formData.bankName) newErrors.bankName = "Bank name is required"
        if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
        if (!formData.routingNumber) newErrors.routingNumber = "Routing number is required"
        if (!formData.taxId) newErrors.taxId = "Tax ID is required"
        break
      case 5:
        if (!formData.idProof) newErrors.idProof = "Government-issued ID is required"
        if (!formData.businessLicense) newErrors.businessLicense = "Business license is required"
        if (!formData.taxDocument) newErrors.taxDocument = "Tax document is required"
        break
      case 6:
        if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions"
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep() && step < steps.length) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // Here you would typically handle the form submission
      console.log('Form submitted:', formData)
      alert({
        title: "Application Submitted",
        description: "Your seller application has been submitted successfully. We'll review it and get back to you soon.",
      })
    }
  }

  const renderStep = () => {
    const StepIcon = steps[step - 1].icon
    return (
      <>
        <CardHeader>
          <CardTitle className="flex items-center"><StepIcon className="mr-2 text-[#00A19C]" /> {steps[step - 1].title}</CardTitle>
          <CardDescription>Step {step} of {steps.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
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
            </>
          )}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  required
                />
                {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Business Registration Number (if applicable)</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                  <Label htmlFor="state">State</Label>
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
                  <Label htmlFor="zipCode">ZIP Code</Label>
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
            </>
          )}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label>Product Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Headphones', 'Speakers', 'Microphones', 'Accessories', 'DJ Equipment', 'Studio Gear'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.toLowerCase()}`}
                        onCheckedChange={(checked) => {
                          const newCategories = checked
                            ? [...formData.categories, category]
                            : formData.categories.filter((c) => c !== category)
                          updateFormData('categories', newCategories)
                        }}
                      />
                      <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                    </div>
                  ))}
                </div>
                {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => updateFormData('bankName', e.target.value)}
                  required
                />
                {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData('accountNumber', e.target.value)}
                  required
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => updateFormData('routingNumber', e.target.value)}
                  required
                />
                {errors.routingNumber && <p className="text-red-500 text-sm">{errors.routingNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / SSN</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => updateFormData('taxId', e.target.value)}
                  required
                />
                {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="idProof">Government-issued  ID</Label>
                <Input
                  id="idProof"
                  type="file"
                  onChange={(e) => updateFormData('idProof', e.target.files?.[0] || null)}
                  required
                />
                {errors.idProof && <p className="text-red-500 text-sm">{errors.idProof}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License</Label>
                <Input
                  id="businessLicense"
                  type="file"
                  onChange={(e) => updateFormData('businessLicense', e.target.files?.[0] || null)}
                  required
                />
                {errors.businessLicense && <p className="text-red-500 text-sm">{errors.businessLicense}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxDocument">Tax Document</Label>
                <Input
                  id="taxDocument"
                  type="file"
                  onChange={(e) => updateFormData('taxDocument', e.target.files?.[0] || null)}
                  required
                />
                {errors.taxDocument && <p className="text-red-500 text-sm">{errors.taxDocument}</p>}
              </div>
            </>
          )}
          {step === 6 && (
            <>
              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Personal Information</h4>
                    <p>Name: {formData.firstName} {formData.lastName}</p>
                    <p>Email: {formData.email}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Business Information</h4>
                    <p>Business Name: {formData.businessName}</p>
                    <p>Business Type: {formData.businessType}</p>
                    <p>Address: {formData.address}, {formData.city}, {formData.state}, {formData.zipCode}</p>
                    <p>Country: {formData.country}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Product Categories</h4>
                  <p>{formData.categories.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-medium">Financial Information</h4>
                  <p>Bank: {formData.bankName}</p>
                  <p>Account Number: ****{formData.accountNumber.slice(-4)}</p>
                  <p>Tax ID: ****{formData.taxId.slice(-4)}</p>
                </div>
                <div>
                  <h4 className="font-medium">Uploaded Documents</h4>
                  <p>Government-issued ID: {formData.idProof?.name}</p>
                  <p>Business License: {formData.businessLicense?.name}</p>
                  <p>Tax Document: {formData.taxDocument?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => updateFormData('acceptTerms', checked as boolean)}
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By clicking &quot;Submit Application&quot;, you agree to our Terms of Service and Privacy Policy.
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Become a Seller on Beatsflex</h1>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Progress value={(step / steps.length) * 100} className="w-full" />
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
            {step < steps.length ? (
              <Button type="button" onClick={handleNext} className="bg-[#00A19C] hover:bg-[#008B87]">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-[#00A19C] hover:bg-[#008B87]">
                Submit Application
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Need help? Contact our seller support team at <a href="mailto:seller-support@beatsflex.com" className="text-[#00A19C] hover:underline">seller-support@beatsflex.com</a></p>
      </div>
    </div>
  )
}