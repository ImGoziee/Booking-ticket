import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { router, useForm } from "@inertiajs/react";

const UsersForm = ({ isOpen, onClose, formType, userData }) => {

    const { data, setData, post, put, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (formType === "edit" && userData) {
            setData({
                name: userData.name,
                email: userData.email,
                password: data.password,
            });
        }
    }, [userData, formType]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };

        formType === "add" && reset();

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleClose = () => {
        router.reload({ only: ['flash', 'errors'] });
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === "edit") {
            put(route("admin.users.update", userData), {
                onSuccess: () => {
                    reset();
                    handleClose();
                },
                onError: () => {
                    handleClose();
                }
            });
        } else {
            post(route("admin.users.store"), {
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
                            className="fixed right-0 p-2 top-0 h-screen w-full max-w-lg z-50"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                        >
                            <div className="h-full flex flex-col bg-white shadow-lg rounded-xl">

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
                                    className="flex-1 overflow-y-auto p-6"
                                >
                                    <div className="space-y-4">
                                        {/* Name Field */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData("name", e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter name"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData("email", e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        {/* Password Field */}
                                        {formType === "add" && (
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Password
                                                </label>
                                                <input
                                                    type="text"
                                                    id="password"
                                                    value={data.password}
                                                    onChange={(e) => setData("password", e.target.value)}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter password"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Form Actions */}
                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg duration-150"
                                        >
                                            {processing ? "Saving..." : "Save"}
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

export default UsersForm;
