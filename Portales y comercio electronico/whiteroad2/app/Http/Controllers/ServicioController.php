<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | ÁREA PÚBLICA
    |--------------------------------------------------------------------------
    */

    public function publicIndex()
    {
        $categorias = Categoria::orderBy('nombre')->get();

        $query = request()->query('categoria');

        $serviciosQuery = Servicio::with('categoria')
            ->where('activo', true)
            ->orderBy('nombre');

        if ($query) {
            $serviciosQuery->where('categoria_id', $query);
        }

        $servicios = $serviciosQuery->get();

        return view('servicios.index', compact(
            'categorias',
            'servicios',
            'query'
        ));
    }

    public function home()
    {
        $servicios = Servicio::with('categoria')
            ->where('activo', true)
            ->where('destacado', true)
            ->orderBy('nombre')
            ->take(6)
            ->get();

        return view('home', compact('servicios'));
    }

    public function show(Servicio $servicio)
    {
        return view('servicios.show', compact('servicio'));
    }

    /*
    |--------------------------------------------------------------------------
    | ÁREA ADMIN
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $servicios = Servicio::with('categoria')->get();

        return view('admin.servicios.index', compact('servicios'));
    }

    public function create()
    {
        $categorias = Categoria::orderBy('nombre')->get();

        return view('admin.servicios.create', compact('categorias'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:100',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'required',
            'duracion' => 'required',
            'condiciones' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|string|max:255',
            'activo' => 'nullable|in:1',
            'destacado' => 'nullable|in:1',
        ]);

        Servicio::create([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
            'duracion' => $request->duracion,
            'condiciones' => $request->condiciones,
            'categoria_id' => $request->categoria_id,
            'imagen' => $request->imagen,
            'activo' => $request->has('activo'),
            'destacado' => $request->has('destacado'),
        ]);

        return redirect()
            ->route('admin.servicios.index')
            ->with('success', 'Servicio creado correctamente.');
    }

    public function edit(Servicio $servicio)
    {
        $categorias = Categoria::orderBy('nombre')->get();

        return view('admin.servicios.edit', compact(
            'servicio',
            'categorias'
        ));
    }

    public function update(Request $request, Servicio $servicio)
    {
        $request->validate([
            'nombre' => 'required|max:100',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'required',
            'duracion' => 'required',
            'condiciones' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id',
            'imagen' => 'nullable|string|max:255',
            'activo' => 'nullable|in:1',
            'destacado' => 'nullable|in:1',
        ]);

        $servicio->update([
            'nombre' => $request->nombre,
            'precio' => $request->precio,
            'descripcion' => $request->descripcion,
            'duracion' => $request->duracion,
            'condiciones' => $request->condiciones,
            'categoria_id' => $request->categoria_id,
            'imagen' => $request->imagen,
            'activo' => $request->has('activo'),
            'destacado' => $request->has('destacado'),
        ]);

        return redirect()
            ->route('admin.servicios.index')
            ->with('success', 'Servicio actualizado correctamente.');
    }

    public function destroy(Servicio $servicio)
    {
        $servicio->delete();

        return back()->with(
            'success',
            'Servicio eliminado correctamente.'
        );
    }
}
