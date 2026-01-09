<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Request;
use App\Models\User;
use Illuminate\Http\Request as HttpRequest;

class RequestController extends BasicController
{
    public $model = Request::class;
    public $reactView = 'Admin/Requests.jsx';

    public function setReactViewProperties(HttpRequest $request)
    {
        $coachUuid = $request->query('coach');
        $coachId = User::where('uuid', $coachUuid)->first();

        return [
            'coachId' => $coachId->id ?? null
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coach', 'coachee'])
            ->join('users as coach', 'requests.coach_id', '=', 'coach.id')
            ->join('users as coachee', 'requests.coachee_id', '=', 'coachee.id');
    }
}
