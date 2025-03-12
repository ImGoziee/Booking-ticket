<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schedule::insert([
            [
                'event_id' => 1,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location A',
                'ticket_price' => 100.00,
                'ticket_quantity' => 50,
                'ticket_sold' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 1,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location B',
                'ticket_price' => 150.00,
                'ticket_quantity' => 30,
                'ticket_sold' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location C',
                'ticket_price' => 200.00,
                'ticket_quantity' => 40,
                'ticket_sold' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location D',
                'ticket_price' => 250.00,
                'ticket_quantity' => 20,
                'ticket_sold' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location E',
                'ticket_price' => 250.00,
                'ticket_quantity' => 20,
                'ticket_sold' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 4,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location F',
                'ticket_price' => 250.00,
                'ticket_quantity' => 20,
                'ticket_sold' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 5,
                'date' => '2025-09-18 19:00:00',
                'location' => 'Location G',
                'ticket_price' => 250.00,
                'ticket_quantity' => 20,
                'ticket_sold' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
