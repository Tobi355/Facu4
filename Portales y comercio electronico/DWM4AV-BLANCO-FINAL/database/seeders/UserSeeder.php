<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@whiteroad.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'telefono' => null,
        ]);
        User::create([
            'name' => 'Usuario Prueba',
            'email' => 'usuario@whiteroad.com',
            'password' => Hash::make('usuario123'),
            'role' => 'user',
            'telefono' => '+54 9 11 1234-5678',
        ]);
    }
}
