import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AdminActivity = () => {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Recent Admin Activity</CardTitle>
                <CardDescription>Latest actions performed by administrators</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { admin: 'John Doe', action: 'Updated product listing', time: '2 hours ago' },
                        { admin: 'Jane Smith', action: 'Approved new seller account', time: '4 hours ago' },
                        { admin: 'Bob Johnson', action: 'Resolved customer complaint', time: 'Yesterday at 15:30' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.admin}</p>
                                <p className="text-sm text-muted-foreground">{activity.action}</p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminActivity