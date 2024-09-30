<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Agreement;
use App\Models\Payment;
use App\Models\Request;
use App\Models\Schedule;
use DateInterval;
use DateTime;
use Exception;
use Illuminate\Http\Request as HttpRequest;
use SoDe\Extend\Math;
use SoDe\Extend\Response;

class AgreementController extends BasicController
{
    public $model = Agreement::class;
    public $reactView = 'Coachee/Agreements';

    public function setPaginationInstance(string $model)
    {
        return $model::with(['coach', 'coachee', 'observations', 'payments']);
    }

    public function afterSave(HttpRequest $request, object $jpa)
    {
        $sessions = $this->generateDates($jpa->start_date, $jpa->session_frequency, $jpa->sessions);
        foreach ($sessions as $key => $session) {
            Schedule::create([
                'agreement_id' => $jpa->id,
                'coach_id' => $jpa->coach_id,
                'coachee_id' => $jpa->coachee_id,
                'name' => 'Sesión ' . ($key + 1),
                'session_date' => $session,
            ]);
        }

        $payments = $this->generateDates($jpa->payment_start_date, $jpa->payment_frequency, $jpa->installments);
        $amount = Math::round($jpa->total_amount / $jpa->installments, 2);
        foreach ($payments as $key => $payment) {
            Payment::create([
                'agreement_id' => $jpa->id,
                'coach_id' => $jpa->coach_id,
                'coachee_id' => $jpa->coachee_id,
                'name' => 'Cuota ' . ($key + 1),
                'amount' => $amount,
                'due_date' => $payment,
            ]);
        }
    }

    private function generateDates($startDate, $frequency, $quantity)
    {
        $dates = [];
        $currentDate = new DateTime($startDate);

        $dates[] = $currentDate->format('Y-m-d');

        switch ($frequency) {
            case 'weekly':
                $interval = 'P1W';
                break;
            case 'biweekly':
                $interval = 'P2W';
                break;
            case 'monthly':
                $interval = 'P1M';
                break;
            default:
                throw new Exception('Frecuencia no válida');
        }
        $dateInterval = new DateInterval($interval);
        for ($i = 1; $i < $quantity; $i++) {
            $currentDate->add($dateInterval);
            $dates[] = $currentDate->format('Y-m-d');
        }
        return $dates;
    }
}
