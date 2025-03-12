<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Event;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Event $event)
    {
        $schedules = Schedule::where('event_id', $event->id)->get();

        return Inertia::render('Admin/Events/EventsSchedule', [
            'event' => $event,
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        try {
            $validatedData = $request->validate([
                'date' => 'required|date',
                'location' => 'required|string|max:255',
                'ticket_price' => 'required|numeric|min:0',
                'ticket_quantity' => 'required|integer|min:1',
            ]);

            Schedule::create([
                'event_id' => $event->id,
                'date' => $validatedData['date'],
                'location' => $validatedData['location'],
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

    public function update(Request $request, Event $event, Schedule $schedule)
    {
        try {
            $validatedData = $request->validate([
                'date' => 'required|date',
                'location' => 'required|string|max:255',
                'ticket_price' => 'required|numeric|min:0',
                'ticket_quantity' => 'required|integer|min:1',
            ]);
    
            $schedule->update($validatedData);
    
            return back()->with('success', 'Data updated successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function destroy(Event $event, Schedule $schedule)
    {
        $schedule->delete();

        return redirect()->back()->with('success', 'Schedule deleted successfully');
    }
}
