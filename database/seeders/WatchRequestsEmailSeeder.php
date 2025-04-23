<?php

namespace Database\Seeders;

use App\Models\Constant;
use Illuminate\Database\Seeder;
use SoDe\Extend\File;

class WatchRequestsEmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Constant::updateOrCreate([
            'correlative' => 'watch-requests',
        ], [
            'name' => 'Recupera tu contraseña',
            'value' => File::get('storage/app/utils/watch-requests.html'),
            'type' => 'html'
        ]);
    }
}
