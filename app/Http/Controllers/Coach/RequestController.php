<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Models\Agreement;
use App\Models\Request;
use Illuminate\Support\Facades\Auth;

class RequestController extends BasicController
{
    public $model = Request::class;
    public $reactView = 'Coach/Requests.jsx';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coachee'])
            ->where('coach_id', Auth::user()->id);
    }
}
