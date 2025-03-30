import MainLayout from "@/Layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Tag, Eye } from "lucide-react";
import RupiahFormatter from "@/lib/RupiahFormatter";
import axios from "axios";
import { Link, usePage } from "@inertiajs/react";

const TicketSkeleton = () => {
    return (
        <div className="bg-white dark:bg-[#171717] rounded-xl shadow-md overflow-hidden animate-pulse border border-[#f2f2f2] dark:border-slate-900">
            <div className="flex flex-col md:flex-row">
                <div className="w-2 md:h-auto bg-gray-200 dark:bg-gray-700"></div>

                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center"
                                    >
                                        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end space-y-4">
                            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg w-full md:w-32">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            </div>

                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full md:w-32"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MyTicket = () => {
    const { auth } = usePage().props;
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true);
        let ordersData = [];

        try {
            const response = await axios.get("/getData/orders");
            ordersData = response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setTickets(ordersData);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <MainLayout>
            <section className="min-h-screen py-10">
                <div className="container mx-auto">
                    <div className="w-full h-32 bg-[#f2f2f2] dark:bg-[#171717] rounded-lg overflow-hidden relative mb-8">
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#0A34C2]/10 blur-xl"></div>
                        <div className="absolute top-6 right-12 w-8 h-8 rounded-full bg-[#FFD700]/30 blur-xl"></div>
                        <div className="absolute bottom-6 left-12 w-12 h-12 rounded-full bg-[#5447FF]/20 blur-xl"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="z-10 text-center">
                                <h1 className="text-3xl font-bold text-[#0A34C2] dark:text-white">
                                    My Tickets
                                </h1>
                                <p className="text-[#1636F7] dark:text-blue-200 font-medium mt-1">
                                    Manage all your purchased tickets here
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {isLoading ? (
                            <>
                                {[1, 2, 3, 4].map((item) => (
                                    <TicketSkeleton key={item} />
                                ))}
                            </>
                        ) : tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="bg-white dark:bg-[#171717] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-[#f2f2f2] dark:border-slate-900"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-2 md:h-auto bg-yellow-400 dark:bg-yellow-700"></div>

                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                                        {ticket.event.name}
                                                    </h3>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                            <Calendar
                                                                size={16}
                                                                className="mr-2 text-[#5447FF]"
                                                            />
                                                            <span>{ticket.event.date}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                            <MapPin
                                                                size={16}
                                                                className="mr-2 text-[#5447FF]"
                                                            />
                                                            <span className="truncate">{ticket.event.location}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                            <Tag
                                                                size={16}
                                                                className="mr-2 text-[#5447FF]"
                                                            />
                                                            <span>{ticket.ticket.category}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                            <Users
                                                                size={16}
                                                                className="mr-2 text-[#5447FF]"
                                                            />
                                                            <span>
                                                                {ticket.qty}{" "}Ticket
                                                                {ticket.qty > 1 ? "s" : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col md:items-end space-y-4">
                                                    <div className="bg-[#f2f2f2] dark:bg-[#5447FF]/20 px-4 py-3 rounded-lg">
                                                        <span className="text-sm text-[#1636F7] dark:text-blue-300">
                                                            Total Amount
                                                        </span>
                                                        <div className="font-bold text-lg text-[#0A34C2] dark:text-white">
                                                            <RupiahFormatter value={ticket.amount} />
                                                        </div>
                                                    </div>

                                                    <Link
                                                        as="button"
                                                        href={route('eticket', { ticket: ticket.id })}
                                                        className="flex items-center justify-center px-4 py-2 rounded-lg text-white bg-[#1636F7] hover:bg-[#0A34C2] transition-colors duration-300"
                                                    >
                                                        <Eye
                                                            size={16}
                                                            className="mr-2"
                                                        />
                                                        View E-Ticket
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // No tickets found
                            <div className="bg-white dark:bg-[#171717] rounded-xl shadow-md border border-[#f2f2f2] p-8 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-[#f2f2f2] dark:bg-[#5447FF]/20 rounded-full flex items-center justify-center mb-4">
                                        <Calendar
                                            size={24}
                                            className="text-[#5447FF]"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                        No Tickets Found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {auth.user
                                            ? "You haven't purchased any tickets yet."
                                            : "Please log in to view your tickets."}
                                    </p>
                                    {!auth.user && (
                                        <Link as="button" href={route("login")} className="mt-4 px-6 py-2 rounded-xl text-white bg-[#5447FF] hover:bg-[#0A34C2] transition-colors duration-300">
                                            Login
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default MyTicket;
