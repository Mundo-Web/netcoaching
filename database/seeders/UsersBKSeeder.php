<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;

class UsersBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usersBK = JSON::parse(Storage::get('seeds/users.json'));

        foreach ($usersBK as $userBK) {
            $userJpa = User::updateOrCreate([
                'email' => $userBK['email']
            ], [
                'name' => $userBK['nombre'],
                'lastname' => $userBK['apellido'] ?? '-',
                'password' => $userBK['password'],
                'dni' => $userBK['dni'],
                'phone' => Text::keep($userBK['celular'] ?? '', '0123456789'),
                'video' => $userBK['video'],
                'title' => $userBK['titulo'],
                'country' => $userBK['pais'],
                'city' => $userBK['ciudad'],
                'address' => $userBK['direccion'],
                'summary' => $userBK['resumen'],
                'description' => $userBK['descripcion'],
                'status' => $userBK['estado'],
            ]);

            switch ($userBK['role']) {
                case 'admin':
                    $userJpa->assignRole('Admin');
                    break;
                case 'coach':
                    $userJpa->assignRole('Coach');
                    break;
                case 'mentor':
                    $userJpa->assignRole('Coach');
                    break;
                case 'coachee':
                    $userJpa->assignRole('Coachee');
                    break;
                default:
                    break;
            }

            if (!$userBK['foto']) continue;

            $profile = storage_path('app/profile/' . $userBK['foto']);
            $newProfile = storage_path('app/profile/' . $userJpa->uuid) . '.img';
            if (file_exists($profile)) {
                try {
                    rename($profile, $newProfile);
                } catch (\Throwable $th) {
                    dump('Error en ' . $userBK['foto'] . ': ' . $th->getMessage());
                }
            };
        }

        $images = File::scan(storage_path('app/profile'), ['type' => 'file']);
        foreach ($images as $image) {
            $imagePath = storage_path('app/profile/') . $image;
            if (uuid_is_valid(str_replace('.img', '', $image))) continue;
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
    }
}
