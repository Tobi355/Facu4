<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Servicio;
use App\Models\Categoria;
use App\Models\Reserva;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalUsuarios = User::count();
        $totalServicios = Servicio::where('activo', true)->count();
        $totalReservas = Reserva::count();
        $totalCategorias = Categoria::count();
        $totalContactos = ContactMessage::where('estado', 'nuevo')->count();
        $reservasRecientes = Reserva::with(['usuario', 'servicio'])->latest()->limit(5)->get();
        return view('admin.dashboard', compact(
            'totalUsuarios', 'totalServicios', 'totalReservas',
            'totalCategorias', 'totalContactos', 'reservasRecientes'
        ));
    }

    public function usuarios()
    {
        $usuarios = User::withCount('reservas')->get();
        return view('admin.usuarios.index', compact('usuarios'));
    }

    public function destroyUsuario(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'No podés eliminarte a vos mismo.');
        }
        $user->delete();
        return back()->with('success', 'Usuario eliminado.');
    }

    public function reservas()
    {
        $reservas = Reserva::with(['usuario', 'servicio'])->latest()->get();
        return view('admin.reservas.index', compact('reservas'));
    }

    public function cambiarEstadoReserva(Request $request, Reserva $reserva)
    {
        $request->validate(['estado' => 'required|in:pendiente,confirmada,cancelada,completada']);
        $reserva->estado = $request->estado;
        $reserva->save();
        return back()->with('success', 'Estado actualizado.');
    }

    // ── Contactos ──────────────────────────────────────────────────────────────

    public function contactos()
    {
        $contactos = ContactMessage::latest()->get();
        return view('admin.contactos.index', compact('contactos'));
    }

    public function cambiarEstadoContacto(Request $request, ContactMessage $contactMessage)
    {
        $request->validate(['estado' => 'required|in:nuevo,leído,respondido']);
        $contactMessage->estado = $request->estado;
        $contactMessage->save();
        return back()->with('success', 'Estado del mensaje actualizado.');
    }

    public function destroyContacto(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return back()->with('success', 'Mensaje eliminado.');
    }
}
