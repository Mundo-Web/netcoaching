<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends BasicController
{
    public $model = Payment::class;
    public $reactView = 'Coach/Payments';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['agreement', 'coachee'])
            ->where('coach_id', Auth::id());
    }
}
