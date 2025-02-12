<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;

class PaymentController extends BasicController
{
    public $model = Payment::class;
    public $reactView = 'Coachee/Payments';
    public $prefix4Filter = 'payments';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['agreement', 'coach'])
            ->where('coachee_id', Auth::user()->id);
    }
}
