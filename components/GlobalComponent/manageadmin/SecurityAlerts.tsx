import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SecurityAlerts = () => {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Recent security events that require attention</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { type: 'Failed Login Attempts', count: 5, severity: 'high' },
                        { type: 'New Admin Account Created', count: 1, severity: 'medium' },
                        { type: 'Password Policy Violations', count: 3, severity: 'low' },
                    ].map((alert, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <AlertTriangle className={`h-6 w-6 ${alert.severity === 'high' ? 'text-red-500' :
                                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                                    }`} />
                                <div>
                                    <p className="font-medium">{alert.type}</p>
                                    <p className="text-sm text-muted-foreground">{alert.count} occurrences</p>
                                </div>
                            </div>
                            <Badge variant={
                                alert.severity === 'high' ? 'destructive' :
                                    alert.severity === 'medium' ? 'secondary' : 'default'
                            }>
                                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default SecurityAlerts