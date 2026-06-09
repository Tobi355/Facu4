<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservaController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'servicio_id' => 'required|exists:servicios,id',
            'fecha' => 'required|date|after_or_equal:today',
            'hora' => 'required',
            'observaciones' => 'nullable|string',
        ]);

        $servicio = Servicio::findOrFail($data['servicio_id']);

        $reserva = Reserva::create([
            'user_id' => Auth::id(),
            'servicio_id' => $servicio->id,
            'fecha' => $data['fecha'],
            'estado' => 'pendiente', // o confirmada
            'observaciones' => $data['observaciones'] ?? null,
        ]);

        return redirect()->route('perfil.index')->with('success', 'Reserva creada exitosamente.');
    }

    public function destroy(Reserva $reserva)
    {
        if ($reserva->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            abort(403);
        }
        $reserva->delete();
        return back()->with('success', 'Reserva cancelada.');
    }
}
