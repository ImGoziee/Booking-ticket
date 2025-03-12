import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    Home,
    Users,
    LogOut,
    CalendarDays,
    Wallet,
    ClockArrowUp,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import Notif from "@/Components/Admin/Notif";

const AuthenticatedLayout = ({ children }) => {

    const { flash, errors } = usePage().props;

    const storedSidebarState = localStorage.getItem('sidebarState');
    const initialSidebarState = storedSidebarState ? JSON.parse(storedSidebarState) : true;
    const [isOpen, setIsOpen] = useState(initialSidebarState);

    useEffect(() => {
        localStorage.setItem('sidebarState', JSON.stringify(isOpen));
    }, [isOpen]);

    const { auth } = usePage().props;

    const sidebarVariants = {
        open: {
            width: "280px",
            minWidth: "280px",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
        closed: {
            width: "80px",
            minWidth: "80px",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
    };

    const menuItems = [
        { icon: Home, label: "Overview", routes: "admin.dashboard" },
        { icon: Users, label: "Users", routes: "admin.users.index" },
        { icon: CalendarDays, label: "Events", routes: "admin.events.index" },
        { icon: ClockArrowUp, label: "Orders", routes: "admin.orders.index" },
        { icon: Wallet, label: "Payment", routes: "admin.dashboard" },
    ];

    // index of menu item
    const activeIndex = menuItems.findIndex((item) => {
        const currentUrl = window.location.pathname;

        if (currentUrl.startsWith('/admin/events')) {
            return item.routes === 'admin.events.index';
        }
        return route().current(item.routes);
    });
    return (
        <div className="bg-[#f2f2f2] flex w-full overflow-x-hidden">
            <Notif
                flash={flash}
                errors={errors}
            />
            {/* sidebar placeholder */}
            <motion.div
                initial={isOpen ? "open" : "closed"}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className={`h-screen`}
            />
            <motion.div
                initial={isOpen ? "open" : "closed"}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className="fixed h-screen flex flex-col rounded-r-xl bg-black border border-[#171717] z-30"
            >

                {/* Logo Section */}
                <div className="relative flex items-center pl-5 w-full min-h-20 mb-4 border-b border-zinc-800">
                    <motion.div
                        animate={{ opacity: isOpen ? 1 : 1 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white text-xl font-extrabold">G</span>
                        </div>
                        <motion.span
                            className="text-white font-medium text-lg uppercase"
                        >
                            {isOpen ? "GigsPass" : ""}
                        </motion.span>
                    </motion.div>

                    {/* Toggle Button */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute right-0 translate-x-1/2 bottom-0 translate-y-1/2 bg-white rounded-full p-2 z-20 hover:bg-zinc-400 transition-colors drop-shadow-lg"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 0 : 180 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ChevronLeft className="w-4 h-4 text-black" />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 px-3">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={route(item.routes)}
                            as="button"
                            className="w-full"
                        >
                            <motion.div
                                className={`relative flex items-center px-4 py-4 cursor-pointer rounded-xl mb-2 group
                                ${activeIndex === index
                                        ? "text-white"
                                        : "text-zinc-400"
                                    }
                                hover:text-white transition-colors overflow-hidden`}
                                whileTap={{ scale: 0.98 }}
                            >
                                {activeIndex === index && (
                                    <motion.div
                                        layoutId="activeBackground"
                                        className="absolute inset-0 rounded-xl bg-[#171717]"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                <item.icon
                                    className={`z-10 ml-0.5 min-w-5 max-w-5 ${activeIndex === index
                                        ? "text-purple-400"
                                        : ""
                                        }`}
                                />

                                <motion.span
                                    className={`z-10 ml-4 whitespace-pre ${isOpen ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    {item.label}
                                </motion.span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* User Profile Section */}
                <div className={`${!isOpen && "px-1.5 border-transparent"} duration-200 relative p-4 m-3 rounded-xl bg-black backdrop-blur-sm border border-[#171717] overflow-hidden`}>
                    {/* <div className={`${!isOpen && "opacity-0"} absolute w-16 h-16 bg-indigo-600 rounded-full -bottom-8 -right-4 blur-2xl`}></div> */}
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-medium capitalize">
                                    {auth.user.name.charAt(0)}
                                </span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900" />
                        </div>
                        <div className="flex-1 ml-4 whitespace-pre">
                            <div className="text-white font-medium truncate max-w-32 capitalize">
                                {auth.user.name}
                            </div>
                            <div className="text-zinc-500 text-sm truncate max-w-32">
                                {auth.user.email}
                            </div>
                        </div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-zinc-400 hover:text-white"
                        >
                            <LogOut />
                        </Link>
                    </div>
                </div>
            </motion.div>
            <main className="grow overflow-x-auto px-2">
                {children}
            </main>
        </div>
    );
};

export default AuthenticatedLayout;
