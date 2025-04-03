<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Notification;

class PaymentsController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.sanitized');
        Config::$is3ds = config('services.midtrans.3ds');
    }

    public function index()
    {
        $data = Payment::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Payments/PaymentsPage', ['payments' => $data]);
    }

    public function createPayment(Request $request, $orderId)
    {
        $order = Order::findOrFail($orderId);

        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->amount,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
            ],
            'enabled_payments' => [
                'credit_card', 
                'bca_va', 
                'bni_va', 
                'bri_va', 
                'permata_va', 
                'other_va'
            ]
        ];

        $snapToken = \Midtrans\Snap::getSnapToken($params);

         
        return response()->json(['snap_token' => $snapToken]);
    }

    public function handleNotification(Request $request)
    {
        $notif = new Notification();

        $expectedSignatureKey = hash('sha512', $notif->order_id . $notif->status_code . $notif->gross_amount . config('services.midtrans.server_key'));

        if ($notif->signature_key !== $expectedSignatureKey) {
            return response()->json(['status' => 'error', 'message' => 'Invalid signature key'], 403);
        }

        $order = Order::find($notif->order_id);
        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        Payment::create([
            'order_id' => $order->id,
            'amount' => $notif->gross_amount,
            'payment_method' => $notif->payment_type,
            'status' => $notif->transaction_status,
        ]);

        $ticket = Ticket::find($order->ticket_id);
        if ($ticket) {
            $ticket->incrementSoldTickets($order->qty);
        }

        return response()->json(['status' => 'success']);
    }

    public function paymentFinished(Request $request)
    {
        Log::info('Payment finished request:', $request->all());
        return Inertia::render('Main/MidtransEndpoint/PaymentFinished');
    }
}
