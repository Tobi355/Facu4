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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Usuario que realizó la compra
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Total de la orden
            $table->decimal('total', 10, 2);

            // Estado de la orden
            $table->enum('status', [
                'pending',
                'paid',
                'completed',
                'cancelled',
                'failed'
            ])->default('pending');

            // Datos de Mercado Pago
            $table->string('payment_id')->nullable();
            $table->string('preference_id')->nullable();

            // Estado devuelto por Mercado Pago
            $table->enum('payment_status', [
                'approved',
                'pending',
                'rejected'
            ])->nullable();

            // Fecha del pago
            $table->timestamp('paid_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
