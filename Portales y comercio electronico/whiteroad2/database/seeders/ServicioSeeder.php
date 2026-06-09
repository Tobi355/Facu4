<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        $servicios = [

            [
                'nombre'=>'Cambio de Aceite',
                'precio'=>20000,
                'descripcion'=>'Cambio completo de aceite.',
                'duracion'=>'30 minutos',
                'condiciones'=>'Aceite no incluido.',
                'imagen'=>'1.webp',
                'activo'=>true,
                'destacado'=>true,
                'categoria_id'=>1
            ],

            [
                'nombre'=>'Cambio de Aceite + Filtro',
                'precio'=>30000,
                'descripcion'=>'Cambio de aceite y filtro.',
                'duracion'=>'45 minutos',
                'condiciones'=>'Filtro incluido.',
                'imagen'=>'2.webp',
                'activo'=>true,
                'destacado'=>true,
                'categoria_id'=>1
            ],

            [
                'nombre'=>'Cambio de Filtro de Aire',
                'precio'=>20000,
                'descripcion'=>'Reemplazo del filtro de aire.',
                'duracion'=>'30 minutos',
                'condiciones'=>'',
                'imagen'=>'3.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>1
            ],

            [
                'nombre'=>'Cambio de Cadena',
                'precio'=>30000,
                'descripcion'=>'Reemplazo de cadena.',
                'duracion'=>'45 minutos',
                'condiciones'=>'',
                'imagen'=>'4.webp',
                'activo'=>true,
                'destacado'=>true,
                'categoria_id'=>2
            ],

            [
                'nombre'=>'Cambio de Transmisión',
                'precio'=>80000,
                'descripcion'=>'Cambio completo de transmisión.',
                'duracion'=>'2 horas',
                'condiciones'=>'',
                'imagen'=>'5.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>2
            ],

            [
                'nombre'=>'Tensado y Lubricación de Cadena',
                'precio'=>28000,
                'descripcion'=>'Ajuste y lubricación.',
                'duracion'=>'40 minutos',
                'condiciones'=>'',
                'imagen'=>'6.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>2
            ],

            [
                'nombre'=>'Cambio de Pastillas de Freno',
                'precio'=>30000,
                'descripcion'=>'Cambio de pastillas.',
                'duracion'=>'45 minutos',
                'condiciones'=>'Precio por rueda.',
                'imagen'=>'7.webp',
                'activo'=>true,
                'destacado'=>true,
                'categoria_id'=>3
            ],

            [
                'nombre'=>'Cambio de Líquido de Freno',
                'precio'=>40000,
                'descripcion'=>'Purgado completo.',
                'duracion'=>'1 hora',
                'condiciones'=>'',
                'imagen'=>'8.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>3
            ],

            [
                'nombre'=>'Cambio de Disco Delantero',
                'precio'=>60000,
                'descripcion'=>'Reemplazo del disco delantero.',
                'duracion'=>'90 minutos',
                'condiciones'=>'',
                'imagen'=>'9.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>3
            ],

            [
                'nombre'=>'Regulación de Válvulas',
                'precio'=>20000,
                'descripcion'=>'Regulación de válvulas.',
                'duracion'=>'30 minutos',
                'condiciones'=>'',
                'imagen'=>'10.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>4
            ],

            [
                'nombre'=>'Medio Motor',
                'precio'=>320000,
                'descripcion'=>'Reparación de medio motor.',
                'duracion'=>'8 horas',
                'condiciones'=>'',
                'imagen'=>'11.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>4
            ],

            [
                'nombre'=>'Motor Completo',
                'precio'=>840000,
                'descripcion'=>'Reparación completa.',
                'duracion'=>'21 horas',
                'condiciones'=>'',
                'imagen'=>'12.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>4
            ],

            [
                'nombre'=>'Diagnóstico Eléctrico',
                'precio'=>60000,
                'descripcion'=>'Escaneo del sistema.',
                'duracion'=>'90 minutos',
                'condiciones'=>'',
                'imagen'=>'13.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>5
            ],

            [
                'nombre'=>'Cambio de Batería',
                'precio'=>40000,
                'descripcion'=>'Cambio de batería.',
                'duracion'=>'1 hora',
                'condiciones'=>'Batería no incluida.',
                'imagen'=>'14.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>5
            ],

            [
                'nombre'=>'Cambio de Bujía',
                'precio'=>20000,
                'descripcion'=>'Cambio de bujía.',
                'duracion'=>'30 minutos',
                'condiciones'=>'',
                'imagen'=>'15.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>5
            ],

            [
                'nombre'=>'Lavado Simple',
                'precio'=>40000,
                'descripcion'=>'Lavado exterior.',
                'duracion'=>'1 hora',
                'condiciones'=>'',
                'imagen'=>'16.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>6
            ],

            [
                'nombre'=>'Lavado Premium',
                'precio'=>80000,
                'descripcion'=>'Lavado premium completo.',
                'duracion'=>'2 horas',
                'condiciones'=>'',
                'imagen'=>'17.webp',
                'activo'=>true,
                'destacado'=>false,
                'categoria_id'=>6
            ],

            [
                'nombre'=>'Limpieza de Inyectores',
                'precio'=>80000,
                'descripcion'=>'Limpieza de inyectores.',
                'duracion'=>'2 horas',
                'condiciones'=>'',
                'imagen'=>'18.webp',
                'activo'=>true,
                'categoria_id'=>6
            ]

        ];
        foreach($servicios as $servicio){
            Servicio::create($servicio);
        }
    }
}
