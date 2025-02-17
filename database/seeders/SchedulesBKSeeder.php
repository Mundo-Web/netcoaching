<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\JSON;

class SchedulesBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedulesBK = JSON::parse(Storage::get('seeds/schedules.json'));

        foreach ($schedulesBK as $scheduleBK) {
            $agreement_hash = md5('agreement_' . $scheduleBK['idcontrato']);
            $agreement_uuid = sprintf(
                '%s-%s-%s-%s-%s',
                substr($agreement_hash, 0, 8),
                substr($agreement_hash, 8, 4),
                substr($agreement_hash, 12, 4),
                substr($agreement_hash, 16, 4),
                substr($agreement_hash, 20, 12)
            );

            $coachJpa = User::where('email', $scheduleBK['coach_email'])->first() ?? null;
            $coacheeJpa = User::where('email', $scheduleBK['coachee_email'])->first() ?? null;

            $scheduleJpa = Schedule::updateOrCreate([
                'id' => $scheduleBK['id'],
            ], [
                'agreement_id' => $agreement_uuid,
                'coach_id' => $coachJpa->id,
                'coachee_id' => $coacheeJpa->id,
                'name' => $scheduleBK['titulo'],
                'session_date' => $scheduleBK['created_at'],
                'completed' => $scheduleBK['estado_sesion'] != 'pendiente'
            ]);
        }
    }
}
