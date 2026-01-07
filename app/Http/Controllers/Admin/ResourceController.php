<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Resource;
use App\Models\Specialty;
use Illuminate\Http\Request;
use SoDe\Extend\Text;

class ResourceController extends BasicController
{
    public $model = Resource::class;
    public $reactView = 'Admin/Resources';

    public function setReactViewProperties(Request $request)
    {
        $specialties = Specialty::all();
        return [
            'specialties' => $specialties
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::with(['specialty', 'owner']);
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        if ($body['social_media'] == 'youtube') {
            $body['media_id'] = Text::getYTVideoId($body['media_id']);
        }
        if ($request->hasFile('media_id')) {
            $file = $request->file('media_id');
            $name = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('images', $name, 'local');
            $body['media_id'] = $name;
        }
        return $body;
    }
}
