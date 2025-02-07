<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Response;

class NoteController extends BasicController
{
    public $model = Note::class;
    public $softDeletion = false;

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['user_id'] = Auth::user()->id;

        return $body;
    }

    public function bySchedule(Request $request, string $schedule_id)
    {
        $response = Response::simpleTryCatch(function () use ($schedule_id) {
            $notes = Note::with(['user'])
                ->where('schedule_id', $schedule_id)
                ->orderBy('created_at', 'DESC')
                ->get();
            return $notes;
        });

        return response($response->toArray(), $response->status);
    }
}
