import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { router, useForm } from '@inertiajs/react';

const DeleteModal = ({
    isOpen,
    onClose,
    id,
    deleteUrl
}) => {
    const { delete: destroy, processing } = useForm();

    const handleClose = () => {
        router.reload({ only: ['flash', 'errors'] });
        onClose();
    };

    const handleDelete = () => {
        destroy(route(deleteUrl, id), {
            onSuccess: () => {
                handleClose();
            }
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 cursor-pointer  backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                    />

                    {/* Delete Confirmation Modal */}
                    <motion.div
                        className="fixed left-1/2 p-2 top-0 w-full max-w-lg z-50"
                        initial={{ y: "-100%", opacity: 0, x: "-50%" }}
                        animate={{ y: 0, opacity: 1, x: "-50%" }}
                        exit={{ y: "-100%", opacity: 0, x: "-50%" }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 23,
                        }}
                    >
                        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative m-4">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Content */}
                            <div className="text-center">
                                <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <Trash2 size={32} className="text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Delete Confirmation
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Are you sure want to delete this data? This action cannot be undone.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-900 py-2 rounded-lg"
                                    >
                                        No, Keep It.
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={processing}
                                        className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg disabled:opacity-50"
                                    >
                                        {processing ? 'Deleting...' : 'Yes, Delete!'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DeleteModal;