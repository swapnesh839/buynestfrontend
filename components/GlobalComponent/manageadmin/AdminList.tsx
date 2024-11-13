import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowUpDown, Edit, Eye, Key, Lock, MoreVertical, Search, Trash2, UserCheck, UserPlus, UserX } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IAdmin } from '@/app/manageadmin/page'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
export interface IAdminList {
    admins: IAdmin[]
    setAdmins: Dispatch<SetStateAction<IAdmin[]>>
}
const AdminList = ({ admins, setAdmins }: IAdminList) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [sortConfig, setSortConfig] = useState<{ key: keyof IAdmin; direction: 'ascending' | 'descending' } | null>(null)
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([])
    const [currentPage] = useState(1)
    const itemsPerPage = 5

    const handleSort = (key: keyof IAdmin) => {
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
    const getStatusBadge = (status: IAdmin['status']) => {
        switch (status) {
            case 'Active':
                return <Badge variant="secondary">Active</Badge>
            case 'Inactive':
                return <Badge variant="secondary">Inactive</Badge>
            case 'Suspended':
                return <Badge variant="destructive">Suspended</Badge>
        }
    }
    const handleBulkAction = (action: string) => {
        // Implement bulk actions here
        alert({
            title: "Bulk Action",
            description: `${action} applied to ${selectedAdmins.length} admins`,
        })
        setSelectedAdmins([])
    }

    const handleAdminStatusUpdate = (adminId: string, newStatus: IAdmin['status']) => {
        setAdmins((prevAdmins: IAdmin[]) =>
            prevAdmins.map(admin =>
                admin.id === adminId ? { ...admin, status: newStatus } : admin
            )
        )
        alert({
            title: "Admin Status Updated",
            description: `Admin ${adminId} status changed to ${newStatus}`,
        })
    }
    return (
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
                    <div className="flex space-x-2 ps-1 w-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-auto bg-[#00A19C] hover:bg-[#008B87]">
                                    <UserPlus className="mr-2 h-4 w-4" />New Admin
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
                                    <div className="grid grid-cols-4 items-center gap-4 relative z-10AAAAAAAa">
                                        <Label htmlFor="role" className="text-right">
                                            Role
                                        </Label>
                                        {/* issue in ui */}
                                        <Select>
                                            <SelectTrigger className="col-span-3 z-20">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent className='z-10'>
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
                                <Button variant="outline" className="w-auto">Bulk Actions</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => handleBulkAction('Activate')}>Activate Admins</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleBulkAction('Deactivate')}>Deactivate Admins</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleBulkAction('Enforce 2FA')}>Enforce 2FA</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleBulkAction('Reset Password')}>Reset Passwords</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <Button variant="outline" onClick={() => alert({ title: "Exporting admins", description: "Your admin data is being exported." })}>
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button> */}
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
                                                <DropdownMenuItem onSelect={() => setSelectedAdmins(prev => [...prev, admin.id])}>
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => setSelectedAdmins(prev => prev.includes(admin.id) ? prev.filter(id => id !== admin.id) : [...prev, admin.id])}>
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
    )
}

export default AdminList