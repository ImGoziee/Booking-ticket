<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class OrdersController extends Controller
{
    public function index()
    {
        $data = Order::with(['user', 'event', 'ticket'])->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Orders/OrdersPage', ['orders' => $data]);
    }

    public function showForm($orderId)
    {
        $order = Order::with(['user', 'event', 'ticket'])->findOrFail($orderId);

        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Main/FormOrder', ['order' => $order]);
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

        return redirect()->route('checkout.form', ['order' => $order->id]);
    }

    public function getOrderTicket($ticket_id = null)
    {
        $query = Order::with(['user', 'event', 'ticket'])
            ->whereHas('payments')
            ->where('user_id', auth()->id());

        if ($ticket_id) {
            $query->where('id', $ticket_id);
        }
        $orders = $query->get();
        return response()->json($orders);
    }

    public function destroy(Order $order)
    {
        try {
            $order->delete();
            return redirect()->back()->with('success', 'Data deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete data');
        }
    }
}
