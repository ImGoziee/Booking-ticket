<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use Illuminate\Support\Facades\Log;

class MidtransServices
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$clientKey = config('midtrans.client_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }
    
    public function createTransaction(Order $order)
    {
        $eventDetails = $order->event;
        $ticketDetails = $order->ticket;
        $user = $order->user;
        
        $params = [
            'transaction_details' => [
                'order_id' => 'ORDER-' . $order->id . '-' . time(),
                'gross_amount' => $order->amount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
            ],
            'item_details' => [
                [
                    'id' => $order->ticket_id,
                    'price' => $ticketDetails->price,
                    'quantity' => $order->qty,
                    'name' => $eventDetails->name . ' - ' . $ticketDetails->category,
                ]
            ],
            'callbacks' => [
                'finish' => route('payment.finish'),
                'unfinish' => route('payment.unfinish'),
                'error' => route('payment.error'),
            ]
        ];
        
        try {
            $snapToken = Snap::getSnapToken($params);
            
            return [
                'snap_token' => $snapToken,
                'transaction_id' => $params['transaction_details']['order_id'],
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            return null;
        }
    }
    
    public function handleNotification()
    {
        try {
            $notification = new Notification();
            
            $notificationData = $notification->getResponse();
            $transactionStatus = $notification->transaction_status;
            $paymentType = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraudStatus = $notification->fraud_status;
            $signatureKey = $notification->signature_key;
            
            // Extract order ID from Midtrans format (ORDER-123-timestamp)
            $extractedOrderId = explode('-', $orderId)[1] ?? null;
            
            if (!$extractedOrderId) {
                Log::error('Midtrans notification: Invalid order ID format - ' . $orderId);
                return false;
            }
            
            $order = Order::find($extractedOrderId);
            
            if (!$order) {
                Log::error('Midtrans notification: Order not found - ' . $extractedOrderId);
                return false;
            }
            
            // Validate signature key
            $serverKey = config('midtrans.server_key');
            $orderId = $notification->order_id;
            $statusCode = $notification->status_code;
            $grossAmount = $notification->gross_amount;
            $validSignatureKey = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);
            
            if ($signatureKey !== $validSignatureKey) {
                Log::error('Midtrans notification: Invalid signature key');
                return false;
            }
            
            // Update payment
            $payment = Payment::updateOrCreate(
                ['transaction_id' => $orderId],
                [
                    'order_id' => $order->id,
                    'payment_type' => $paymentType,
                    'gross_amount' => $notification->gross_amount,
                    'currency' => $notification->currency ?? 'IDR',
                    'transaction_time' => $notification->transaction_time,
                    'transaction_status' => $transactionStatus,
                    'fraud_status' => $fraudStatus,
                    'payment_channel' => $notification->acquirer ?? $paymentType,
                    'va_number' => $notification->va_numbers[0]->va_number ?? null,
                    'signature_key' => $signatureKey,
                    'payment_details' => json_encode($notificationData),
                ]
            );
            
            // Update order status
            if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
                $order->status = 'paid';
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel' || $transactionStatus == 'expire') {
                $order->status = 'failed';
            } else {
                $order->status = 'pending';
            }
            
            $order->save();
            
            Log::info('Midtrans payment notification processed successfully for order #' . $order->id . ' with status: ' . $transactionStatus);
            
            return [
                'order' => $order,
                'payment' => $payment,
                'status' => $transactionStatus
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans notification error: ' . $e->getMessage());
            return false;
        }
    }
}