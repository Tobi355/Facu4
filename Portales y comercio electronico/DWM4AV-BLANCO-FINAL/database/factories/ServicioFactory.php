<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Servicio;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServicioFactory extends Factory
{
    protected $model = Servicio::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->sentence(3),
            'precio' => $this->faker->numberBetween(1000, 5000),
            'descripcion' => $this->faker->paragraph(),
            'duracion' => '1 hora',
            'condiciones' => 'Condiciones de prueba',
            'imagen' => null,
            'activo' => true,
            'destacado' => true,
            'categoria_id' => Categoria::factory(),
        ];
    }
}
