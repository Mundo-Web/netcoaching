<?php

namespace Database\Seeders;

use App\Models\Aboutus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $aboutuses = [
            [
                'name' => 'Somos',
                'description' => 'Somos Trasciende,... Sed commodo turpis et lorem fermentum, pulvinar laoreet arcu condimentum. *Nam pharetra, magna a sollicitudin dictum*, urna felis euismod nulla, sit amet rhoncus sapien enim in lectus. Fusce tristique a nunc vel dapibus. In hac habitasse platea dictumst.',
            ],
            [
                'name' => 'Resúmen',
                'description' => 'NetCoaching te acompaña en cada paso hacia el éxito personal y profesional, ofreciéndote herramientas efectivas para el desarrollo y el crecimiento a través de sesiones personalizadas con expertos.',
            ],
            [
                'name' => 'Historia',
                'description' => 'Las memorias de nuestra CEO y Fundadora narran un viaje de pasión y visión. En 2017, después de completar un programa de formación como coach, nació su deseo de contribuir al bienestar humano, fusionando las nuevas habilidades adquiridas con su experiencia como Ingeniera de Sistemas. A pesar de que continuó trabajando en su especialidad, la intuición llegó en 2019: era hora de comenzar. Convocó a coaches de Latinoamérica y comenzó a explorar sus necesidades y las del mercado. A pesar de los desafíos provocados por la pandemia, en 2020 logró desarrollar la primera versión de la Plataforma. En 2021, con la pandemia generando una creciente necesidad de formación en liderazgo y habilidades blandas en las empresas, fue entonces que nuestra estrategia evolucionó. Concretándose la primera experiencia corporativa, Laive.',
            ],
            [
                'name' => 'Misión',
                'description' => 'Duis aute irure dolor in reprehenderit'
            ],
            [
                'name' => 'Visión',
                'description' => 'Duis aute irure dolor in reprehenderit'
            ]
        ];

        foreach ($aboutuses as $aboutus) {
            Aboutus::updateOrCreate(['name' => $aboutus['name']], [
                'description' => $aboutus['description']
            ]);
        }
    }
}
