import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import RupiahFormatter from "@/lib/RupiahFormatter";
import { router } from "@inertiajs/react";

function TicketCatAccordion({ getCat, isLoading, onCategorySelect }) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [ticketQty, setTicketQty] = useState(1);

    const handleClick = (index, category) => {
        const newIndex = activeIndex === index ? null : index;
        setActiveIndex(newIndex);
        onCategorySelect(newIndex === null ? null : category);
        setTicketQty(1);
    };

    const handleCheckout = (e, ticket) => {
        e.stopPropagation();
        router.post('/checkout/form', {
            ticket_id: ticket.id,
            category: ticket.category,
            event_id: ticket.event_id,
            ticket_price: ticket.ticket_price,
            quantity: ticketQty,
            total_price: ticket.ticket_price * ticketQty
        });
    };

    const Skeleton = () => {
        return (
            <div className='bg-[#f2f2f2] dark:bg-[#171717] shadow-md w-full h-36 animate-pulse rounded-2xl py-4 flex flex-col justify-between'>
                <div className="px-4">
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[10rem] h-8 rounded-xl mb-4"></div>
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[15rem] h-4 rounded-xl mb-4"></div>
                </div>
                <div className="flex justify-between items-center px-4">
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[6rem] h-9 rounded-xl mb-4"></div>
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[7rem] h-9 rounded-xl mb-4"></div>
                </div>
            </div>
        )
    }

    const renderTicketCard = (ticket, index) => {
        const availableTickets = ticket.ticket_quantity - ticket.ticket_sold;
        const isAvailable = availableTickets > 0;
        const isActive = activeIndex === index;

        return (
            <React.Fragment key={index}>
                {isLoading ? Skeleton() : (
                    <motion.div
                        key={index}
                        className="bg-[#f2f2f2] dark:bg-stone-800 dark:text-[#f2f2f2] overflow-hidden rounded-xl p-4 shadow-md cursor-pointer"
                        onClick={() =>
                            isAvailable ? handleClick(index, ticket.category) : null
                        }
                    >
                        {/* Header Section */}
                        {renderHeaderSection(
                            ticket,
                            index,
                            isActive,
                            availableTickets,
                            isAvailable
                        )}
                        {/* Expanded Content Section */}
                        {renderExpandedContent(
                            ticket,
                            index,
                            isActive,
                            availableTickets
                        )}
                        {/* Footer Section */}
                        {renderFooterSection(ticket, index, isActive, isAvailable)}
                    </motion.div>
                )}
            </React.Fragment>
        );
    };

    const renderHeaderSection = (
        ticket,
        index,
        isActive,
        availableTickets,
        isAvailable
    ) => (
        <button className="relative border-[#DDDAE7] dark:border-stone-600 pb-4 border-b border-dashed w-full transition-all flex flex-col gap-1 overflow-hidden">
            <div className="flex justify-between font-semibold">
                <p className="z-10 text-lg">{ticket.category}</p>
                <IoIosArrowForward
                    className={`text-xl duration-200 ${isActive ? "-rotate-90" : "rotate-90"
                        }`}
                />
            </div>
            <div
                className={`${isAvailable
                    ? "text-[#5447FF] dark:text-blue-400"
                    : "text-[#C6C1D7] dark:text-stone-600"
                    } font-medium w-fit text-sm`}
            >
                {isAvailable
                    ? `Only ${availableTickets} tickets left! ${ticket.ticket_sold} already sold!`
                    : "Stock not available"}
            </div>
        </button>
    );

    const renderExpandedContent = (
        ticket,
        index,
        isActive,
        availableTickets
    ) => (
        <AnimatePresence mode="sync">
            {isActive && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                >
                    <div className="p-2">
                        <p className="dark:text-stone-300 font-medium my-2">
                            Number of tickets
                        </p>
                        <div className="border-[#DDDAE7] dark:border-stone-600 w-full h-16 border rounded-lg px-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                Ticket
                            </div>
                            <div className="text-red-600 text-sm font-semibold flex items-center gap-4">
                                <p>
                                    <RupiahFormatter
                                        value={ticket.ticket_price}
                                    />
                                    <span className="text-black dark:text-stone-400">
                                        {" "}
                                        / Ticket
                                    </span>
                                </p>
                                {renderQuantityControls(availableTickets)}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const renderQuantityControls = (availableTickets) => (
        <div className="text-[#5447FF] dark:text-blue-400 dark:border-stone-600 flex items-center border rounded">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setTicketQty(Math.max(1, ticketQty - 1));
                }}
                className="px-2 py-1 text-lg"
            >
                -
            </button>
            <span className="text-black dark:text-[#f2f2f2] px-2">
                {ticketQty}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setTicketQty(Math.min(availableTickets, ticketQty + 1));
                }}
                className="px-2 py-1 text-lg"
            >
                +
            </button>
        </div>
    );

    const renderFooterSection = (ticket, index, isActive, isAvailable) => (
        <div className="text-red-500 pt-4 font-semibold flex justify-between items-center relative z-10">
            {isActive ? (
                <div>
                    <p className="text-black dark:text-stone-400 text-sm">
                        Total ({ticketQty} Ticket{ticketQty !== 1 ? "s" : ""})
                    </p>
                    <RupiahFormatter value={ticket.ticket_price * ticketQty} />
                </div>
            ) : (
                <RupiahFormatter value={ticket.ticket_price} />
            )}
            <button
                onClick={(e) => {
                    if (!isAvailable) return;
                    isActive 
                        ? handleCheckout(e, ticket)
                        : handleClick(index, ticket.category);
                }}
                className={`${isAvailable
                    ? "bg-[#5447FF] hover:bg-[#1636F7]"
                    : "bg-[#DDDAE7] dark:bg-stone-700"
                    } text-white !font-medium w-[145px] h-10 rounded-lg`}
            >
                {isAvailable
                    ? isActive
                        ? "Check out"
                        : "Select package"
                    : "Sold out"}
            </button>
        </div>
    );

    return (
        <div className="w-[600px]">
            <h1 className="text-black dark:text-[#f2f2f2] text-xl font-medium">
                Package
            </h1>
            <div className="mt-6 flex flex-col gap-4">
                {getCat?.map(renderTicketCard)}
            </div>
        </div>
    );
}

export default TicketCatAccordion;
