<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\JSON;

class ReportController extends BasicController
{
    public $model = Report::class;

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $scheduleJpa = Schedule::select(['id', 'agreement_id'])
            ->where('id', $request->schedule_id)
            ->where('coach_id', Auth::user()->id)
            ->first();

        if (!$scheduleJpa) throw new Exception('No existe un acuerdo para este reporte');

        $reportJpa = Report::select('id')
            ->where('schedule_id', $scheduleJpa->id)
            ->first();

        if ($reportJpa) $body['id'] = $reportJpa->id;

        $body['agreement_id'] = $scheduleJpa->agreement_id;

        return $body;
    }

    public function afterSave(Request $request, object $jpa)
    {
        Schedule::where('id', $jpa->schedule_id)->update(['completed' => true]);
        return $jpa;
    }
}
