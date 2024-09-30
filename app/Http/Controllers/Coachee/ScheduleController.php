<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends BasicController
{
    public $model = Schedule::class;
    public $reactView = 'Coachee/Schedules';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['agreement']);
    }
}
