<?php

namespace App\Http\Controllers;

use App\Models\Servicio;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);

        return view('cart.index', compact('cart'));
    }

    public function add(Servicio $servicio)
    {
        $cart = session()->get('cart', []);

        if(isset($cart[$servicio->id])){

            $cart[$servicio->id]['quantity']++;

        }else{

            $cart[$servicio->id] = [

                'id' => $servicio->id,
                'nombre' => $servicio->nombre,
                'precio' => $servicio->precio,
                'imagen' => $servicio->imagen,
                'quantity' => 1

            ];

        }

        session()->put('cart', $cart);

        return redirect()
            ->route('checkout.index')
            ->with('success','Servicio agregado al carrito.');
    }

    public function remove(int $id)
    {
        $cart = session()->get('cart', []);

        unset($cart[$id]);

        session()->put('cart', $cart);

        return back()->with('success','Servicio eliminado.');
    }

    public function clear()
    {
        session()->forget('cart');

        return back()->with('success','Carrito vaciado.');
    }
}
