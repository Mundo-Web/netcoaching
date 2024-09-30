<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Models\Agreement;
use App\Models\Observation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ObservationController extends BasicController
{
    public $model = Observation::class;

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['observer_id'] = Auth::user()->id;
        return $body;
    }

    public function afterSave(Request $request, object $jpa)
    {
        Agreement::where('id', $jpa->agreement_id)->update([
            'status' => false
        ]);
    }
}
