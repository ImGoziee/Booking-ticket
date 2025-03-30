import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

const PaymentFinished = () => {
    return (
        <MainLayout>
            <div className="h-[calc(100vh-120px)] mb-20 flex items-center justify-center">
                <div className="max-w-md w-full bg-white dark:bg-[#171717] rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                    {/* Gradient border */}
                    <div className="absolute z-10 top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-60 blur-lg"></div>
                    <div className="absolute -bottom-10 -left-10 h-24 w-24 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-60 blur-lg"></div>
                    
                    {/* Success icon */}
                    <div className="mx-auto mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-200 dark:shadow-green-900/20">
                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    
                    {/* Main heading */}
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-transparent mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Payment Successful!</h1>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-8 px-4">
                        Thank you for your purchase! Your payment has been successfully processed.
                        You can now view your ticket in the "My Tickets" section.
                    </p>
                    
                    {/* Primary action button */}
                    <Link
                        href={route('myticket')}
                        as="button" 
                        className="w-full py-3 px-4 mb-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
                    >
                        View My Ticket
                    </Link>
                    
                    {/* Info box */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 border border-blue-100 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            If your ticket does not appear immediately, please check your "My Tickets" section later.
                        </p>
                    </div>
                    
                    {/* Secondary action button */}
                    <Link 
                        className="relative z-20 w-full py-2.5 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl shadow-sm hover:shadow-md transition duration-200 ease-in-out flex items-center justify-center"
                        href={route('home')}
                        as="button"
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentFinished;