<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ScheduleController extends BasicController
{
    public $model = Schedule::class;
    public $reactView = 'Coachee/Schedules';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['agreement'])
            ->withCount([
                'notes' => function ($query) {
                    $query->where(function ($query) {
                        $query
                            ->where('notes.user_id', DB::raw('`schedules`.`coach_id`'))
                            ->orWhere('notes.user_id', DB::raw('`schedules`.`coachee_id`'));
                    });
                }
            ])
            ->where('coachee_id', Auth::user()->id);
    }
}
