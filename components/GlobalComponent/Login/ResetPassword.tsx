"use client"
import { AuthFormState } from '@/app/login/page'
import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, Shield } from 'lucide-react'
import React, { useState } from 'react'

const ResetPassword = ({ setFormState, formState }: {
    formState: AuthFormState,
    setFormState: React.Dispatch<React.SetStateAction<AuthFormState>>
}) => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [state] = useState(false)
    const resendOtp = () => {
        alert({
            title: "New Code Sent",
            description: "A new verification code has been sent to your email.",
        })
    }
    return (
        <>
            {state ?
                <>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your email to receive password reset instructions
                        </CardDescription>
                    </CardHeader>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                            Reset Password
                        </Button>
                    </div>
                </>
                :
                <>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Verify Your Identity
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter the verification code sent to your email
                        </CardDescription>
                    </CardHeader>
                    <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <div className="relative">
                            <Shield size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                id="otp"
                                type="text"
                                placeholder="Enter verification code"
                                className="pl-10"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                            Verify
                        </Button>
                        <Button variant="link" className="mt-2 w-full" onClick={resendOtp}>
                            Resend verification code
                        </Button>
                    </div>
                </>
            }
            <Button
                variant="link"
                className="text-sm text-[#00A19C] text-center mb-2 w-full"
                onClick={() => setFormState(formState === 'login' ? 'resetPassword' : 'login')}
            >
                {formState === 'login' ? (
                    "Forgot password?"
                ) : (
                    <><ArrowLeft className="mr-2 h-4 w-4" /> Back to Login</>
                )}
            </Button>
        </>
    )
}

export default ResetPassword