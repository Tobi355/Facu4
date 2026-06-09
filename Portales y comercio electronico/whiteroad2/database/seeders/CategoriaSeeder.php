<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [

            [
                'nombre' => 'Lubricación',
                'descripcion' => 'Cambio de aceite y filtros',
                'estado' => 'activo'
            ],

            [
                'nombre' => 'Transmisión',
                'descripcion' => 'Cadena, corona, piñón y transmisión',
                'estado' => 'activo'
            ],

            [
                'nombre' => 'Frenos',
                'descripcion' => 'Sistema de frenos',
                'estado' => 'activo'
            ],

            [
                'nombre' => 'Motor',
                'descripcion' => 'Servicios de motor',
                'estado' => 'activo'
            ],

            [
                'nombre' => 'Electricidad',
                'descripcion' => 'Sistema eléctrico',
                'estado' => 'activo'
            ],

            [
                'nombre' => 'Lavado',
                'descripcion' => 'Spa y limpieza',
                'estado' => 'activo'
            ],

        ];

        foreach ($categorias as $categoria) {

            Categoria::create($categoria);

        }
    }
}
