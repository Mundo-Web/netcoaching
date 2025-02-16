<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CoachController extends BasicController
{
    public $reactView = 'Admin/Coaches';
    public $model = User::class;
    public $reactRootView = 'admin';

    public function setReactViewProperties(Request $request)
    {
        return [];
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
}
