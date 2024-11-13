"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import AdminList from '@/components/GlobalComponent/manageadmin/AdminList'
import TotalAdmins from '@/components/GlobalComponent/manageadmin/TotalAdmins'
import AdminActivity from '@/components/GlobalComponent/manageadmin/AdminActivity'
import SecurityAlerts from '@/components/GlobalComponent/manageadmin/SecurityAlerts'

export interface IAdmin {
    id: string
    name: string
    email: string
    role: string
    status: 'Active' | 'Inactive' | 'Suspended'
    lastLogin: string
    twoFactorEnabled: boolean
    passwordLastChanged: string
    permissions: string[]
}

const mockAdmins: IAdmin[] = [
    { id: 'A001', name: 'John Doe', email: 'john@beatsflex.com', role: 'Super Admin', status: 'Active', lastLogin: '2023-11-05 14:30', twoFactorEnabled: true, passwordLastChanged: '2023-10-01', permissions: ['all'] },
    { id: 'A002', name: 'Jane Smith', email: 'jane@beatsflex.com', role: 'Product Admin', status: 'Active', lastLogin: '2023-11-04 09:15', twoFactorEnabled: true, passwordLastChanged: '2023-10-15', permissions: ['manage_products', 'view_reports'] },
    { id: 'A003', name: 'Bob Johnson', email: 'bob@beatsflex.com', role: 'Customer Support Admin', status: 'Inactive', lastLogin: '2023-10-30 11:45', twoFactorEnabled: false, passwordLastChanged: '2023-09-20', permissions: ['manage_customers', 'view_orders'] },
    { id: 'A004', name: 'Alice Brown', email: 'alice@beatsflex.com', role: 'Content Admin', status: 'Active', lastLogin: '2023-11-03 16:20', twoFactorEnabled: true, passwordLastChanged: '2023-10-10', permissions: ['manage_content', 'view_analytics'] },
    { id: 'A005', name: 'Charlie Wilson', email: 'charlie@beatsflex.com', role: 'Order Admin', status: 'Suspended', lastLogin: '2023-10-28 08:00', twoFactorEnabled: false, passwordLastChanged: '2023-08-15', permissions: ['manage_orders', 'view_reports'] },
]

export default function ManageAdmin() {
    const [admins, setAdmins] = useState<IAdmin[]>(mockAdmins)
    const [selectedAdmin, setSelectedAdmin] = useState<IAdmin | null>(null)

    const handleAdminUpdate = (updatedAdmin: IAdmin) => {
        setAdmins(prevAdmins =>
            prevAdmins.map(admin =>
                admin.id === updatedAdmin.id ? updatedAdmin : admin
            )
        )
        alert({
            title: "Admin Updated",
            description: `Admin ${updatedAdmin.id} has been updated`,
        })
        setSelectedAdmin(null)
    }



    return (
        <div className='p-3'>
            <div className="bg-white p-3 rounded-md shadow-md border">
                <h1 className="text-3xl font-bold mb-6">Admin Management</h1>
                <TotalAdmins admins={admins} />
                <AdminList admins={admins} setAdmins={setAdmins} />
                <Dialog open={!!selectedAdmin} onOpenChange={() => setSelectedAdmin(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Admin Details</DialogTitle>
                            <DialogDescription>
                                Admin ID: {selectedAdmin?.id}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value={selectedAdmin?.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" value={selectedAdmin?.email} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select defaultValue={selectedAdmin?.role}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                                        <SelectItem value="Product Admin">Product Admin</SelectItem>
                                        <SelectItem value="Customer Support Admin">Customer Support Admin</SelectItem>
                                        <SelectItem value="Content Admin">Content Admin</SelectItem>
                                        <SelectItem value="Order Admin">Order Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Select defaultValue={selectedAdmin?.status}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="2fa" className="text-right">
                                    2FA
                                </Label>
                                <Switch
                                    id="2fa"
                                    checked={selectedAdmin?.twoFactorEnabled}
                                    onCheckedChange={(checked) =>
                                        setSelectedAdmin(admin => admin ? { ...admin, twoFactorEnabled: checked } : null)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right">
                                    Permissions
                                </Label>
                                <div className="col-span-3">
                                    {['manage_users', 'manage_products', 'manage_orders', 'view_reports', 'manage_settings'].map((permission) => (
                                        <div key={permission} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={permission}
                                                checked={selectedAdmin?.permissions.includes(permission)}
                                                onCheckedChange={(checked) => {
                                                    if (selectedAdmin) {
                                                        const updatedPermissions = checked
                                                            ? [...selectedAdmin.permissions, permission]
                                                            : selectedAdmin.permissions.filter(p => p !== permission);
                                                        setSelectedAdmin({ ...selectedAdmin, permissions: updatedPermissions });
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={permission}>{permission.replace('_', ' ')}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => selectedAdmin && handleAdminUpdate(selectedAdmin)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <AdminActivity />
                <SecurityAlerts />
            </div>
        </div>
    )
}