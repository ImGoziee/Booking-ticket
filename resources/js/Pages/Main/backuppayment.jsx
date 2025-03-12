import React, { useState, useEffect } from 'react';
import { Link, usePage } from "@inertiajs/react";
import axios from 'axios';
import MainLayout from "@/Layouts/MainLayout";
import RupiahFormatter from "@/lib/RupiahFormatter";
import { IoArrowBack, IoAlertCircle, IoTime, IoCalendarOutline, IoLocationOutline, IoTicketOutline, IoWalletOutline } from "react-icons/io5";

const PaymentConfirmation = () => {
    const { order, eventDetails, ticketDetails, expiresAt, auth, snapToken, clientKey } = usePage().props;
    const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load Midtrans script
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = clientKey;
        
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
        
        document.body.appendChild(scriptTag);
        
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    useEffect(() => {
        // Calculate initial time left
        const calculateTimeLeft = () => {
            const expiryTime = new Date(expiresAt);
            const now = new Date();
            const difference = expiryTime - now;
            
            if (difference <= 0) {
                setIsExpired(true);
                return { minutes: 0, seconds: 0 };
            }
            
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            
            return { minutes, seconds };
        };
        
        setTimeLeft(calculateTimeLeft());
        
        const timer = setInterval(() => {
            const timeRemaining = calculateTimeLeft();
            setTimeLeft(timeRemaining);
            
            if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
                clearInterval(timer);
                handleExpiredPayment();
            }
        }, 1000);
        
        return () => clearInterval(timer);
    }, [expiresAt]);

    const handleExpiredPayment = async () => {
        try {
            await axios.post(route('checkout.expired'), { order_id: order.id });
            setIsExpired(true);
            setTimeout(() => {
                window.location.href = route('getDetail', { id: order.event_id });
            }, 3000);
        } catch (error) {
            console.error('Error handling expired payment:', error);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options).replace(/ -/g, ' ').replace(',', ', ');
    };

    const proceedToMidtrans = () => {
        setIsLoading(true);
        
        window.snap.pay(snapToken, {
            onSuccess: function(result) {
                // Success
                console.log('Payment success:', result);
                window.location.href = route('ticket.show', { order: order.id });
            },
            onPending: function(result) {
                // Pending
                console.log('Payment pending:', result);
                alert('Payment is pending. Please complete your payment.');
                setIsLoading(false);
            },
            onError: function(result) {
                // Error
                console.log('Payment error:', result);
                alert('Payment failed. Please try again.');
                setIsLoading(false);
            },
            onClose: function() {
                // User closed the popup without finishing the payment
                console.log('Payment window closed');
                setIsLoading(false);
            }
        });
    };

    return (
        <MainLayout>
            <section className="dark:bg-[#101010] my-24 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="container mx-auto p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-black dark:text-white flex items-center">
                                <IoWalletOutline className="mr-2 text-[#5447FF]" />
                                Complete Your Payment
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 ml-7">
                                Order ID: <span className="font-medium">#{order.id}</span>
                            </p>
                        </div>
                        
                        {/* Enhanced Timer */}
                        <div className={`mt-4 md:mt-0 rounded-lg shadow-md overflow-hidden ${isExpired ? 'bg-red-400' : 'bg-[#5347ffc0]'}`}>
                            {isExpired ? (
                                <div className="px-5 py-3 flex items-center text-white">
                                    <IoAlertCircle className="h-8 w-8 mr-3" />
                                    <div>
                                        <p className="font-bold text-lg">
                                            Payment Time Expired
                                        </p>
                                        <p className="text-sm text-white/80">
                                            Redirecting to event page...
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex">
                                    <div className="flex items-center justify-center bg-[#5447FF] px-4">
                                        <IoTime className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="px-4 py-2 text-white">
                                        <p className="text-sm uppercase tracking-wide font-medium">
                                            Complete Within
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main content - 2/3 width on large screens */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md overflow-hidden">
                                {/* Event Information */}
                                <div className="p-5 border-b border-[#DDDAE7] dark:border-stone-600">
                                    <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                        <IoCalendarOutline className="mr-2 text-[#5447FF]" />
                                        Event Details
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-stone-700 rounded-lg p-4 space-y-4">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 rounded-full bg-[#5447FF]/10 flex items-center justify-center flex-shrink-0 mr-4">
                                                <IoCalendarOutline className="w-6 h-6 text-[#5447FF]" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">Event</p>
                                                <p className="font-semibold text-gray-900 dark:text-white text-lg">{eventDetails.name}</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(eventDetails.date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 rounded-full bg-[#5447FF]/10 flex items-center justify-center flex-shrink-0 mr-4">
                                                <IoLocationOutline className="w-6 h-6 text-[#5447FF]" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">Location</p>
                                                <p className="font-semibold text-gray-900 dark:text-white text-lg">{eventDetails.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ticket Information */}
                                <div className="p-5">
                                    <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                        <IoTicketOutline className="mr-2 text-[#5447FF]" />
                                        Ticket Details
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-stone-700 rounded-lg p-4">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full bg-[#5447FF]/10 flex items-center justify-center flex-shrink-0 mr-4">
                                                <IoTicketOutline className="w-6 h-6 text-[#5447FF]" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Category</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{ticketDetails.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Quantity</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{ticketDetails.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-3 border-t border-gray-200 dark:border-stone-600 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">Total Amount:</span>
                                                <span className="text-xl font-bold text-[#5447FF] dark:text-blue-400">
                                                    <RupiahFormatter value={ticketDetails.totalAmount} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment status and actions - 1/3 width on large screens */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                                {/* Payment Status - Enhanced */}
                                <div className="p-5 border-b border-[#DDDAE7] dark:border-stone-600">
                                    <h2 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                                        <IoWalletOutline className="mr-2 text-[#5447FF]" />
                                        Payment Status
                                    </h2>
                                    <div className="relative">
                                        {/* Status Indicator */}
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 shadow-sm p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-yellow-200 dark:bg-yellow-900 flex items-center justify-center mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">Status</p>
                                                    <p className="text-yellow-700 dark:text-yellow-400 font-bold text-xl capitalize">{order.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                                        <div className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-blue-700 dark:text-blue-400 text-sm">
                                                After payment, you will receive your e-ticket via email. Order will be canceled if payment is not completed in time.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {!isExpired && (
                                            <button
                                                className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#5447FF] hover:bg-[#4338E0]'} text-white py-4 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 shadow-md`}
                                                onClick={proceedToMidtrans}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Complete Payment
                                                    </>
                                                )}
                                            </button>
                                        )}
                                        
                                        <Link
                                            href={route('getDetail', { id: order.event_id })}
                                            as="button"
                                            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-stone-700 dark:hover:bg-stone-600 text-gray-800 dark:text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
                                        >
                                            <IoArrowBack className="mr-2" />
                                            Back to Event
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default PaymentConfirmation;