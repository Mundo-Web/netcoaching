<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\SpecialtiesByUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class CoachController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Coaches';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $specialties = SpecialtiesByUser::select([
            DB::raw('DISTINCT(specialties.id)'),
            'specialties.id',
            'specialties.name'
        ])
            ->join('specialties', 'specialties.id', 'specialties_by_users.specialty_id')
            ->where('status', true)
            ->get();

        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));

        $events = Event::lastFour();

        return [
            'specialties' => $specialties,
            'countries' => $countries,
            'events' => $events
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $this->model::select([
            'users.*'
        ])
            ->with(['specialties'])
            ->distinct()
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->leftJoin('specialties_by_users AS sbu', 'sbu.user_id', 'users.id')        // cambiar a solo join
            ->leftJoin('specialties AS specialty', 'specialty.id', 'sbu.specialty_id')  // cambiar a solo join
            ->where('mhr.role_id', 2)
            ->where('users.status', true);
    }
}
