import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
    const statistics = {
        totalUsers: 2458,
        newUsers: 127,
        userGrowth: "+5.2%",
        totalEvents: 38,
        upcomingEvents: 12,
        totalTicketsSold: 15782,
        thisWeekSales: 783,
        salesGrowth: "+12.8%",
        revenue: "$427,950"
    };

    const monthlySalesData = [
        { name: 'Jan', sales: 1200 },
        { name: 'Feb', sales: 1900 },
        { name: 'Mar', sales: 1500 },
        { name: 'Apr', sales: 2100 },
        { name: 'May', sales: 1800 },
        { name: 'Jun', sales: 2400 },
        { name: 'Jul', sales: 3100 },
        { name: 'Aug', sales: 2900 },
        { name: 'Sep', sales: 3300 },
        { name: 'Oct', sales: 3500 },
        { name: 'Nov', sales: 3500 },
        { name: 'Dec', sales: 3500 },
    ];

    const ticketStatusData = [
        { name: 'Available', value: 2500 },
        { name: 'Reserved', value: 1500 },
        { name: 'Sold', value: 8500 },
    ];

    const TICKET_COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

    const upcomingEvents = [
        { id: 1, name: "Summer Music Festival", date: "Apr 15, 2025", location: "Central Park", sold: "78%" },
        { id: 2, name: "Comedy Night Special", date: "Apr 22, 2025", location: "Laugh Factory", sold: "45%" },
        { id: 3, name: "Basketball Tournament", date: "May 5, 2025", location: "City Arena", sold: "62%" },
        { id: 4, name: "Art Exhibition Opening", date: "May 12, 2025", location: "Metro Gallery", sold: "30%" },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-5 px-4 sm:px-5 lg:px-6 bg-gray-50 min-h-screen">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin! Here's what's happening with Qickets today.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="font-semibold text-gray-400 text-sm">Total Users</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold text-gray-800">{statistics.totalUsers}</p>
                                    <span className="ml-2 text-sm text-green-500">{statistics.userGrowth}</span>
                                </div>
                                <p className="text-xs text-gray-500">{statistics.newUsers} new this week</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="font-semibold text-gray-400 text-sm">Events</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold text-gray-800">{statistics.totalEvents}</p>
                                </div>
                                <p className="text-xs text-gray-500">{statistics.upcomingEvents} upcoming</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="font-semibold text-gray-400 text-sm">Tickets Sold</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold text-gray-800">{statistics.totalTicketsSold}</p>
                                    <span className="ml-2 text-sm text-green-500">{statistics.salesGrowth}</span>
                                </div>
                                <p className="text-xs text-gray-500">{statistics.thisWeekSales} this week</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="font-semibold text-gray-400 text-sm">Revenue</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold text-gray-800">{statistics.revenue}</p>
                                </div>
                                <p className="text-xs text-gray-500">Total earnings</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-2 bg-[#fff] rounded-lg shadow-sm p-4 border border-[#f2f2f2]">
                        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                            Monthly Ticket Sales
                        </h2>
                        <div className="h-[30rem]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={monthlySalesData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="sales" 
                                        stroke="#6366f1" 
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6, strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#fff] rounded-lg shadow-sm p-4 border border-[#f2f2f2]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Upcoming Events
                            </h2>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 ease-in-out transform">
                                View all
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-purple-50">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                            Sold
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {upcomingEvents.map((event) => (
                                        <tr key={event.id} className="hover:bg-purple-50 transition-colors duration-150">
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{event.name}</div>
                                                <div className="text-xs text-gray-500">{event.location}</div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                                {event.date}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className="bg-purple-600 h-2.5 rounded-full" 
                                                        style={{ width: event.sold }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-500 text-right mt-1">{event.sold}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-[#fff] rounded-lg shadow-sm p-4 border border-[#f2f2f2]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-gray-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Recent Activity
                            </h2>
                            <button className="text-sm text-green-600 hover:text-green-800 font-medium transition duration-200 ease-in-out transform">
                                View all
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start p-2 rounded-lg hover:bg-green-50 transition-colors duration-150">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">New ticket sale</p>
                                    <p className="text-xs text-gray-500">Summer Music Festival - 3 tickets</p>
                                    <p className="text-xs text-gray-400">30 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-start p-2 rounded-lg hover:bg-green-50 transition-colors duration-150">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                                    <p className="text-xs text-gray-500">user@example.com</p>
                                    <p className="text-xs text-gray-400">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-start p-2 rounded-lg hover:bg-green-50 transition-colors duration-150">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">New event created</p>
                                    <p className="text-xs text-gray-500">Comedy Night Special</p>
                                    <p className="text-xs text-gray-400">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-start p-2 rounded-lg hover:bg-green-50 transition-colors duration-150">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Event time updated</p>
                                    <p className="text-xs text-gray-500">Art Exhibition Opening</p>
                                    <p className="text-xs text-gray-400">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}