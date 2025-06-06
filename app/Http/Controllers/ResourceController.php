<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Faq;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use SoDe\Extend\Text;

class ResourceController extends BasicController
{
    public $model = Resource::class;
    public $reactView = 'Resources';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $specialties = Resource::select([
            'specialties.id',
            'specialties.name'
        ])
            ->join('specialties', 'resources.specialty_id', '=', 'specialties.id')
            ->where('status', true)
            ->distinct()
            ->get();

        $monthsAndYears = Resource::select(
            DB::raw('YEAR(created_at) as year, MONTH(created_at) as month')
        )
            ->distinct()
            ->where('status', true)
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        $monthsNames = [
            1 => 'Enero',
            2 => 'Febrero',
            3 => 'Marzo',
            4 => 'Abril',
            5 => 'Mayo',
            6 => 'Junio',
            7 => 'Julio',
            8 => 'Agosto',
            9 => 'Septiembre',
            10 => 'Octubre',
            11 => 'Noviembre',
            12 => 'Diciembre'
        ];

        $formattedResults = $monthsAndYears->map(function ($item) use ($monthsNames) {
            return [
                'year' => $item->year,
                'month' => $monthsNames[$item->month],
                'full' => Text::fillStart($item->month, '0', 2) . '-' . Text::fillStart($item->year, '0', 4)
            ];
        });
        return [
            'specialties' => $specialties,
            'archive' => $formattedResults
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['specialty'])
            ->where('status', true);
    }

    public function get(Request $request, string $resourceId)
    {
        $resource = Resource::with(['specialty'])->find($resourceId);

        $summaryJpa = Aboutus::where('name', 'Resúmen')->first();

        $faqs = Faq::where('visible', true)->where('visible', true)->get();

        return Inertia::render('ResourceDetails', [
            'session' => Auth::user(),
            'summary' => $summaryJpa->description,
            'faqs' => $faqs,
            'global' => [
                'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
                'APP_NAME' => env('APP_NAME'),
                'APP_URL' => env('APP_URL'),
                'APP_DOMAIN' => env('APP_DOMAIN'),
                'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
            ],
            'resource' => $resource
        ])->rootView($this->reactRootView);
    }
}
