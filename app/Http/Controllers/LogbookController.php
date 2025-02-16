<?php

namespace App\Http\Controllers;

use App\Models\Logbook;
use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogbookController extends BasicController
{
    public $model = Logbook::class;

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $scheduleJpa = Schedule::select(['id', 'agreement_id'])
            ->where('id', $request->schedule_id)
            ->where(function ($query) {
                return $query
                    ->where('coach_id', Auth::user()->id)
                    ->orWhere('coachee_id', Auth::user()->id);
            })
            ->first();

        if (!$scheduleJpa) throw new Exception('No existe un acuerdo para esta bitacora');

        $reportJpa = Logbook::select('id')
            ->where('schedule_id', $scheduleJpa->id)
            ->first();

        if ($reportJpa) $body['id'] = $reportJpa->id;

        $body['agreement_id'] = $scheduleJpa->agreement_id;

        return $body;
    }

    public function afterSave(Request $request, object $jpa)
    {
        return $jpa;
    }
}
