<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            // Orden
            $table->foreignId('order_id')
                ->constrained()
                ->onDelete('cascade');

            // Servicio comprado
            $table->foreignId('servicio_id')
                ->constrained()
                ->onDelete('cascade');

            // Cantidad
            $table->integer('quantity')->default(1);

            // Precio al momento de comprar
            $table->decimal('price', 10, 2);

            // Subtotal
            $table->decimal('subtotal', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
