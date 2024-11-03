"use client"
import React, { useState } from 'react'
import { Search, MoreVertical, ArrowUpDown, UserPlus, Users, Shield, Download, Eye, Edit, Trash2, Key, Lock, UserCheck, UserX, AlertTriangle, Smartphone } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
// import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Pagination } from "@/components/ui/pagination"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface Admin {
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

const mockAdmins: Admin[] = [
    { id: 'A001', name: 'John Doe', email: 'john@beatsflex.com', role: 'Super Admin', status: 'Active', lastLogin: '2023-11-05 14:30', twoFactorEnabled: true, passwordLastChanged: '2023-10-01', permissions: ['all'] },
    { id: 'A002', name: 'Jane Smith', email: 'jane@beatsflex.com', role: 'Product Admin', status: 'Active', lastLogin: '2023-11-04 09:15', twoFactorEnabled: true, passwordLastChanged: '2023-10-15', permissions: ['manage_products', 'view_reports'] },
    { id: 'A003', name: 'Bob Johnson', email: 'bob@beatsflex.com', role: 'Customer Support Admin', status: 'Inactive', lastLogin: '2023-10-30 11:45', twoFactorEnabled: false, passwordLastChanged: '2023-09-20', permissions: ['manage_customers', 'view_orders'] },
    { id: 'A004', name: 'Alice Brown', email: 'alice@beatsflex.com', role: 'Content Admin', status: 'Active', lastLogin: '2023-11-03 16:20', twoFactorEnabled: true, passwordLastChanged: '2023-10-10', permissions: ['manage_content', 'view_analytics'] },
    { id: 'A005', name: 'Charlie Wilson', email: 'charlie@beatsflex.com', role: 'Order Admin', status: 'Suspended', lastLogin: '2023-10-28 08:00', twoFactorEnabled: false, passwordLastChanged: '2023-08-15', permissions: ['manage_orders', 'view_reports'] },
]

export default function ManageAdmin() {
    const [admins, setAdmins] = useState<Admin[]>(mockAdmins)
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Admin; direction: 'ascending' | 'descending' } | null>(null)
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([])
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const [currentPage] = useState(1)
    const itemsPerPage = 5

    const handleSort = (key: keyof Admin) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const sortedAdmins = React.useMemo(() => {
        const sortableAdmins = [...admins]
        if (sortConfig !== null) {
            sortableAdmins.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableAdmins
    }, [admins, sortConfig])

    const filteredAdmins = sortedAdmins.filter(admin =>
        (admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (roleFilter === 'all' || admin.role === roleFilter) &&
        (statusFilter === 'all' || admin.status === statusFilter)
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem)

    const handleAdminSelection = (adminId: string) => {
        setSelectedAdmins(prev =>
            prev.includes(adminId)
                ? prev.filter(id => id !== adminId)
                : [...prev, adminId]
        )
    }

    // const handleSelectAllAdmins = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         setSelectedAdmins(currentAdmins.map(a => a.id))
    //     } else {
    //         setSelectedAdmins([])
    //     }
    // }

    const handleBulkAction = (action: string) => {
        // Implement bulk actions here
        alert({
            title: "Bulk Action",
            description: `${action} applied to ${selectedAdmins.length} admins`,
        })
        setSelectedAdmins([])
    }

    const handleAdminStatusUpdate = (adminId: string, newStatus: Admin['status']) => {
        setAdmins(prevAdmins =>
            prevAdmins.map(admin =>
                admin.id === adminId ? { ...admin, status: newStatus } : admin
            )
        )
        alert({
            title: "Admin Status Updated",
            description: `Admin ${adminId} status changed to ${newStatus}`,
        })
    }

    const handleAdminUpdate = (updatedAdmin: Admin) => {
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

    const getStatusBadge = (status: Admin['status']) => {
        switch (status) {
            case 'Active':
                return <Badge variant="secondary">Active</Badge>
            case 'Inactive':
                return <Badge variant="secondary">Inactive</Badge>
            case 'Suspended':
                return <Badge variant="destructive">Suspended</Badge>
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6">Admin Management</h1>

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

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Admin List</CardTitle>
                    <CardDescription>Manage administrator accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search admins..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 w-full md:w-[300px]"
                                />
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                                    <SelectItem value="Product Admin">Product Admin</SelectItem>
                                    <SelectItem value="Customer Support Admin">Customer Support Admin</SelectItem>
                                    <SelectItem value="Content Admin">Content Admin</SelectItem>
                                    <SelectItem value="Order Admin">Order Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex space-x-2 w-full md:w-auto">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full md:w-auto bg-[#00A19C] hover:bg-[#008B87]">
                                        <UserPlus className="mr-2 h-4 w-4" /> Add New Admin
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Admin</DialogTitle>
                                        <DialogDescription>
                                            Enter the details of the new admin here. Click save when you&appos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input id="name" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">
                                                Email
                                            </Label>
                                            <Input id="email" type="email" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="role" className="text-right">
                                                Role
                                            </Label>
                                            <Select>
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
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Add Admin</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full md:w-auto">Bulk Actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => handleBulkAction('Activate')}>Activate Admins</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleBulkAction('Deactivate')}>Deactivate Admins</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleBulkAction('Enforce 2FA')}>Enforce 2FA</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleBulkAction('Reset Password')}>Reset Passwords</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" onClick={() => alert({ title: "Exporting admins", description: "Your admin data is being exported." })}>
                                <Download className="mr-2 h-4 w-4" /> Export
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        {/* <Checkbox
                      checked={selectedAdmins.length === currentAdmins.length}
                      onCheckedChange={handleSelectAllAdmins}
                    /> */}
                                    </TableHead>
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                                        Name
                                        {sortConfig?.key === 'name' && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort('lastLogin')}>
                                        Last Login
                                        {sortConfig?.key === 'lastLogin' && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                    <TableHead>2FA</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentAdmins.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedAdmins.includes(admin.id)}
                                                onCheckedChange={() => handleAdminSelection(admin.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{admin.id}</TableCell>
                                        <TableCell>{admin.name}</TableCell>
                                        <TableCell>{admin.email}</TableCell>
                                        <TableCell>{admin.role}</TableCell>
                                        <TableCell>{getStatusBadge(admin.status)}</TableCell>
                                        <TableCell>{admin.lastLogin}</TableCell>
                                        <TableCell>
                                            {admin.twoFactorEnabled ? (
                                                <Badge variant="secondary">Enabled</Badge>
                                            ) : (
                                                <Badge variant="destructive">Disabled</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onSelect={() => setSelectedAdmin(admin)}>
                                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => setSelectedAdmin(admin)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Admin
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Key className="mr-2 h-4 w-4" /> Reset Password
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onSelect={() => handleAdminStatusUpdate(admin.id, 'Active')}>
                                                        <UserCheck className="mr-2 h-4 w-4" /> Activate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleAdminStatusUpdate(admin.id, 'Inactive')}>
                                                        <UserX className="mr-2 h-4 w-4" /> Deactivate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleAdminStatusUpdate(admin.id, 'Suspended')}>
                                                        <Lock className="mr-2 h-4 w-4" /> Suspend
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex justify-center">
                        {/* <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredAdmins.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            /> */}
                    </div>
                </CardContent>
            </Card>

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
        </div>
    )
}