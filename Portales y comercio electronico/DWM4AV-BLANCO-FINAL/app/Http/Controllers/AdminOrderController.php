<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')
            ->latest()
            ->paginate(15);

        return view('admin.orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load('items.servicio', 'user');

        return view('admin.orders.show', compact('order'));
    }

    public function markAsPaid(Order $order)
    {
        $order->update([
            'status' => 'paid',
            'payment_status' => 'approved',
            'paid_at' => now(),
        ]);

        return back()->with('success', 'La orden fue marcada como pagada.');
    }

    public function markAsCompleted(Order $order)
    {
        $order->update([
            'status' => 'completed',
        ]);

        return back()->with('success', 'La orden fue marcada como terminada.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'La orden fue eliminada correctamente.');
    }
}
