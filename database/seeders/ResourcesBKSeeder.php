<?php

namespace Database\Seeders;

use App\Models\Resource;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\JSON;

class ResourcesBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $resourcesBK = JSON::parse(Storage::get('seeds/resources.json'));
        foreach ($resourcesBK as $key => $resourceBK) {
            // Convert numeric ID to consistent UUID format
            $hash = md5('resource_' . $resourceBK['id']);
            $uuid = sprintf(
                '%s-%s-%s-%s-%s',
                substr($hash, 0, 8),
                substr($hash, 8, 4),
                substr($hash, 12, 4),
                substr($hash, 16, 4),
                substr($hash, 20, 12)
            );

            $coachJpa = User::where('email', $resourceBK['email'])->first() ?? null;

            if (!$coachJpa) {
                dump('Not found coach or coachee: ' . JSON::stringify($resourceBK, true));
                continue;
            }

            $specialtyJpa = Specialty::where('name', $resourceBK['nombre_especialidad'])->first()?? null;

            if (!$specialtyJpa) {
                dump('Not found specialty: '. JSON::stringify($resourceBK, true));
                continue;
            }

            Resource::updateOrCreate([
                'id' => $uuid
            ], [
                'owner_id' => $coachJpa->id,
                'name'=> $resourceBK['titulo'],
                'description'=> $resourceBK['descripcion'],
                'specialty_id'=> $specialtyJpa->id,
                'tags' => '',
                'social_media'=> $resourceBK['rrss'] ?? 'youtube',
                'media_id' => $resourceBK['video'] ?? '' ,
                'status' => $resourceBK['estado']
            ]);
        }
    }
}
