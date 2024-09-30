<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Agreement;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;
use SoDe\Extend\Response;

class AgreementController extends BasicController
{
    public $model = Agreement::class;

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coach', 'coachee', 'observations', 'observations.observer']);
    }

    public function beforeSave(HttpRequest $request)
    {
        $body = $request->all();

        $requestJpa = Request::find($request->request_id);
        $body['coach_id'] = $requestJpa->coach_id;
        $body['coachee_id'] = $requestJpa->coachee_id;

        $agreement = Agreement::find($request->id);
        if (!$agreement) {
            $last = Agreement::orderBy('contract_number', 'desc')->first();
            $body['contract_number'] = 1;
            if ($last) {
                $body['contract_number'] = $last->contract_number + 1;
            }
        } else {
            $body['status'] = null;
        }

        return $body;
    }

    public function afterSave(HttpRequest $request, object $jpa)
    {
        Request::where('id', $jpa->request_id)->update([
            'status' => true
        ]);
    }

    public function lastCode(HttpRequest $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $last = Agreement::orderBy('contract_number', 'desc')->first();
            $correlative = 1;
            if ($last) {
                $correlative = $last->contract_number + 1;
            }
            return $correlative;
        });
        return response($response->toArray(), $response->status);
    }
}
