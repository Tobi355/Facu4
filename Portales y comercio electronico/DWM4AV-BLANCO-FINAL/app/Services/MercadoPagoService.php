<?php

namespace App\Services;

use App\Models\Order;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoService
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(
            config('mercadopago.access_token')
        );

        MercadoPagoConfig::setRuntimeEnviroment(
            MercadoPagoConfig::LOCAL
        );
    }

    public function createPreference(Order $order)
    {
        $client = new PreferenceClient();

        $items = [];

        foreach ($order->items as $item) {

            $items[] = [

                "title" => $item->servicio->nombre,

                "quantity" => (int) $item->quantity,

                "currency_id" => "ARS",

                "unit_price" => (float) $item->price,

            ];

        }

        try {

    return $client->create([

        "items" => $items,

        "external_reference" => (string) $order->id,

        "back_urls" => [
            "success" => route("payment.success"),
            "failure" => route("payment.failure"),
            "pending" => route("payment.pending"),
        ],

    ]);

} catch (\MercadoPago\Exceptions\MPApiException $e) {

    dd(
        $e->getApiResponse()->getStatusCode(),
        $e->getApiResponse()->getContent()
    );

}
    }
}
