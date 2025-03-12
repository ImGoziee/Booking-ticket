<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\MidtransService;

class CheckoutController extends Controller
{
    public function showForm(Request $request)
    {
        $ticketData = $request->all();

        if (isset($ticketData['data']) && is_array($ticketData['data'])) {
            $ticketData = $ticketData['data'];
        }

        if (!empty($ticketData)) {
            session(['ticketData' => $ticketData]);
        } else {
            $ticketData = session('ticketData', []);
        }

        if (isset($ticketData['event_id'])) {
            $event = Event::find($ticketData['event_id']);
            if ($event) {
                $ticketData['name'] = $event->name;
                $ticketData['images'] = $event->images;
                $ticketData['location'] = $event->location;
                $ticketData['date'] = $event->date;
            }
        }
        
        return Inertia::render('Main/FormOrder', [
            'ticketData' => $ticketData
        ]);
    }

    public function processOrder(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
            'ticket_id' => 'required|exists:events_ticket,id',
            'qty' => 'required|integer|min:1',
            'amount' => 'required|numeric|min:0',
        ]);

        $order = Order::create($validated);

        return redirect()->route('checkout.confirmation', ['order' => $order->id]);
    }

    public function confirmation($orderId)
    {
        $order = Order::with(['user', 'event', 'ticket'])->findOrFail($orderId);
        $eventName = $order->event->name;
        $eventLocation = $order->event->location;
        $eventDate = $order->event->date;
        $ticketCategory = $order->ticket->category;
        $quantity = $order->qty;
        $totalAmount = $order->amount;
        
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Main/PaymentConfirmation', [
            'order' => $order,
            'eventDetails' => [
                'name' => $eventName,
                'location' => $eventLocation,
                'date' => $eventDate,
            ],
            'ticketDetails' => [
                'category' => $ticketCategory,
                'quantity' => $quantity,
                'totalAmount' => $totalAmount,
            ],
        ]);
    }
}
