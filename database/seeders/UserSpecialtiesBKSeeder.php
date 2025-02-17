<?php

namespace Database\Seeders;

use App\Models\SpecialtiesByUser;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\JSON;

class UserSpecialtiesBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userSpecialtiesBK = JSON::parse(Storage::get('seeds/user_specialties.json'));

        foreach ($userSpecialtiesBK as $us) {
            $userJpa = User::where('email', $us['coach_email'])->first();
            $specialtyJpa = Specialty::where('name', $us['especialidad'])->first();

            SpecialtiesByUser::updateOrCreate([
                'user_id' => $userJpa->id,
                'specialty_id' => $specialtyJpa->id,
                'status' => true
            ]);
        }
    }
}
