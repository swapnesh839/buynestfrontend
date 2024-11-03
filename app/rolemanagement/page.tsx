"use client"
import React, { useEffect, useState } from 'react'
import { Search,  MoreVertical, ArrowUpDown, UserPlus, Users, Shield, Download, Upload, Eye, Edit, Trash2, Key,  Lock, UserCheck, UserX } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
// import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Pagination } from "@/components/ui/pagination"
// import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Suspended'
  lastLogin: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
}

const mockUsers: User[] = [
  { id: 'U001', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-11-05 14:30' },
  { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', lastLogin: '2023-11-04 09:15' },
  { id: 'U003', name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer Support', status: 'Inactive', lastLogin: '2023-10-30 11:45' },
  { id: 'U004', name: 'Alice Brown', email: 'alice@example.com', role: 'Content Editor', status: 'Active', lastLogin: '2023-11-03 16:20' },
  { id: 'U005', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Seller', status: 'Suspended', lastLogin: '2023-10-28 08:00' },
]

const mockRoles: Role[] = [
  { id: 'R001', name: 'Admin', description: 'Full system access', permissions: ['manage_users', 'manage_roles', 'manage_products', 'manage_orders', 'manage_settings'] },
  { id: 'R002', name: 'Manager', description: 'Manage operations and staff', permissions: ['manage_products', 'manage_orders', 'view_reports'] },
  { id: 'R003', name: 'Customer Support', description: 'Handle customer inquiries and orders', permissions: ['view_orders', 'manage_returns', 'contact_customers'] },
  { id: 'R004', name: 'Content Editor', description: 'Manage site content and blog', permissions: ['manage_content', 'publish_posts'] },
  { id: 'R005', name: 'Seller', description: 'Manage own products and orders', permissions: ['manage_own_products', 'view_own_orders'] },
]

export default function RoleManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [currentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('users')
  const itemsPerPage = 5
  useEffect(()=>{
    console.log(activeTab);
  },[activeTab])

  const handleSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedUsers = React.useMemo(() => {
    const sortableUsers = [...users]
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableUsers
  }, [users, sortConfig])

  const filteredUsers = sortedUsers.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === 'all' || user.role === roleFilter) &&
    (statusFilter === 'all' || user.status === statusFilter)
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const handleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

//   const handleSelectAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       setSelectedUsers(currentUsers.map(u => u.id))
//     } else {
//       setSelectedUsers([])
//     }
//   }

  const handleBulkAction = (action: string) => {
    // Implement bulk actions here
    alert({
      title: "Bulk Action",
      description: `${action} applied to ${selectedUsers.length} users`,
    })
    setSelectedUsers([])
  }

  const handleUserStatusUpdate = (userId: string, newStatus: User['status']) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    )
    alert({
      title: "User Status Updated",
      description: `User ${userId} status changed to ${newStatus}`,
    })
  }

  const handleRoleUpdate = (roleId: string, updatedRole: Partial<Role>) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId ? { ...role, ...updatedRole } : role
      )
    )
    // toast({
    //   title: "Role Updated",
    //   description: `Role ${roleId} has been updated`,
    // })
  }

  const getStatusBadge = (status: User['status']) => {
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
      <h1 className="text-3xl font-bold mb-6">User and Role Management</h1>
      
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 new users this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">90% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'Suspended').length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Manage access levels</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
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
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
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
                        <UserPlus className="mr-2 h-4 w-4" /> Add New User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new user here. Click save when you&appos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Add user form would go here */}
                      <DialogFooter>
                        <Button type="submit">Save User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">Bulk Actions</Button>
                
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => handleBulkAction('Activate')}>Activate Users</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleBulkAction('Deactivate')}>Deactivate Users</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleBulkAction('Delete')}>Delete Users</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" onClick={() => alert({ title: "Exporting users", description: "Your user data is being exported." })}>
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                  <Button variant="outline" onClick={() => alert({ title: "Importing users", description: "User import has started." })}>
                    <Upload className="mr-2 h-4 w-4" /> Import
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedUsers.length === currentUsers.length}
                        //   onCheckedChange={handleSelectAllUsers}
                        />
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleUserSelection(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
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
                              <DropdownMenuItem onSelect={() => setSelectedUser(user)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" /> Change Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onSelect={() => handleUserStatusUpdate(user.id, 'Active')}>
                                <UserCheck className="mr-2 h-4 w-4" /> Activate
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleUserStatusUpdate(user.id, 'Inactive')}>
                                <UserX className="mr-2 h-4 w-4" /> Deactivate
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleUserStatusUpdate(user.id, 'Suspended')}>
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
                  totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
                /> */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Manage roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button className="bg-[#00A19C] hover:bg-[#008B87]">
                  <Shield className="mr-2 h-4 w-4" /> Add New Role
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.id}</TableCell>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.permissions.join(', ')}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedRole(role)}>
                            <span className="sr-only">Edit role</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              User ID: {selectedUser?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={selectedUser?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={selectedUser?.email} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue={selectedUser?.status}>
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
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Role ID: {selectedRole?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleName" className="text-right">
                Name
              </Label>
              <Input id="roleName" value={selectedRole?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roleDescription" className="text-right">
                Description
              </Label>
              <Textarea id="roleDescription" value={selectedRole?.description} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">
                Permissions
              </Label>
              <div className="col-span-3">
                {['manage_users', 'manage_roles', 'manage_products', 'manage_orders', 'manage_settings'].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox id={permission} checked={selectedRole?.permissions.includes(permission)} />
                    <Label htmlFor={permission}>{permission.replace('_', ' ')}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => selectedRole && handleRoleUpdate(selectedRole.id, selectedRole)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>Latest actions performed by users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">User {index + 1}</p>
                  <p className="text-sm text-muted-foreground">Performed action: Updated product listing</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  2 hours ago
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}