<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        return view('checkout.index', compact('cart'));
    }

    public function store()
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $total = $this->calcularTotal($cart);

        $order = DB::transaction(function () use ($cart, $total) {

            $order = Order::create([
                'user_id' => Auth::id(),
                'total' => $total,
                'status' => 'pending',
            ]);

            $this->crearItems($order, $cart);

            return $order;
        });

        session()->forget('cart');

        return redirect()
            ->route('home')
            ->with('success', 'Orden creada correctamente.');
    }

    private function calcularTotal(array $cart): float
    {
        return collect($cart)->sum(function ($item) {
            return $item['precio'] * $item['quantity'];
        });
    }
    private function crearItems(Order $order, array $cart): void
    {
        foreach ($cart as $item) {

            OrderItem::create([
                'order_id'    => $order->id,
                'servicio_id' => $item['id'],
                'quantity'    => $item['quantity'],
                'price'       => $item['precio'],
                'subtotal'    => $item['precio'] * $item['quantity'],
            ]);

        }
    }
}
