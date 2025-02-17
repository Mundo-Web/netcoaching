<?php

namespace App\Http\Controllers\Coachee;

use App\Http\Controllers\BasicController;
use App\Models\Payment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Math;
use Culqi\Culqi;
use SoDe\Extend\JSON;
use SoDe\Extend\Trace;

class PaymentController extends BasicController
{
    private $culqi = null;
    private $url = null;

    public $model = Payment::class;
    public $reactView = 'Coachee/Payments';
    public $prefix4Filter = 'payments';

    public function __construct()
    {
        $this->culqi = new Culqi(['api_key' => env('CULQI_PRIVATE_KEY')]);
        $this->url = env('CULQI_API', 'https://api.culqi.com/v2');
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $userJpa = Auth::user();

        $paymentJpa = Payment::find($request->payment_id);

        if (!$paymentJpa) throw new Exception('La cuota que intentas pagar, no existe');
        if ($paymentJpa->status) throw new Exception('La cuota que intentas pagar, ya fue pagada');

        $config = [
            "amount" => Math::ceil(($paymentJpa->amount * 100)),
            "capture" => true,
            "currency_code" => "PEN",
            "description" => $paymentJpa->name . " " . env('APP_NAME'),
            "email" => $request->email ?? $userJpa->email,
            "installments" => 0,
            "antifraud_details" => [
                "address" => $userJpa->address ?? 'Av. Aramburu Nro. 166 Int. 4b',
                "address_city" => $userJpa->city ?? 'San Isidro',
                "country_code" => "PE",
                "first_name" => $userJpa->name,
                "last_name" => $userJpa->lastname,
                "phone_number" => $userJpa->phone ?? '51948681429',
            ],
            "source_id" => $request->token
        ];

        $charge = $this->culqi->Charges->create($config);

        if (gettype($charge) == 'string') {
            $res = JSON::parse((string) $charge);
            $paymentJpa->status = null;
            $paymentJpa->status_message = $res['merchant_message'] . ' ' . $res['user_message'];
            $paymentJpa->save();
            throw new Exception($res['user_message']);
        }
        return [
            'id' => $paymentJpa->id,
            'status' => true,
            'status_message' => 'El pago se ha procesado correctamente',
            'payment_code' => $charge->id,
            'payment_date' => Trace::getDate('mysql')
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['agreement', 'coach'])
            ->where('coachee_id', Auth::user()->id);
    }
}
