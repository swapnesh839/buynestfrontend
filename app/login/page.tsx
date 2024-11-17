"use client"
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import LoginComp from '@/components/GlobalComponent/Login/LoginComp'
import ResetPassword from '@/components/GlobalComponent/Login/ResetPassword'

export type AuthFormState = 'login' | 'resetPassword'

export default function AuthForm() {
  const [formState, setFormState] = useState<AuthFormState>('login')
  
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          {
            formState === "login"
              ?
              <LoginComp formState={formState} setFormState={setFormState} />
              :
              <ResetPassword formState={formState} setFormState={setFormState}/>
          }
        </CardContent>
      </Card>
    </div>
  )
}