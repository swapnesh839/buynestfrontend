interface NavConstraintstype {
    home: {
        path: "/",
        UserType: "user",
        id: "home"
    },
    login: {
        path: "/login",
        UserType: "user",
        id: "login"
    },
    register: {
        path: "/register",
        UserType: "user",
        id: "register"
    },
    dashboard: {
        path: "/dashboard",
        UserType: ["admin", "superadmin"],
        id: "dashboard"
    },
    cart: {
        path: "/cart",
        UserType: "user",
        id: "cart"
    },
    purchasehistory: {
        path: "/purchasehistory",
        UserType: "user",
        id: "purchasehistory"
    },
    contact: {
        path: "/contact",
        UserType: "user",
        id: "contact"
    },
    saved: {
        path: "/saved",
        UserType: "user",
        id: "saved"
    },
    settings: {
        path: "/settings",
        UserType: ["all"],
        id: "settings"
    },
    profile: {
        path: "/profile",
        UserType: ["all"],
        id: "profile"
    },
    insights: {
        path: "/insights",
        UserType: ["admin", "superadmin"],
        id: "insights"
    },
    selling: {
        path: "/selling",
        UserType: ["admin", "superadmin"],
        id: "selling"
    },
    manageusers:{
        path: "/manageusers",
        UserType: ["superadmin"],
        id: "manageusers"
    },
    pushnotification:{
        path: "/pushnotification",
        UserType: ["admin","superadmin"],
        id: "pushnotification"
    },
    subadmin:{
        path: "/sub-admin",
        UserType: ["admin","superadmin"],
        id: "sub-admin"
    },
    becomeaseller:{
        path: "/becomeaseller",
        UserType: ["user"],
        id: "becomeaseller"
    },
    support:{
        path: "/support",
        UserType: ["user","subadmin"],
        id: "support"
    },
    help:{
        path: "/help",
        UserType: ["all"],
        id: "help"
    }
}

export const NavConstraints:NavConstraintstype = {
    home: {
        path: "/",
        UserType: "user",
        id: "home"
    },
    login: {
        path: "/login",
        UserType: "user",
        id: "login"
    },
    register: {
        path: "/register",
        UserType: "user",
        id: "register"
    },
    dashboard: {
        path: "/dashboard",
        UserType: ["admin", "superadmin"],
        id: "dashboard"
    },
    cart: {
        path: "/cart",
        UserType: "user",
        id: "cart"
    },
    purchasehistory: {
        path: "/purchasehistory",
        UserType: "user",
        id: "purchasehistory"
    },
    contact: {
        path: "/contact",
        UserType: "user",
        id: "contact"
    },
    saved: {
        path: "/saved",
        UserType: "user",
        id: "saved"
    },
    settings: {
        path: "/settings",
        UserType: ["all"],
        id: "settings"
    },
    profile: {
        path: "/profile",
        UserType: ["all"],
        id: "profile"
    },
    insights: {
        path: "/insights",
        UserType: ["admin", "superadmin"],
        id: "insights"
    },
    selling: {
        path: "/selling",
        UserType: ["admin", "superadmin"],
        id: "selling"
    },
    manageusers:{
        path: "/manageusers",
        UserType: ["superadmin"],
        id: "manageusers"
    },
    pushnotification:{
        path: "/pushnotification",
        UserType: ["admin","superadmin"],
        id: "pushnotification"
    },
    subadmin:{
        path: "/sub-admin",
        UserType: ["admin","superadmin"],
        id: "sub-admin"
    },
    becomeaseller:{
        path: "/becomeaseller",
        UserType: ["user"],
        id: "becomeaseller"
    },
    support:{
        path: "/support",
        UserType: ["user","subadmin"],
        id: "support"
    },
    help:{
        path: "/help",
        UserType: ["all"],
        id: "help"
    },
}