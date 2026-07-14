<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $fillable = [
        'user_id',
        'servicio_id',
        'fecha',
        'hora',
        'estado',
        'observaciones'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }
}
