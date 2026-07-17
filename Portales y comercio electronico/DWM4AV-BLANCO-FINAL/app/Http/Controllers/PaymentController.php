<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function success(Request $request)
    {
        $orderId = $request->get('external_reference');

        if ($orderId) {

            $order = Order::find($orderId);

            if ($order) {

                $order->update([
                    'status' => 'paid',
                    'payment_status' => 'approved',
                    'payment_id' => $request->get('payment_id'),
                    'paid_at' => Carbon::now(),
                ]);

            }

        }

        return redirect()
            ->route('orders.index')
            ->with('success', 'Pago realizado correctamente.');
    }

    public function pending(Request $request)
    {
        $orderId = $request->get('external_reference');

        if ($orderId) {

            $order = Order::find($orderId);

            if ($order) {

                $order->update([
                    'status' => 'pending',
                    'payment_status' => 'pending',
                ]);

            }

        }

        return redirect()
            ->route('orders.index')
            ->with('warning', 'El pago quedó pendiente.');
    }

    public function failure(Request $request)
    {
        $orderId = $request->get('external_reference');

        if ($orderId) {

            $order = Order::find($orderId);

            if ($order) {

                $order->update([
                    'status' => 'failed',
                    'payment_status' => 'rejected',
                ]);

            }

        }

        return redirect()
            ->route('cart.index')
            ->with('error', 'El pago fue cancelado.');
    }
}
