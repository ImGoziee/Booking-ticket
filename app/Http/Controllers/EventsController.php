<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Storage;

class EventsController extends Controller
{
    public function index()
    {
        // $data = Event::orderBy('id', 'asc')->get()->map(function ($event) {
        //     $event->status = ($event->ticket_quantity - $event->ticket_sold) != 0 ? 'ready' : 'soldout';
        //     return $event;
        // });
        $data = Event::orderBy('id', 'asc')->get();

        return Inertia::render('Admin/Events/EventsPage', ['events' => $data]);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'location' => 'required|string|max:255',
                'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000'
            ]);

            $eventData = [
                'name' => $validatedData['name'],
                'date' => $request['date'],
                'location' => $request['location'],
                'description' => $validatedData['description'],
            ];

            if ($request->hasFile('image_file')) {
                $imagePath = $request->file('image_file')->store('images', 'public');
                $eventData['images'] = asset('storage/' . $imagePath);
            }

            Event::create($eventData);

            return back()->with('success', 'Data added successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function update(Request $request, Event $event)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'location' => 'required|string|max:255',
                'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000'
            ]);

            $validatedData = [
                'name' => $request->name,
                'date' => $request->date,
                'location' => $request->location,
                'description' => $request->description,
            ];

            if ($request->hasFile('image_file')) {
                if ($event->images) {
                    $oldPath = str_replace(asset('storage/'), '', $event->images);
                    Storage::disk('public')->delete($oldPath);
                }

                $imagePath = $request->file('image_file')->store('images', 'public');
                $validatedData['images'] = asset(path: 'storage/' . $imagePath);
            }

            $event->update($validatedData);

            return back()->with('success', 'Data updated successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            dd($e);
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');
        }
    }

    public function destroy(Event $event)
    {
        try {
            $event->delete();
            return redirect()->back()->with('success', 'Data deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete data');
        }
    }

    public function getEvents(Request $request)
    {
        $query = Event::query();

        if ($request->filled('artist')) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->artist) . '%']);
        }
        $events = $query->get();

        return response()->json($events);
    }

    public function showDetail($id)
    {
        $event = Event::with(['tickets' => function ($query) {
            $query->orderBy('ticket_price', 'desc');
        }])->findOrFail($id);
        return Inertia::render('Main/EventsDetail', [
            'events' => $event,
            'tickets' => $event->tickets
        ]);
    }
}
