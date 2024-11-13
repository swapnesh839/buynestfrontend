import React from 'react'
import { Users, Shield,UserCheck,  Smartphone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { IAdmin } from '@/app/manageadmin/page'

const TotalAdmins = ({admins}:{admins:IAdmin[]}) => {
    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{admins.length}</div>
                    <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{admins.filter(a => a.status === 'Active').length}</div>
                    <p className="text-xs text-muted-foreground">Managing platform operations</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">2FA Adoption</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{Math.round((admins.filter(a => a.twoFactorEnabled).length / admins.length) * 100)}%</div>
                    <p className="text-xs text-muted-foreground">Of admins using 2FA</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Password Health</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Good</div>
                    <Progress value={75} className="w-[80%]" />
                    <p className="text-xs text-muted-foreground">Based on last password change</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default TotalAdmins