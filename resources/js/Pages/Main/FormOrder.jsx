import { Head, Link, router, usePage } from "@inertiajs/react";
import RupiahFormatter from "@/lib/RupiahFormatter";
import MainLayout from "@/Layouts/MainLayout";
import { IoArrowBack } from "react-icons/io5";

const FormOrder = () => {
    const { ticketData, auth } = usePage().props;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options).replace(/ -/g, ' ').replace(',', ', ');
    };

    if (!ticketData || Object.keys(ticketData).length === 0) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
                    <div className="bg-[#f2f2f2] dark:bg-stone-800 p-6 rounded-xl shadow-lg max-w-lg w-full">
                        <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-4">No Ticket Selected</h1>
                        <p className="text-center text-gray-600 dark:text-gray-300">Please select a ticket from the event page.</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handlePayment = () => {
        router.post('/checkout/process', {
            user_id: auth.user.id,
            event_id: ticketData.event_id,
            ticket_id: ticketData.ticket_id,
            qty: ticketData.quantity,
            amount: ticketData.total_price,
            status: 'pending'
        });
    };

    return (
        <MainLayout>
            <Head title={`Form Order ${ticketData.name}`} />
            <section className="dark:bg-[#101010] my-24 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex justify-between items-center p-6 md:px-8">
                    {/* Page Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-black dark:text-white">Complete Your Order</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Review your order details</p>
                    </div>
                    {/* Back Button */}
                    <Link
                        href={route('getDetail', { id: ticketData.event_id })}
                        as="button"
                        className="inline-flex items-center text-[#5447FF] dark:text-blue-400 hover:underline font-medium"
                    >
                        <IoArrowBack className="mr-2" />
                        Back to Events
                    </Link>
                </div>
                
                {/* Two-column layout */}
                <div className="flex flex-col md:flex-row gap-6 px-6 pb-8 md:px-8">
                    {/* Left column - Order details */}
                    <div className="md:w-2/3 overflow-y-auto pr-2">
                        <div className="bg-[#f2f2f2] dark:bg-stone-800 rounded-xl overflow-hidden">
                            {/* Order Header with Icon */}
                            <div className="bg-[#5447FF] p-4 text-white">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    <h1 className="text-xl font-bold">Order Details</h1>
                                </div>
                            </div>

                            {/* Event Information with Image */}
                            <div className="p-4 border-b border-dashed border-[#DDDAE7] dark:border-stone-600">
                                <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5447FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Event Information
                                </h2>
                                <div className="flex flex-row gap-4">
                                    <div className="w-1/3 bg-gray-200 dark:bg-gray-700 border border-[#DDDAE7] dark:border-[#171717] rounded-lg overflow-hidden h-24 flex items-center justify-center">
                                        <img src={ticketData.images} alt="Event" className="object-cover h-full w-full" />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Event:</span>
                                            <span className="font-semibold text-black dark:text-white text-sm max-md:max-w-[10rem] truncate">{ticketData.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Location:</span>
                                            <span className="font-semibold text-black dark:text-white text-sm">{ticketData.location || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Date:</span>
                                            <span className="font-semibold text-black dark:text-white text-sm">{ticketData.date ? formatDate(ticketData.date) : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Information with Icon */}
                            <div className="p-4 border-b border-dashed border-[#DDDAE7] dark:border-stone-600">
                                <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5447FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    User Information
                                </h2>
                                {auth.user.id ? (
                                    <div className="space-y-2 bg-white dark:bg-stone-700 rounded-lg p-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Name:</span>
                                            <span className="font-semibold text-black dark:text-white text-sm">{auth.user.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Email:</span>
                                            <span className="font-semibold text-black dark:text-white text-sm">{auth.user.email}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded-lg flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-800 dark:text-yellow-200 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <div>
                                            <p className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">
                                                You are not logged in
                                            </p>
                                            <Link
                                                href="/login"
                                                className="inline-block mt-1 bg-yellow-800 dark:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
                                            >
                                                Login Now
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Ticket Information with Icons */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5447FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    Ticket Information
                                </h2>
                                <div className="bg-white dark:bg-stone-700 rounded-lg p-3 space-y-2">
                                    <div className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-stone-600">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Category:</span>
                                        </div>
                                        <span className="font-semibold text-black dark:text-white text-sm">{ticketData.category || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-stone-600">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Price per Ticket:</span>
                                        </div>
                                        <span className="font-semibold text-black dark:text-white text-sm">
                                            {ticketData.ticket_price ? (
                                                <RupiahFormatter value={ticketData.ticket_price} />
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-1">
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Quantity:</span>
                                        </div>
                                        <span className="font-semibold text-black dark:text-white text-sm">{ticketData.quantity || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right column - Summary and Payment */}
                    <div className="md:w-1/3 sticky top-0">
                        <div className="bg-[#f2f2f2] dark:bg-stone-800 rounded-xl overflow-hidden">
                            {/* Order Summary Header */}
                            <div className="bg-[#5447FF] p-4 text-white">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h1 className="text-xl font-bold">Order Summary</h1>
                                </div>
                            </div>
                            
                            {/* Summary content */}
                            <div className="p-4 space-y-4">
                                <div className="bg-white dark:bg-stone-700 rounded-lg p-3 space-y-2">
                                    <div className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-stone-600">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Event:</span>
                                        <span className="font-semibold text-black dark:text-white text-sm max-md:max-w-[10rem] truncate">{ticketData.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-stone-600">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Ticket Type:</span>
                                        <span className="font-semibold text-black dark:text-white text-sm">{ticketData.category || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-stone-600">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Price per Ticket:</span>
                                        <span className="font-semibold text-black dark:text-white text-sm">
                                            {ticketData.ticket_price ? (
                                                <RupiahFormatter value={ticketData.ticket_price} />
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-1">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Quantity:</span>
                                        <span className="font-semibold text-black dark:text-white text-sm">{ticketData.quantity || 0}</span>
                                    </div>
                                </div>
                                
                                {/* Total Amount */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-800 dark:text-blue-300 font-medium">Total Amount:</span>
                                        <span className="text-xl font-bold text-[#5447FF] dark:text-blue-400">
                                            {ticketData.total_price ? (
                                                <RupiahFormatter value={ticketData.total_price} />
                                            ) : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Important Information */}
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                    <div className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-yellow-700 dark:text-yellow-400 text-xs">
                                            Please make sure all details are correct. Tickets cannot be refunded or exchanged after purchase.
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Payment Button - Always visible */}
                                <button
                                    className="w-full bg-[#5447FF] hover:bg-[#1636F7] text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
                                    onClick={handlePayment}
                                    disabled={!auth.user.id}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Continue to Payment
                                </button>
                                
                                {/* Back button for smaller screens */}
                                <Link
                                    href={route('getDetail', { id: ticketData.event_id })}
                                    as="button"
                                    className="md:hidden w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-gray-800 dark:text-white rounded-lg font-medium text-center flex items-center justify-center mt-2"
                                >
                                    <IoArrowBack className="mr-2" />
                                    Back to Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default FormOrder;