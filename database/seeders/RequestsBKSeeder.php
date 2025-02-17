<?php

namespace Database\Seeders;

use App\Models\Request;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\JSON;

class RequestsBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $requestsBK = JSON::parse(Storage::get('seeds/requests.json'));
        foreach ($requestsBK as $key => $requestBK) {
            // Convert numeric ID to consistent UUID format
            $hash = md5('request_' . $requestBK['id']);
            $uuid = sprintf(
                '%s-%s-%s-%s-%s',
                substr($hash, 0, 8),
                substr($hash, 8, 4),
                substr($hash, 12, 4),
                substr($hash, 16, 4),
                substr($hash, 20, 12)
            );

            $coachJpa = User::where('email', $requestBK['coach_email'])->first() ?? null;
            $coacheeJpa = User::where('email', $requestBK['coachee_email'])->first() ?? null;

            if (!$coachJpa || !$coacheeJpa) {
                dump('Not found coach or coachee: ' . JSON::stringify($requestBK, true));
                continue;
            }

            Request::updateOrCreate([
                'id' => $uuid
            ], [
                'coach_id' => $coachJpa->id,
                'coachee_id' => $coacheeJpa->id,
                'status' => $requestBK['estado'] == 'atendido' ? true : ($requestBK == 'pendiente' ? false : null),
                'status_message' => (in_array($requestBK['estado'], ['atendido', 'pendiente']) ? null : ucfirst(str_replace('_', ' ', $requestBK['estado']))) ?? 'Otro: Sin mensaje',
                'created_at' => $requestBK['created_at'],
                'updated_at' => $requestBK['updated_at']
            ]);
        }
    }
}
