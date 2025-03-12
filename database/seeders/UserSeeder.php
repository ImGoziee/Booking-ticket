<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'Admin', 'email' => 'admin@test.com', 'role' => 'admin'],
            ['name' => 'Gozi', 'email' => 'gozi@test.com'],
            ['name' => 'Eddie Van Halen', 'email' => 'eddievh@gmail.com'],
            ['name' => 'Liam Gallagher', 'email' => 'liamgallagher@gmail.com'],
            ['name' => 'James Hetfield', 'email' => 'hetfield@gmail.com'],
            ['name' => 'Jon Bon Jovi', 'email' => 'jbj@yahoo.com'],
            ['name' => 'John Lennon', 'email' => 'lennon@test.com'],
            ['name' => 'Bill Ward', 'email' => 'bill@test.com'],
            ['name' => 'Julian Satria W', 'email' => 'julian@test.com'],
            ['name' => 'Dave Mustaine', 'email' => 'dave@test.com'],
            ['name' => 'George Harrison', 'email' => 'george@test.com'],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => Hash::make('user123'),
                    'role' => $user['role'] ?? 'user',
                    'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
