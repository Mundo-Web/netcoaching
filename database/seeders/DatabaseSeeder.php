<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UsersSeeder::class,
            ServiceSeeder::class,
            ConstantSeeder::class,
            SpecialtySeeder::class,
            BenefitSeeder::class,
            SliderSeeder::class,
            AboutusSeeder::class,
            IndicatorSeeder::class,
            TestimonySeeder::class,
            EventSeeder::class,
            FaqSeeder::class,
            RecoveryEmailSeeder::class,
        ]);
    }
}
