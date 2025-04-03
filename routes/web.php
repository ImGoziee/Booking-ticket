<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\GetArtistController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// main page group
Route::prefix('/')->group(function () {
    Route::get('/', fn() => Inertia::render('Main/Home'))->name('home');
    Route::get('/myticket', fn() => Inertia::render('Main/MyTicket'))->name('myticket');
});

// E-ticket
Route::middleware(['auth'])->group(function () {
    Route::get('/eticket/{ticket}', fn($ticket) => Inertia::render('Main/ETicket', ['ticket_id' => $ticket]))->name('eticket');
});

// Checkout - Payment
Route::middleware(['auth'])->group(function () {
    Route::get('/checkout/form/{order}', [OrdersController::class, 'showForm'])->name('checkout.form');
    Route::post('/checkout/process', [OrdersController::class, 'processOrder'])->name('checkout.process');
    Route::get('/checkout/confirmation/{order}', [OrdersController::class, 'confirmation'])->name('checkout.confirmation');

    Route::post('/midtrans/create-payment/{order}', [PaymentsController::class, 'createPayment'])->name('midtrans.create-payment');
    Route::get('/midtrans/payment-finished', [PaymentsController::class, 'paymentFinished'])->name('midtrans.payment-finished');
});

// Admin Route Group
Route::middleware(['auth', 'verified', CheckRole::class . ':admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Master User
    Route::prefix('/users')->name('users.')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::post('/store', [UsersController::class, 'store'])->name('store');
        Route::put('/{user}', [UsersController::class, 'update'])->name('update');
        Route::delete('/{user}', [UsersController::class, 'destroy'])->name('destroy');
    });

    // Master Events
    Route::prefix('/events')->name('events.')->group(function () {
        Route::get('/', [EventsController::class, 'index'])->name('index');
        Route::post('/store', [EventsController::class, 'store'])->name('store');
        Route::put('/{event}', [EventsController::class, 'update'])->name('update');
        Route::delete('/{event}', [EventsController::class, 'destroy'])->name('destroy');

        // event schedule page
        // Route::prefix('/{event}/schedule')->name('schedule.')->group(function () {
        //     Route::get('/', [ScheduleController::class, 'index'])->name('index');
        //     Route::post('/store', [ScheduleController::class, 'store'])->name('store');
        //     Route::put('/{schedule}', [ScheduleController::class, 'update'])->name('update');
        //     Route::delete('/{schedule}', [ScheduleController::class, 'destroy'])->name('destroy');
        // });

        // event schedule page
        Route::prefix('/{event}/ticket')->name('ticket.')->group(function () {
            Route::get('/', [TicketController::class, 'index'])->name('index');
            Route::post('/store', [TicketController::class, 'store'])->name('store');
            Route::put('/{ticket}', [TicketController::class, 'update'])->name('update');
            Route::delete('/{ticket}', [TicketController::class, 'destroy'])->name('destroy');
        });
    });

    // List of orders
    Route::prefix('/orders')->name('orders.')->group(function () {
        Route::get('/', [OrdersController::class, 'index'])->name('index');
        Route::delete('/{order}', [OrdersController::class, 'destroy'])->name('destroy');
    });

    // List of payments
    Route::prefix('/payments')->name('payments.')->group(function () {
        Route::get('/', [PaymentsController::class, 'index'])->name('index');
        Route::delete('/{payment}', [PaymentsController::class, 'destroy'])->name('destroy');
    });
});

// Get Data -json
Route::prefix('/getData')->group(function () {
    Route::get('/events', [EventsController::class, 'getEvents']);
    Route::get('/events/{id}', [EventsController::class, 'showDetail'])->name('getDetail');
    Route::get('/orders/{ticket_id?}', [OrdersController::class, 'getOrderTicket']);
});

Route::get('/api/bands', [GetArtistController::class, 'fetchBands']);

// Auth - Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
