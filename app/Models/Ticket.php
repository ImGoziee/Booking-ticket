<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;
    
    protected $table = 'events_ticket';

    protected $fillable = [
        'event_id',
        'category',
        'ticket_price',
        'ticket_quantity',
        'ticket_sold',
    ];
}
