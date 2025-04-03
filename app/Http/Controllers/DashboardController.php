<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // user stats
        $totalUsers = User::count();
        $newUsersThisWeek = User::where('created_at', '>=', Carbon::now()->startOfWeek())->count();

        // event stats
        $totalEvents = Event::count();
        $upcomingEvents = Event::where('date', '>=', now())->count();

        // ticket stats
        $totalSold = Ticket::sum('ticket_sold');
        $soldThisWeek = Order::whereHas('payments')
            ->where('created_at', '>=', Carbon::now()->startOfWeek())
            ->sum(column: 'qty');
        $growth = $totalSold > 0 ? number_format((($soldThisWeek / $totalSold) * 100), 1) : 0;

        // total revenue
        $totalRevenue = Payment::sum('amount');

        // Monthly sales data
        $monthlySalesData = [];
        for ($month = 1; $month <= 12; $month++) {
            $sales = Order::whereHas('payments')->whereMonth('created_at', $month)->sum('qty');
            $monthlySalesData[] = [
                'name' => Carbon::create()->month($month)->format('M'),
                'sales' => $sales,
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'userStats' => [
                'totalUsers' => $totalUsers,
                'newUsersThisWeek' => $newUsersThisWeek,
            ],
            'eventStats' => [
                'totalEvents' => $totalEvents,
                'upcomingEvents' => $upcomingEvents,
            ],
            'ticketStats' => [
                'totalSold' => $totalSold,
                'soldThisWeek' => $soldThisWeek,
                'growth' => $growth,
            ],
            'totalRevenue' => $totalRevenue,
            'monthlySalesData' => $monthlySalesData,
        ]);
    }
}
