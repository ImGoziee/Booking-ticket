import React from "react";
import MainLayout from "@/Layouts/MainLayout";

const PaymentFinished = () => {
    return (
        <MainLayout>
            <section className="min-h-screen">
                <h1>Payment Finished</h1>
                <p>Thank you for your payment.</p>
            </section>
        </MainLayout>
    );
};

export default PaymentFinished;