import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { router, useForm, usePage } from "@inertiajs/react";
import DatePicker from "@/Components/Admin/DatePicker";

const SchedulesForm = ({ isOpen, onClose, formType, getData, getEventID }) => {

    const { data, setData, post, put, processing, reset } = useForm({
        date: new Date().toISOString().split('T')[0] + " 00:00:00",
        category: "",
        ticket_price: "",
        ticket_quantity: "",
    });

    useEffect(() => {
        if (formType === "edit" && getData) {
            setData({
                date: getData.date,
                category: getData.category,
                ticket_price: getData.ticket_price,
                ticket_quantity: getData.ticket_quantity,
            });
        }
    }, [getData, formType]);

    const handledateChange = (date) => {
        if (date !== data.date) {
            setData("date", date);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        formType === "add" && reset();

        window.addEventListener("keydown", handleEsc);
        return window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleClose = () => {
        router.reload({ only: ['flash', 'errors'] });
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === "edit") {
            put(route("admin.events.ticket.update", { 
                event: getData.event_id,
                ticket: getData.id
            }), {
                onSuccess: () => {
                    reset();
                    handleClose();
                },
                onError: () => {
                    handleClose();
                }
            });
        } else {
            post(route("admin.events.schedule.store", {event: getEventID}), {
                onSuccess: () => {
                    reset();
                    handleClose();
                },
                onError: () => {
                    handleClose();
                }
            });
        }
    };
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            key="formPanel"
                            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleClose}
                        />

                        {/* Form Panel */}
                        <motion.div
                            className="fixed right-0 p-2 top-0 h-screen w-full max-w-md z-50"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 25,
                            }}
                        >
                            <div className="h-full flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">

                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b">
                                    <h2 className="text-lg font-semibold">
                                        {formType === "edit" ? "Edit Data" : "Add New Data"}
                                    </h2>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 bg-gray-100 rounded-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex-1 overflow-y-auto p-6 scroll-theme-1"
                                >
                                    <div className="space-y-4">

                                        {/* Loc Field */}
                                        <div className="!mt-2">
                                            <label
                                                htmlFor="category"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Category
                                            </label>
                                            <input
                                                type="text"
                                                id="category"
                                                value={data.category}
                                                onChange={(e) =>
                                                    setData("category", e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter category"
                                            />
                                        </div>

                                        {/* Price & Qty Field */}
                                        <div className="flex gap-3">
                                            <div>
                                                <label
                                                    htmlFor="ticket_price"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Ticket Price
                                                </label>
                                                <input
                                                    type="text"
                                                    id="ticket_price"
                                                    value={data.ticket_price}
                                                    onChange={(e) =>
                                                        setData("ticket_price", e.target.value)
                                                    }
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter price"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="ticket_quantity"
                                                    className="block text-sm font-medium text-gray-700 mb-1"
                                                >
                                                    Ticket Qty
                                                </label>
                                                <input
                                                    type="text"
                                                    id="ticket_quantity"
                                                    value={data.ticket_quantity}
                                                    onChange={(e) =>
                                                        setData("ticket_quantity", e.target.value)
                                                    }
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter quantity"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg duration-150"
                                        >
                                            {processing ? (<span className="loader" />) : "Save"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg duration-150"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SchedulesForm;
