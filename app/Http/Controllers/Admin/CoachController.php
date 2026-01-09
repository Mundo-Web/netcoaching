<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;

class CoachController extends BasicController
{
    public $reactView = 'Admin/Coaches';
    public $model = User::class;
    public $reactRootView = 'admin';

    public function setReactViewProperties(Request $request)
    {
        $countries = JSON::parse(File::get('../storage/app/utils/countries.json'));
        return [
            'countries' => $countries,
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::select([
            'users.*'
        ])
            ->with(['specialties'])
            ->withCount(['resources'])
            ->join('model_has_roles AS mhr', 'mhr.model_id', 'users.id')
            ->where('mhr.role_id', 2);
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        if ($body['video'] && Text::startsWith($body['video'], 'https://')) {
            $body['video'] = Text::getYTVideoId($body['video']);
        }
        return $body;
    }
}
