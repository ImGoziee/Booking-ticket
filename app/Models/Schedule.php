<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    /** @use HasFactory<\Database\Factories\ScheduleFactory> */
    use HasFactory;

    protected $table = 'events_schedule';

    protected $fillable = [
        'event_id',
        'date',
        'location',
        'ticket_price',
        'ticket_quantity',
        'ticket_sold',
    ];
}
