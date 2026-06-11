<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->time('hora')->nullable()->after('fecha');
            $table->unique(['user_id','servicio_id','fecha','hora'], 'reserva_unique_user_servicio_fecha_hora');
        });
    }

    public function down(): void
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->dropUnique('reserva_unique_user_servicio_fecha_hora');
            $table->dropColumn('hora');
        });
    }
};
