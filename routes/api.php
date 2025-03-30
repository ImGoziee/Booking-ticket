<?php

use App\Http\Controllers\PaymentsController;
use Illuminate\Support\Facades\Route;

Route::post('/midtrans/notification', [PaymentsController::class, 'handleNotification'])->name('midtrans.notification');

