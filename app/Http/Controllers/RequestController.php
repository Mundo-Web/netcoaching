<?php

namespace App\Http\Controllers;

use App\Http\Classes\EmailConfig;
use App\Models\Constant;
use App\Models\Request;
use App\Models\User;
use Exception;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Text;

class RequestController extends BasicController
{
    public $model = Request::class;

    public function beforeSave(HttpRequest $request)
    {
        $coach_id = $request->coach_id;
        $coachee_id = Auth::user()->id;

        $data = [
            'coach_id' => $coach_id,
            'coachee_id' => $coachee_id
        ];

        $requestJpa = Request::select()
            ->where('coach_id', $coach_id)
            ->where('coachee_id', $coachee_id)
            ->first();

        if ($requestJpa && $requestJpa->status === 0) {
            throw new Exception('Ya tienes una solicitud pendiente');
        }

        return $data;
    }

    public function afterSave(HttpRequest $request, $requestJpa)
    {
        try {
            $userJpa = User::find($requestJpa->coach_id);
            $content = Text::replaceData(Constant::value('watch-requests'), [
                'APP_DOMAIN' => env('APP_DOMAIN'),
                'APP_NAME' => env('APP_NAME'),
            ]);

            $mailer = EmailConfig::config();
            $mailer->Subject = 'Tienes Solicitudes pendientes - ' . env('APP_NAME');
            $mailer->Body = $content;
            $mailer->addAddress($userJpa->email);
            $mailer->isHTML(true);
            $mailer->send();
        } catch (\Throwable $th) {
            dump($th->getMessage());
        }
    }
}
