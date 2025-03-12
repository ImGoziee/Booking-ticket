import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import RupiahFormatter from "@/lib/RupiahFormatter";

const PaymentConfirmation = () => {
    const { order, eventDetails, ticketDetails } = usePage().props;

    useEffect(() => {
        // Memuat script Midtrans secara dinamis
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            // Membersihkan script saat komponen di-unmount
            document.body.removeChild(script);
        };
    }, []);

    const proceedToMidtrans = async () => {
        try {
            const response = await axios.post(route('midtrans.create-payment', { order: order.id }));
            const snapToken = response.data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    console.log(result)
                    window.location.href = route('midtrans.payment-finished');
                },
                onPending: function(result) {
                    console.log(result);
                },
                onError: function(result) {
                    console.log(result);
                },
                onClose: function() {
                    console.log('Customer closed the popup without finishing the payment');
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>
            <section className="min-h-screen">
                Order ID: {order.id}
                <div>
                    {eventDetails.name}<br />
                    {eventDetails.date}<br />
                    {eventDetails.location}<br />
                    {ticketDetails.category}<br />
                    {ticketDetails.quantity}<br />
                    <RupiahFormatter value={ticketDetails.totalAmount} /><br />
                </div>
                <button className="p-4 bg-[#5447FF]" onClick={proceedToMidtrans}>Complete Payment</button>
                <Link href={route("getDetail", {id: order.event_id,})} as="button" className="p-4 bg-gray-100 ">Back to Event</Link>
            </section>
        </MainLayout>
    );
};

export default PaymentConfirmation;