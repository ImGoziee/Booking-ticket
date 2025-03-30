<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Ticket;
use App\Models\Event;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Log;

class TicketController extends Controller
{
    public function index(Event $event)
    {
        $tickets = Ticket::where('event_id', $event->id)->orderBy('category', 'asc')->get();

        return Inertia::render('Admin/Events/EventsTicket', [
            'event' => $event,
            'tickets' => $tickets,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        try {
            $validatedData = $request->validate([
                'category' => 'required|string|max:255',
                'ticket_price' => 'required|numeric|min:0',
                'ticket_quantity' => 'required|integer|min:1',
            ]);

            Ticket::create([
                'event_id' => $event->id,
                'category' => $validatedData['category'],
                'ticket_price' => $validatedData['ticket_price'],
                'ticket_quantity' => $validatedData['ticket_quantity'],
            ]);

            return back()->with('success', 'Data added successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function update(Request $request, Event $event, Ticket $ticket)
    {
        try {
            $validatedData = $request->validate([
                'category' => 'required|string|max:255',
                'ticket_price' => 'required|numeric|min:0',
                'ticket_quantity' => 'required|integer|min:1',
            ]);

            $ticket->update($validatedData);

            return back()->with('success', 'Data updated successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function destroy(Event $event, Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->back()->with('success', 'Ticket deleted successfully');
    }
}

