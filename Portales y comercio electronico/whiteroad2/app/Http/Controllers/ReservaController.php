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
        if (Auth::user() && Auth::user()->role === 'admin') {
            abort(403);
        }

        $data = $request->validate([
            'servicio_id' => 'required|exists:servicios,id',
            'fecha' => 'required|date|after_or_equal:today',
            'hora' => ['required','date_format:H:i'],
            'observaciones' => 'nullable|string',
        ]);

        // validar horario laboral
        $hora = $data['hora'];
        if ($hora < '09:00' || $hora > '17:00') {
            return back()->withErrors(['hora' => 'La hora debe estar entre 09:00 y 17:00.'])->withInput();
        }

        $servicio = Servicio::findOrFail($data['servicio_id']);

        // evitar duplicados para mismo usuario, servicio, fecha y hora
        $exists = Reserva::where('user_id', Auth::id())
            ->where('servicio_id', $servicio->id)
            ->where('fecha', $data['fecha'])
            ->where('hora', $data['hora'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['fecha' => 'Ya existe una reserva para esa fecha y hora.'])->withInput();
        }

        $reserva = Reserva::create([
            'user_id' => Auth::id(),
            'servicio_id' => $servicio->id,
            'fecha' => $data['fecha'],
            'hora' => $data['hora'],
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
