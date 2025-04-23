<?php

namespace App\Http\Controllers;

use App\Models\Constant;
use App\Models\SpecialtiesByUser;
use App\Models\Specialty;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use SoDe\Extend\Crypto;
use SoDe\Extend\Fetch;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class GoogleController extends BasicController
{

    public $reactView = 'RegisterGoogle';
    public $reactRootView = 'auth';
    public $model = User::class;

    public function setReactViewProperties(Request $request)
    {
        if (!$request->query('google_id')) throw new Exception('Necesitas enviar un ID de autenticación de Google');

        $userJpa = User::query()
            ->where('google_id', $request->query('google_id'))
            ->first();

        if (!$userJpa) throw new Exception('No se ha encontrado el usuario');

        if ($userJpa->hasAnyRole(['Admin', 'Coach', 'Coachee'])) {
            $error = "El usuario {$userJpa->email} ya se encuentra registrado. Por favor, inicie sesión con su correo y contraseña.";
            throw new Exception($error);
        }

        $roles = Role::where('public', true)->get();
        $specialties = Specialty::all();

        return [
            'session' => $userJpa,
            'roles' => $roles,
            'specialties' => $specialties,
            'terms' => Constant::value('terms'),
            'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY
        ];
    }

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $userJpa = DB::transaction(function () use ($request) {
                if (!$request->google_id) throw new Exception('Necesitas enviar un ID de autenticación de Google');
                if (!isset($request->password) || !isset($request->confirmation)) throw new Exception('Debes ingresar una contraseña para el nuevo usuario');
                if (Controller::decode($request->password) != Controller::decode($request->confirmation)) throw new Exception('Las contraseñas deben ser iguales');
                $userJpa = User::query()
                    ->where('google_id', $request->google_id)
                    ->first();

                if (!$userJpa) throw new Exception('No se ha encontrado el usuario');

                if ($userJpa->hasAnyRole(['Admin', 'Coach', 'Coachee'])) {
                    $error = "El usuario {$userJpa->email} ya se encuentra registrado. Por favor, inicie sesión con su correo y contraseña.";
                    throw new Exception($error);
                }

                $password = Controller::decode($request->password);
                $userJpa->password = $password;
                $userJpa->real_password = $password;

                $userJpa->save();

                $roleJpa = Role::where('relative_id', $request->role)->first();
                $userJpa->assignRole($roleJpa->name);

                $specialties = $request->specialties ?? [];
                foreach ($specialties as $specialty) {
                    SpecialtiesByUser::create([
                        'user_id' => $userJpa->id,
                        'specialty_id' => $specialty
                    ]);
                }

                return $userJpa;
            });

            Auth::login($userJpa);
        });
        return response($response->toArray(), $response->status);
    }

    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }
    public function googleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            $message = 'Error desconocido';
            if ($e->getMessage()) $message = $e->getMessage();

            return redirect()->route('Login.jsx', [
                'message' => "La autenticación de Google ha fallado: {$message}"
            ]);
        }

        $userJpa = User::where('email', $user->email)->first();
        $hasAnyRole = $userJpa?->hasAnyRole(['Admin', 'Coach', 'Coachee']) ?? false;

        if ($userJpa && $hasAnyRole) {
            Auth::login($userJpa);
            return redirect()->route('Login.jsx');
        }

        // Saving profile
        $uuid = $userJpa?->uuid ?? Crypto::randomUUID();
        try {
            $profileRes = new Fetch($user->avatar);
            $profile = $profileRes->blob();

            $thumbnailPath = 'profile/thumbnail/' . $userJpa->uuid . '.img';
            $fullPath = 'profile/' . $userJpa->uuid . '.img';

            Storage::put($thumbnailPath, $profile);
            Storage::put($fullPath, $profile);
        } catch (\Throwable $th) {
            // dump($th->getMessage());
        }

        $password = $userJpa?->password ?? Crypto::short();
        $data = [
            'password' => $password,
            'uuid' => $uuid,
            'name' => $user->user['given_name'] ?? $user->name,
            'lastname' => $user->user['family_name'] ?? null,
            'google_id' => $user->id,
            'country' => 89
        ];
        if (!$userJpa) {
            $data['real_password'] = $password;
        }
        $userJpa = User::updateOrCreate(['email' => $user->email], $data);

        return redirect()->route('RegisterGoogle.jsx', [
            'google_id' => $userJpa->google_id
        ]);
    }
}
