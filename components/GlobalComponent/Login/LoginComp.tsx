"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { AuthFormState } from '@/app/login/page'
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const LoginComp = ({ setFormState, formState }: {
    formState: AuthFormState,
    setFormState: React.Dispatch<React.SetStateAction<AuthFormState>>
}) => {
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    return (
        <>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Login to Beatsflex
                </CardTitle>
                <CardDescription className="text-center">
                    Enter your email and password to access your account
                </CardDescription>
            </CardHeader>
            <div className="space-y-2 mb-2">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail size={17} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock size={17} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={16} className=" text-gray-500" />
                            ) : (
                                <Eye size={16} className=" text-gray-500" />
                            )}
                            <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember-me"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full bg-[#00A19C] hover:bg-[#008B87]">Log in</Button>
            <>
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                        OR
                    </span>
                </div>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Continue with Facebook
                    </Button>
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
                </div>
                <CardFooter className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-[#00A19C] hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                        By logging in, you agree to our{' '}
                        <Link href="/terms" className="text-[#00A19C] hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-[#00A19C] hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </CardFooter>
            </>
        </>
    )
}

export default LoginComp