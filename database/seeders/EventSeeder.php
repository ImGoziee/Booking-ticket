<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::insert([
            [
                'name' => 'Metallica World Tour 2025',
                'date' => '2025-06-18 19:00:00',
                'description' => 'Metallica concert bringing their heaviest hits to fans worldwide.',
                'location' => 'Gelora Bung Karno Stadium, Jakarta',
                'images' => '/storage/images/metallica.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Black Sabbath Tour: Back to the Beginning 2025',
                'date' => '2025-07-22 20:00:00',
                'description' => 'Black Sabbath returns with their legendary sound in the Back to the Beginning Tour 2025.',
                'location' => 'Wembley Stadium, London',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/black-sabbath.jpg'
            ],
            [
                'name' => 'Deftones: Around the Fur Tour 2025',
                'date' => '2025-08-15 19:30:00',
                'description' => 'Deftones embark on their Around the Fur Tour 2025, bringing their iconic sound to fans worldwide.',
                'location' => 'Madison Square Garden, New York',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/deftones.png'
            ],
            [
                'name' => 'Megadeth - Rust in Peace Tour',
                'date' => '2025-09-03 19:00:00',
                'description' => 'Megadeth plays the classic album "Rust in Peace" in full for this special anniversary tour!',
                'location' => 'The Forum, Los Angeles',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/megadeth.png'
            ],
            [
                'name' => 'Linkin Park From Zero World Tour',
                'date' => '2025-08-27 20:00:00',
                'description' => 'From Zero World Tour is an ongoing concert tour by American rock band Linkin Park in support of the band\'s eighth studio album From Zero (2024)',
                'location' => 'Olympic Stadium, Seoul',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/linkin-park.png'
            ],
            [
                'name' => 'Iron Maiden Legacy of the Beast Tour',
                'date' => '2025-07-08 19:00:00',
                'description' => 'Iron Maiden brings their spectacular stage show with all their classic hits and new material.',
                'location' => 'O2 Arena, Prague',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/iron-maiden.png'
            ],
            [
                'name' => 'Slipknot 30th Anniversary Tour',
                'date' => '2025-10-12 19:30:00',
                'description' => 'Slipknot celebrates 30 years of mayhem with a special anniversary tour featuring rare tracks.',
                'location' => 'Download Festival Grounds, Donington Park',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/slipknot.png'
            ],
            [
                'name' => 'System of a Down Reunion Tour',
                'date' => '2025-11-05 20:00:00',
                'description' => 'System of a Down reunites for a special limited engagement tour performing their greatest hits.',
                'location' => 'AccorHotels Arena, Paris',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/system-of-a-down.png'
            ],
            [
                'name' => 'Tool Fear Inoculum Extended Tour',
                'date' => '2025-09-29 19:30:00',
                'description' => 'Tool continues their critically acclaimed tour supporting Fear Inoculum with an immersive visual experience.',
                'location' => 'Rogers Arena, Vancouver',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/tool.png'
            ],
            [
                'name' => 'Rammstein Stadium Tour 2025',
                'date' => '2025-06-07 20:00:00',
                'description' => 'Rammstein brings their explosive pyrotechnic show to stadiums around the world.',
                'location' => 'Olympiastadion, Berlin',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/rammstein.png'
            ],
            [
                'name' => 'Rage Against The Machine Revolution Tour',
                'date' => '2025-08-18 19:00:00',
                'description' => 'Rage Against The Machine brings their politically charged anthems back to the stage.',
                'location' => 'Coachella Grounds, Indio',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/ratm.png'
            ],
            [
                'name' => 'Korn Follow The Leader Anniversary',
                'date' => '2025-07-30 19:30:00',
                'description' => 'Korn celebrates the anniversary of Follow The Leader by playing the album in its entirety.',
                'location' => 'Hollywood Bowl, Los Angeles',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/korn.png'
            ],
            [
                'name' => 'Slayer Final World Tour - The Last Stand',
                'date' => '2025-10-31 20:00:00',
                'description' => 'Slayer returns for one final tour before hanging up their instruments for good.',
                'location' => 'Ziggo Dome, Amsterdam',
                'created_at' => now(),
                'updated_at' => now(),
                'images' => '/storage/images/slayer.png'
            ]
        ]);
    }
}