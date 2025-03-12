import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { router, useForm, usePage } from "@inertiajs/react";
import DatePicker from "@/Components/Admin/DatePicker";
import GetArtistList from "@/Components/GetArtistList";

const EventsForm = ({ isOpen, onClose, formType, getData }) => {

    const { data, setData, post, put, processing, reset } = useForm({
        name: "",
        date: new Date().toISOString().split('T')[0] + " 00:00:00",
        description: "",
        location: "",
        ticket_price: "",
        ticket_quantity: "",
        images: "",
        image_file: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (formType === "edit" && getData) {
            setData({
                name: getData.name,
                date: getData.date,
                description: getData.description,
                location: getData.location,
                ticket_price: getData.ticket_price,
                ticket_quantity: getData.ticket_quantity,
                images: getData?.images || "",
            });
            if (getData?.images) {
                setPreviewImage(getData.images);
            }
        }
        formType === "add" && setPreviewImage(null);
    }, [getData, formType]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image_file", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
        return () => {
            window.removeEventListener("keydown", handleEsc);
            setPreviewImage(data.images);
        }
    }, [onClose]);

    const handleClose = () => {
        router.reload({ only: ['flash', 'errors'] });
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Tambahkan data ke FormData
        formData.append('name', data.name);
        formData.append('date', data.date);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('ticket_price', data.ticket_price);
        formData.append('ticket_quantity', data.ticket_quantity);

        if (data.image_file) {
            formData.append('image_file', data.image_file);
        }

        if (formType === "edit") {
            formData.append('_method', 'PUT');
            router.post(route("admin.events.update", getData.id), formData, {
                onSuccess: () => {
                    reset();
                    handleClose();
                },
                onError: (errors) => {
                    console.error('Update failed:', errors);
                },
                forceFormData: true,
                preserveScroll: true
            });
        } else {
            router.post(route("admin.events.store"), formData, {
                onSuccess: () => {
                    reset();
                    handleClose();
                },
                onError: (errors) => {
                    console.error('Store failed:', errors);
                },
                forceFormData: true,
                preserveScroll: true
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
                                        {/* Artist Field */}
                                        {/* <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Artist
                                            </label>
                                            <GetArtistList />
                                        </div> */}


                                        {/* Image Upload Field */}
                                        <div>
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Event Image
                                            </label>
                                            <div className="flex flex-col items-center">
                                                {previewImage && (
                                                    <div className="mb-2 w-full border border-dashed border-gray-400 rounded-xl p-2">
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            loading="lazy"
                                                            className="w-full max-w-full h-48 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                )}
                                                <label
                                                    htmlFor="image-upload"
                                                    className="w-full cursor-pointer bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                                                >
                                                    <Upload className="w-8 h-8 text-blue-400 mb-2" />
                                                    <span className="text-sm text-blue-500">
                                                        Click to upload image
                                                    </span>
                                                </label>
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>

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

                                        {/* date */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date Time
                                            </label>
                                            <DatePicker
                                                value={data.date}
                                                onChange={handledateChange}
                                            />
                                        </div>

                                        {/* Desc Field */}
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                className="w-full min-h-24 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-center"
                                                placeholder="Enter description"
                                            >
                                                {data.description}
                                            </textarea>
                                        </div>

                                        {/* Loc Field */}
                                        <div className="!mt-2">
                                            <label
                                                htmlFor="location"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                value={data.location}
                                                onChange={(e) =>
                                                    setData("location", e.target.value)
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter location"
                                            />
                                        </div>
                                        
                                        {/* Price & Qty Field */}
                                        {/* <div className="flex gap-3">
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
                                        </div> */}
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

export default EventsForm;
