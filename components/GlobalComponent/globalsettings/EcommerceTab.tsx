"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const EcommerceTab = () => {
    const [defaultCurrency, setDefaultCurrency] = useState('USD')
    const [taxRate, setTaxRate] = useState(10)
    const [freeShippingThreshold, setFreeShippingThreshold] = useState(50)
    return (
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
    )
}

export default EcommerceTab