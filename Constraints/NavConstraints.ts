import {
    Home,
    LogIn,
    LayoutDashboard,
    ShoppingCart,
    History,
    Mail,
    Bookmark,
    Settings,
    User,
    BarChart2,
    DollarSign,
    Users,
    Bell,
    UserCog,
    Store,
    HelpCircle,
    Compass,
    Glasses,
    Globe,
    View,
    UserCheck,
    Package,
    CheckSquare,
    List,
    Box,
    Shield,
    Headphones,
    UserPlus,
    Group,
    Heart
} from 'lucide-react';

// Define interfaces for each UserType object with an exact structure match
interface UserNavType {
    home: { path: "/"; UserType: ["user"]; id: "home"; icon: typeof Home };
    login: { path: "/login"; UserType: ["user"]; id: "login"; icon: typeof LogIn };
    register: { path: "/register"; UserType: ["user"]; id: "register"; icon: typeof Heart };
    cart: { path: "/cart"; UserType: ["user"]; id: "cart"; icon: typeof ShoppingCart };
    purchasehistory: { path: "/purchasehistory"; UserType: ["user"]; id: "purchasehistory"; icon: typeof History };
    contact: { path: "/contact"; UserType: ["user"]; id: "contact"; icon: typeof Mail };
    saved: { path: "/saved"; UserType: ["user"]; id: "saved"; icon: typeof Bookmark };
    becomeaseller: { path: "/becomeaseller"; UserType: ["user"]; id: "becomeaseller"; icon: typeof Store };
    explore: { path: "/explore"; UserType: ["user"]; id: "explore"; icon: typeof Compass };
    arview: { path: "/arview"; UserType: ["user"]; id: "arview"; icon: typeof Glasses };
    glview: { path: "/glview"; UserType: ["user"]; id: "glview"; icon: typeof View };
    notification: { path: "/notification"; UserType: ["user"]; id: "notification"; icon: typeof Bell };
    usersignup: { path: "/usersignup"; UserType: ["user"]; id: "usersignup"; icon: typeof UserPlus };
    support: { path: "/support"; UserType: ["user", "subadmin"]; id: "support"; icon: typeof Headphones };
    supportdesk: { path: "/supportdesk"; UserType: ["user", "subadmin"]; id: "supportdesk"; icon: typeof Headphones };
    webgltrial: { path: "/webgltrial"; UserType: ["user"]; id: "webgltrial"; icon: typeof Group };
}

interface AdminNavType {
    dashboard: { path: "/dashboard"; UserType: ["admin", "superadmin"]; id: "dashboard"; icon: typeof LayoutDashboard };
    insights: { path: "/insights"; UserType: ["admin", "superadmin"]; id: "insights"; icon: typeof BarChart2 };
    selling: { path: "/selling"; UserType: ["admin", "superadmin"]; id: "selling"; icon: typeof DollarSign };
    pushnotification: { path: "/pushnotification"; UserType: ["admin", "superadmin"]; id: "pushnotification"; icon: typeof Bell };
    subadmin: { path: "/sub-admin"; UserType: ["admin", "superadmin"]; id: "sub-admin"; icon: typeof UserCog };
    orders: { path: "/orders"; UserType: ["admin", "superadmin"]; id: "orders"; icon: typeof Package };
    productapproval: { path: "/productapproval"; UserType: ["admin", "superadmin"]; id: "productapproval"; icon: typeof CheckSquare };
    productlisting: { path: "/productlisting"; UserType: ["admin", "superadmin"]; id: "productlisting"; icon: typeof List };
    productmanagement: { path: "/productmanagement"; UserType: ["admin", "superadmin"]; id: "productmanagement"; icon: typeof Box };
    rolemanagement: { path: "/rolemanagement"; UserType: ["admin", "superadmin"]; id: "rolemanagement"; icon: typeof Shield };
    globalsettings: { path: "/globalsettings"; UserType: ["admin", "superadmin"]; id: "globalsettings"; icon: typeof Globe };
}

interface SuperAdminNavType {
    manageusers: { path: "/manageusers"; UserType: ["superadmin"]; id: "manageusers"; icon: typeof Users };
    manageadmin: { path: "/manageadmin"; UserType: ["superadmin"]; id: "manageadmin"; icon: typeof UserCheck };
}

interface SharedNavType {
    settings: { path: "/settings"; UserType: ["user", "admin", "superadmin", "subadmin"]; id: "settings"; icon: typeof Settings };
    profile: { path: "/profile"; UserType: ["user", "admin", "superadmin", "subadmin"]; id: "profile"; icon: typeof User };
    help: { path: "/help"; UserType: ["user", "admin", "superadmin", "subadmin"]; id: "help"; icon: typeof HelpCircle };
}

// Define objects for each UserType
const UserNav: UserNavType = {
    home: { path: "/", UserType: ["user"], id: "home", icon: Home },
    login: { path: "/login", UserType: ["user"], id: "login", icon: LogIn },
    register: { path: "/register", UserType: ["user"], id: "register", icon: Heart },
    cart: { path: "/cart", UserType: ["user"], id: "cart", icon: ShoppingCart },
    purchasehistory: { path: "/purchasehistory", UserType: ["user"], id: "purchasehistory", icon: History },
    contact: { path: "/contact", UserType: ["user"], id: "contact", icon: Mail },
    saved: { path: "/saved", UserType: ["user"], id: "saved", icon: Bookmark },
    becomeaseller: { path: "/becomeaseller", UserType: ["user"], id: "becomeaseller", icon: Store },
    explore: { path: "/explore", UserType: ["user"], id: "explore", icon: Compass },
    arview: { path: "/arview", UserType: ["user"], id: "arview", icon: Glasses },
    glview: { path: "/glview", UserType: ["user"], id: "glview", icon: View },
    notification: { path: "/notification", UserType: ["user"], id: "notification", icon: Bell },
    usersignup: { path: "/usersignup", UserType: ["user"], id: "usersignup", icon: UserPlus },
    support: { path: "/support", UserType: ["user", "subadmin"], id: "support", icon: Headphones },
    supportdesk: { path: "/supportdesk", UserType: ["user", "subadmin"], id: "supportdesk", icon: Headphones },
    webgltrial: { path: "/webgltrial", UserType: ["user"], id: "webgltrial", icon: Group }
};

const AdminNav: AdminNavType = {
    dashboard: { path: "/dashboard", UserType: ["admin", "superadmin"], id: "dashboard", icon: LayoutDashboard },
    insights: { path: "/insights", UserType: ["admin", "superadmin"], id: "insights", icon: BarChart2 },
    selling: { path: "/selling", UserType: ["admin", "superadmin"], id: "selling", icon: DollarSign },
    pushnotification: { path: "/pushnotification", UserType: ["admin", "superadmin"], id: "pushnotification", icon: Bell },
    subadmin: { path: "/sub-admin", UserType: ["admin", "superadmin"], id: "sub-admin", icon: UserCog },
    orders: { path: "/orders", UserType: ["admin", "superadmin"], id: "orders", icon: Package },
    productapproval: { path: "/productapproval", UserType: ["admin", "superadmin"], id: "productapproval", icon: CheckSquare },
    productlisting: { path: "/productlisting", UserType: ["admin", "superadmin"], id: "productlisting", icon: List },
    productmanagement: { path: "/productmanagement", UserType: ["admin", "superadmin"], id: "productmanagement", icon: Box },
    rolemanagement: { path: "/rolemanagement", UserType: ["admin", "superadmin"], id: "rolemanagement", icon: Shield },
    globalsettings: { path: "/globalsettings", UserType: ["admin", "superadmin"], id: "globalsettings", icon: Globe }
};

const SuperAdminNav: SuperAdminNavType = {
    manageusers: { path: "/manageusers", UserType: ["superadmin"], id: "manageusers", icon: Users },
    manageadmin: { path: "/manageadmin", UserType: ["superadmin"], id: "manageadmin", icon: UserCheck }
};

const SharedNav: SharedNavType = {
    settings: { path: "/settings", UserType: ["user", "admin", "superadmin", "subadmin"], id: "settings", icon: Settings },
    profile: { path: "/profile", UserType: ["user", "admin", "superadmin", "subadmin"], id: "profile", icon: User },
    help: { path: "/help", UserType: ["user", "admin", "superadmin", "subadmin"], id: "help", icon: HelpCircle }
};

// Export all navigation constraints in a single object
export const NavConstraints = {
    UserNav,
    AdminNav,
    SuperAdminNav,
    SharedNav
};
