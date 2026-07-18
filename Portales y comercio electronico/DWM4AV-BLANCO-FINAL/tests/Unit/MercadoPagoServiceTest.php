<?php

namespace Tests\Unit;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Servicio;
use App\Services\MercadoPagoService;
use Tests\TestCase;

class MercadoPagoServiceTest extends TestCase
{
    public function test_it_builds_a_preference_payload_with_order_data(): void
    {
        $servicio = new Servicio([
            'id' => 7,
            'nombre' => 'Limpieza premium',
            'precio' => 2500,
        ]);

        $order = new Order([
            'total' => 5000,
        ]);
        $order->setAttribute('id', 42);

        $item = new OrderItem([
            'servicio_id' => 7,
            'quantity' => 2,
            'price' => 2500,
            'subtotal' => 5000,
        ]);

        $item->setRelation('servicio', $servicio);
        $order->setRelation('items', collect([$item]));

        $service = new MercadoPagoService();
        $payload = $service->buildPreferencePayload($order);

        $this->assertSame('WhiteRoad - Orden #42', $payload['metadata']['order_title']);
        $this->assertCount(1, $payload['items']);
        $this->assertSame('Limpieza premium', $payload['items'][0]['title']);
        $this->assertSame(2, $payload['items'][0]['quantity']);
        $this->assertSame(2500.0, $payload['items'][0]['unit_price']);
        $this->assertArrayHasKey('back_urls', $payload);
    }
}
