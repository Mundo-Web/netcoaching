<?php

namespace Database\Seeders;

use App\Models\Constant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use SoDe\Extend\File;

class RecoveryEmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Constant::updateOrCreate([
            'correlative' => 'recovery-email',
        ], [
            'name' => 'Recupera tu contraseña',
            'value' => File::get('storage/app/utils/recovery-email.html'),
            'type' => 'html'
        ]);
    }
}
