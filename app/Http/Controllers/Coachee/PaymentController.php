<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Models\Payment;

class PaymentController extends BasicController
{
    public $model = Payment::class;
    public $reactView = 'Coachee/Payments';
}
