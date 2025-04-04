<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ticket::insert([
            // Metallica (Event ID 1)
            [
                'event_id' => 1,
                'category' => 'CAT 1A',
                'ticket_price' => 3500000.00,
                'ticket_quantity' => 500,
                'ticket_sold' => 470,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 1,
                'category' => 'CAT 1B',
                'ticket_price' => 2750000.00,
                'ticket_quantity' => 750,
                'ticket_sold' => 620,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 1,
                'category' => 'CAT 2A',
                'ticket_price' => 1800000.00,
                'ticket_quantity' => 1000,
                'ticket_sold' => 650,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 1,
                'category' => 'CAT 2B',
                'ticket_price' => 1500000.00,
                'ticket_quantity' => 1200,
                'ticket_sold' => 540,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 1,
                'category' => 'CAT 3',
                'ticket_price' => 950000.00,
                'ticket_quantity' => 2000,
                'ticket_sold' => 1200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Black Sabbath (Event ID 2)
            [
                'event_id' => 2,
                'category' => 'CAT 1A',
                'ticket_price' => 3200000.00,
                'ticket_quantity' => 400,
                'ticket_sold' => 390,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'category' => 'CAT 1B',
                'ticket_price' => 2600000.00,
                'ticket_quantity' => 600,
                'ticket_sold' => 580,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'category' => 'CAT 2A',
                'ticket_price' => 1900000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 800,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'category' => 'CAT 2B',
                'ticket_price' => 1550000.00,
                'ticket_quantity' => 1100,
                'ticket_sold' => 950,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 2,
                'category' => 'CAT 3',
                'ticket_price' => 900000.00,
                'ticket_quantity' => 1800,
                'ticket_sold' => 1500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Deftones (Event ID 3)
            [
                'event_id' => 3,
                'category' => 'CAT 1A',
                'ticket_price' => 2800000.00,
                'ticket_quantity' => 300,
                'ticket_sold' => 210,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'category' => 'CAT 1B',
                'ticket_price' => 2300000.00,
                'ticket_quantity' => 450,
                'ticket_sold' => 290,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'category' => 'CAT 2A',
                'ticket_price' => 1750000.00,
                'ticket_quantity' => 800,
                'ticket_sold' => 420,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'category' => 'CAT 2B',
                'ticket_price' => 1400000.00,
                'ticket_quantity' => 1000,
                'ticket_sold' => 560,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 3,
                'category' => 'CAT 3',
                'ticket_price' => 850000.00,
                'ticket_quantity' => 1500,
                'ticket_sold' => 700,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Megadeth (Event ID 4)
            [
                'event_id' => 4,
                'category' => 'CAT 1A',
                'ticket_price' => 2900000.00,
                'ticket_quantity' => 350,
                'ticket_sold' => 320,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 4,
                'category' => 'CAT 1B',
                'ticket_price' => 2400000.00,
                'ticket_quantity' => 500,
                'ticket_sold' => 460,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 4,
                'category' => 'CAT 2A',
                'ticket_price' => 1850000.00,
                'ticket_quantity' => 750,
                'ticket_sold' => 680,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 4,
                'category' => 'CAT 2B',
                'ticket_price' => 1450000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 720,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 4,
                'category' => 'CAT 3',
                'ticket_price' => 900000.00,
                'ticket_quantity' => 1600,
                'ticket_sold' => 980,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Linkin Park (Event ID 5)
            [
                'event_id' => 5,
                'category' => 'CAT 1A',
                'ticket_price' => 3800000.00,
                'ticket_quantity' => 600,
                'ticket_sold' => 590,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 5,
                'category' => 'CAT 1B',
                'ticket_price' => 3000000.00,
                'ticket_quantity' => 800,
                'ticket_sold' => 780,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 5,
                'category' => 'CAT 2A',
                'ticket_price' => 2250000.00,
                'ticket_quantity' => 1200,
                'ticket_sold' => 1150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 5,
                'category' => 'CAT 2B',
                'ticket_price' => 1750000.00,
                'ticket_quantity' => 1500,
                'ticket_sold' => 1420,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 5,
                'category' => 'CAT 3',
                'ticket_price' => 1100000.00,
                'ticket_quantity' => 2500,
                'ticket_sold' => 2100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Iron Maiden (Event ID 6)
            [
                'event_id' => 6,
                'category' => 'CAT 1A',
                'ticket_price' => 3250000.00,
                'ticket_quantity' => 450,
                'ticket_sold' => 410,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 6,
                'category' => 'CAT 1B',
                'ticket_price' => 2650000.00,
                'ticket_quantity' => 650,
                'ticket_sold' => 590,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 6,
                'category' => 'CAT 2A',
                'ticket_price' => 1950000.00,
                'ticket_quantity' => 850,
                'ticket_sold' => 760,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 6,
                'category' => 'CAT 2B',
                'ticket_price' => 1600000.00,
                'ticket_quantity' => 1050,
                'ticket_sold' => 890,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 6,
                'category' => 'CAT 3',
                'ticket_price' => 950000.00,
                'ticket_quantity' => 1700,
                'ticket_sold' => 1350,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Slipknot (Event ID 7)
            [
                'event_id' => 7,
                'category' => 'CAT 1A',
                'ticket_price' => 3100000.00,
                'ticket_quantity' => 400,
                'ticket_sold' => 380,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 7,
                'category' => 'CAT 1B',
                'ticket_price' => 2500000.00,
                'ticket_quantity' => 600,
                'ticket_sold' => 570,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 7,
                'category' => 'CAT 2A',
                'ticket_price' => 1900000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 820,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 7,
                'category' => 'CAT 2B',
                'ticket_price' => 1500000.00,
                'ticket_quantity' => 1100,
                'ticket_sold' => 950,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 7,
                'category' => 'CAT 3',
                'ticket_price' => 900000.00,
                'ticket_quantity' => 1800,
                'ticket_sold' => 1450,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Tool (Event ID 8)
            [
                'event_id' => 8,
                'category' => 'CAT 1A',
                'ticket_price' => 3400000.00,
                'ticket_quantity' => 300,
                'ticket_sold' => 295,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 8,
                'category' => 'CAT 1B',
                'ticket_price' => 2800000.00,
                'ticket_quantity' => 450,
                'ticket_sold' => 440,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 8,
                'category' => 'CAT 2A',
                'ticket_price' => 2100000.00,
                'ticket_quantity' => 700,
                'ticket_sold' => 680,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 8,
                'category' => 'CAT 2B',
                'ticket_price' => 1700000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 860,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 8,
                'category' => 'CAT 3',
                'ticket_price' => 1050000.00,
                'ticket_quantity' => 1500,
                'ticket_sold' => 1380,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Rage Against The Machine (Event ID 9)
            [
                'event_id' => 9,
                'category' => 'CAT 1A',
                'ticket_price' => 3000000.00,
                'ticket_quantity' => 400,
                'ticket_sold' => 380,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 9,
                'category' => 'CAT 1B',
                'ticket_price' => 2450000.00,
                'ticket_quantity' => 600,
                'ticket_sold' => 560,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 9,
                'category' => 'CAT 2A',
                'ticket_price' => 1850000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 820,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 9,
                'category' => 'CAT 2B',
                'ticket_price' => 1450000.00,
                'ticket_quantity' => 900,
                'ticket_sold' => 980,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 9,
                'category' => 'CAT 3',
                'ticket_price' => 850000.00,
                'ticket_quantity' => 1800,
                'ticket_sold' => 1530,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Korn (Event ID 10)
            [
                'event_id' => 10,
                'category' => 'CAT 1A',
                'ticket_price' => 2700000.00,
                'ticket_quantity' => 350,
                'ticket_sold' => 310,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 10,
                'category' => 'CAT 1B',
                'ticket_price' => 2200000.00,
                'ticket_quantity' => 550,
                'ticket_sold' => 480,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 10,
                'category' => 'CAT 2A',
                'ticket_price' => 1650000.00,
                'ticket_quantity' => 800,
                'ticket_sold' => 690,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 10,
                'category' => 'CAT 2B',
                'ticket_price' => 1300000.00,
                'ticket_quantity' => 1000,
                'ticket_sold' => 820,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 10,
                'category' => 'CAT 3',
                'ticket_price' => 800000.00,
                'ticket_quantity' => 1600,
                'ticket_sold' => 1200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Slayer (Event ID 11)
            [
                'event_id' => 11,
                'category' => 'CAT 1A',
                'ticket_price' => 2850000.00,
                'ticket_quantity' => 400,
                'ticket_sold' => 390,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 11,
                'category' => 'CAT 1B',
                'ticket_price' => 2350000.00,
                'ticket_quantity' => 600,
                'ticket_sold' => 580,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 11,
                'category' => 'CAT 2A',
                'ticket_price' => 1800000.00,
                'ticket_quantity' => 850,
                'ticket_sold' => 810,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 11,
                'category' => 'CAT 2B',
                'ticket_price' => 1400000.00,
                'ticket_quantity' => 1050,
                'ticket_sold' => 980,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'event_id' => 11,
                'category' => 'CAT 3',
                'ticket_price' => 850000.00,
                'ticket_quantity' => 1700,
                'ticket_sold' => 1500,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
