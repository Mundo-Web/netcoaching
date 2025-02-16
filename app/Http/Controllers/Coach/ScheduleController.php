<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ScheduleController extends BasicController
{
    public $model = Schedule::class;
    public $reactView = 'Coach/Schedules';

    public function setPaginationInstance(string $model)
    {
        return $model::with([
            'agreement',
            'report:id,schedule_id',
            'logbook:id,schedule_id',
        ])
            ->withCount([
                'notes' => function ($query) {
                    $query->where(function ($query) {
                        $query
                            ->where('notes.user_id', DB::raw('`schedules`.`coach_id`'))
                            ->orWhere('notes.user_id', DB::raw('`schedules`.`coachee_id`'));
                    });
                }
            ])
            ->where('coach_id', Auth::user()->id);
    }
}
