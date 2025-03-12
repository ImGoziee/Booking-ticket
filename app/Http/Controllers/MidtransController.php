<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function __construct()
    {
        // Set konfigurasi Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.sanitized');
        Config::$is3ds = config('services.midtrans.3ds');
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

        return response()->json(['status' => 'success']);
    }

    public function paymentFinished(Request $request)
    {
        // Redirect ke halaman setelah pembayaran selesai
        return Inertia::render('Main/PaymentFinished');
    }
}