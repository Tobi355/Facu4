<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function showAdminLogin()
    {
        return view('auth.admin-login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $adminLogin = $request->boolean('admin_login');

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            $user = Auth::user();

            if ($adminLogin && $user->role !== 'admin') {
                Auth::logout();
                return back()->withErrors(['email' => 'Estas credenciales son solo para administrador.'])->onlyInput('email');
            }

            if (!$adminLogin && $user->role === 'admin') {
                Auth::logout();
                return back()->withErrors(['email' => 'Las credenciales de administrador no se pueden usar en el login de usuario.'])->onlyInput('email');
            }

            if ($adminLogin) {
                return redirect()->intended('/admin');
            }

            return redirect()->intended('/perfil');
        }

        return back()->withErrors(['email' => 'Credenciales incorrectas.'])->onlyInput('email');
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
            'telefono' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',
            'telefono' => $data['telefono'] ?? null,
        ]);

        Auth::login($user);

        return redirect('/perfil')->with('success', 'Registro exitoso.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
