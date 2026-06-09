<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $fillable = [
        'nombre',
        'precio',
        'descripcion',
        'duracion',
        'condiciones',
        'imagen',
        'activo',
        'destacado',
        'categoria_id'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    public function usuarios()
    {
        return $this->belongsToMany(
            User::class,
            'reservas'
        );
    }
}
