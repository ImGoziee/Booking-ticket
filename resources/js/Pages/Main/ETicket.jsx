import React, { useEffect, useState, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ETicket = ({ ticket_id }) => {
    const [tickets, setTickets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const ticketRef = useRef(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/getData/orders/${ticket_id}`);
            setTickets(response.data[0] || null);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(dateString).toLocaleTimeString('id-ID', options) + ' WIB';
    };

    const generateTicketCode = (createdAt, ticketId) => {
        const date = new Date(createdAt);
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `#QKTS-${year}C${ticketId}${month}${day}`;
    };

    const downloadTicket = async () => {
        if (!tickets) return;
        
        const ticketElement = ticketRef.current;
        if (!ticketElement) return;
        
        const downloadButton = document.getElementById('download-button');
        if (downloadButton) {
            downloadButton.innerText = 'Generating PDF...';
            downloadButton.disabled = true;
        }
        
        try {
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            pdf.addImage(
                canvas.toDataURL('image/png'), 
                'PNG', 
                0, 
                0, 
                imgWidth, 
                imgHeight
            );
            
            const fileName = `${generateTicketCode(tickets.created_at, tickets.id)}.pdf`;
            
            pdf.save(fileName);
            
            if (downloadButton) {
                downloadButton.innerText = 'Download Ticket';
                downloadButton.disabled = false;
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            if (downloadButton) {
                downloadButton.innerText = 'Download Ticket';
                downloadButton.disabled = false;
            }
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
    );

    const TicketContent = () => (
        <div ref={ticketRef} className="rounded-xl overflow-hidden shadow-lg relative bg-white dark:bg-[#171717] flex flex-col">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="py-4 px-6 bg-white dark:bg-[#171717] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Qickets</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Verified E-Ticket</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-300">{generateTicketCode(tickets.created_at, tickets.id)}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="p-6 md:w-3/5 bg-white dark:bg-[#171717]">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{tickets.event.name}</h3>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Date & Time</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{formatDate(tickets.event.date)}</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{formatTime(tickets.event.date)}</p>
                        </div>
                        <div>
                            <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Venue</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tickets.event.location}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Ticket Category</p>
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-300">{tickets.ticket.category}</p>
                        </div>
                        <div>
                            <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Price</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tickets.amount}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Ticket Holder</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tickets.user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tickets.user.email}</p>
                    </div>

                    <div>
                        <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">Valid Until</p>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{formatDate(tickets.event.date)}</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 bottom-0 w-0 border-l border-dashed border-gray-300 dark:border-gray-700 left-0 md:left-0"></div>
                    <div className="absolute -left-3 top-1/4 h-6 w-6 rounded-full bg-gray-100 dark:bg-stone-800 inner-shadow"></div>
                    <div className="absolute -left-3 top-3/4 h-6 w-6 rounded-full bg-gray-100 dark:bg-stone-800 inner-shadow"></div>
                </div>

                <div className="p-6 md:w-2/5 flex flex-col justify-center items-center bg-f2f2f2 dark:bg-[#171717]">
                    <div className="w-40 h-40 p-2 rounded-md shadow-sm mb-4 bg-white">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="none" stroke="#000" strokeWidth="1" />
                            <path d="M10,10 L30,10 L30,30 L10,30 Z" fill="#000" />
                            <path d="M60,0 L100,0 L100,40 L60,40 Z" fill="none" stroke="#000" strokeWidth="1" />
                            <path d="M70,10 L90,10 L90,30 L70,30 Z" fill="#000" />
                            <path d="M0,60 L40,60 L40,100 L0,100 Z" fill="none" stroke="#000" strokeWidth="1" />
                            <path d="M10,70 L30,70 L30,90 L10,90 Z" fill="#000" />
                            <path d="M60,60 L100,60 L100,100 L60,100 Z" fill="none" stroke="#000" strokeWidth="1" />
                            <path d="M45,15 L55,15 L55,25 L45,25 Z" fill="#000" />
                            <path d="M45,45 L55,45 L55,55 L45,55 Z" fill="#000" />
                            <path d="M45,75 L55,75 L55,85 L45,85 Z" fill="#000" />
                            <path d="M75,45 L85,45 L85,55 L75,55 Z" fill="#000" />
                            <path d="M75,75 L85,75 L85,85 L75,85 Z" fill="#000" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Scan to validate</p>
                    <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">{generateTicketCode(tickets.created_at, tickets.id)}</p>
                </div>
            </div>

            <div className="px-6 py-3 border-t bg-f2f2f2 dark:bg-stone-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xs">Purchased on {formatDate(tickets.created_at)}</p>
                    </div>
                    <div>
                        <p className="text-xs">Powered by Qickets</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SkeletonTicket = () => (
        <div className="rounded-xl overflow-hidden shadow-lg relative bg-white dark:bg-[#171717] flex flex-col">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="py-4 px-6 bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <div className="text-right">
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="p-6 md:w-3/5 bg-white dark:bg-[#171717]">
                    <Skeleton className="h-6 w-64 mb-4" />

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <Skeleton className="h-3 w-16 mb-2" />
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div>
                            <Skeleton className="h-3 w-16 mb-2" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <Skeleton className="h-3 w-24 mb-2" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div>
                            <Skeleton className="h-3 w-12 mb-2" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-40" />
                    </div>

                    <div>
                        <Skeleton className="h-3 w-16 mb-2" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 bottom-0 w-0 border-l border-dashed border-gray-300 dark:border-gray-700 left-0 md:left-0"></div>
                    <div className="absolute -left-3 top-1/4 h-6 w-6 rounded-full bg-gray-100 dark:bg-stone-800 inner-shadow"></div>
                    <div className="absolute -left-3 top-3/4 h-6 w-6 rounded-full bg-gray-100 dark:bg-stone-800 inner-shadow"></div>
                </div>

                <div className="p-6 md:w-2/5 flex flex-col justify-center items-center bg-f2f2f2 dark:bg-[#171717]">
                    <Skeleton className="w-40 h-40 rounded-md mb-4" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>

            <div className="px-6 py-3 border-t bg-f2f2f2 dark:bg-stone-900 border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-3 w-40" />
                    </div>
                    <div>
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="w-full min-h-screen py-8 px-4 transition-colors duration-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Payment Successful!</h1>
                        <p className="text-base text-gray-600 dark:text-gray-300">Your e-ticket is ready. Enjoy the show!</p>
                    </div>

                    {isLoading || !tickets ? <SkeletonTicket /> : <TicketContent />}

                    <div className="flex justify-center gap-4 mt-6">
                        <Link as="button" href={route('myticket')} className="px-6 py-2 rounded-md shadow-sm border bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-[#171717] dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                            Back
                        </Link>
                        <button 
                            id="download-button"
                            onClick={downloadTicket}
                            disabled={isLoading || !tickets}
                            className="px-6 py-2 rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Download Ticket
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ETicket;