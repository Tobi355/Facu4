<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Services\MercadoPagoService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    private MercadoPagoService $mercadoPago;

    public function __construct(MercadoPagoService $mercadoPago)
    {
        $this->mercadoPago = $mercadoPago;
    }

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

        $order = DB::transaction(function () use ($cart) {

            $total = collect($cart)->sum(function ($item) {
                return $item['precio'] * $item['quantity'];
            });

            $order = Order::create([
                'user_id' => Auth::id(),
                'total' => $total,
                'status' => 'pending'
            ]);

            foreach ($cart as $item) {

                OrderItem::create([
                    'order_id' => $order->id,
                    'servicio_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['precio'],
                    'subtotal' => $item['precio'] * $item['quantity']
                ]);

            }

            return $order;

        });

        $order->load('items.servicio');

        $preference = $this->mercadoPago->createPreference($order);

        $order->update([
            'preference_id' => $preference->id
        ]);

        session()->forget('cart');

        return redirect($preference->init_point);
    }
}
