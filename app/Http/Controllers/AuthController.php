<?php

namespace App\Http\Controllers;

use App\Http\Classes\EmailConfig;
use App\Http\Services\ReCaptchaService;
use App\Models\Constant;
use App\Models\ModelHasRoles;
use App\Models\User;
use App\Models\Person;
use App\Models\PreUser;
use App\Models\SpecialtiesByUser;
use App\Models\Specialty;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use SoDe\Extend\Crypto;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;
use SoDe\Extend\Text;
use SoDe\Extend\Trace;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{

  public function loginView(Request $request, string $confirmation = null)
  {
    if (Auth::check()) {
      $sessionJpa = User::find(Auth::id());
      switch ($sessionJpa->getRole()) {
        case 'Admin':
          return redirect('/admin/home');
          break;
        case 'Coach':
          return redirect('/coach/home');
          break;
        case 'Coachee':
          return redirect('/coachee/home');
          break;

        default:
          Auth::guard('web')->logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();
          return redirect()->route('Login.jsx', [
            'message' => $request->message ?? "No puedes iniciar sesion con este usuario, contacta al administrador"
          ]);
          break;
      }
    };

    if ($confirmation) {
      $userJpa = new User();
      try {
        //code...
        $preUserJpa = PreUser::select()
          ->where('confirmation_token', $confirmation)
          ->first();
        if (!$preUserJpa) return redirect('/login');

        $roleJpa = Role::where('relative_id', $preUserJpa->role)->first();

        $userJpa = User::create([
          'uuid' => Crypto::randomUUID(),
          'name' => $preUserJpa->name,
          'lastname' => $preUserJpa->lastname,
          'email' => $preUserJpa->email,
          'email_verified_at' => Trace::getDate('mysql'),
          'password' => $preUserJpa->password,
          'birthdate' => $preUserJpa->birthdate,
          'status' => false
        ])->assignRole($roleJpa->name);

        $specialties = JSON::parse($preUserJpa->specialties);
        foreach ($specialties as $specialty) {
          SpecialtiesByUser::create([
            'user_id' => $userJpa->id,
            'specialty_id' => $specialty
          ]);
        }

        $message = 'La confirmacion se ha realizado con exito';

        $preUserJpa->delete();
        return redirect('/login?message=' . $message);
      } catch (\Throwable $th) {
        $userJpa->delete();
        // return redirect('/login');
      }
    }

    return Inertia::render('Login', [
      'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      'APP_DOMAIN' => env('APP_DOMAIN'),
      'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
      'message' => $message ?? null
    ])->rootView('auth');
  }

  public function registerView()
  {
    if (Auth::check()) return redirect('/home');

    $roles = Role::where('public', true)->get();
    $specialties = Specialty::all();

    return Inertia::render('Register', [
      'roles' => $roles,
      'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
      'RECAPTCHA_SITE_KEY' => env('RECAPTCHA_SITE_KEY'),
      'terms' => Constant::value('terms'),
      'specialties' => $specialties
    ])->rootView('auth');
  }

  public function recoveryView(Request $request)
  {
    if (Auth::check()) {
      $sessionJpa = User::find(Auth::id());
      switch ($sessionJpa->getRole()) {
        case 'Admin':
          return redirect('/admin/home');
          break;
        case 'Coach':
          return redirect('/coach/home');
          break;
        case 'Coachee':
          return redirect('/coachee/home');
          break;

        default:
          Auth::guard('web')->logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();
          return redirect()->route('Login.jsx', [
            'message' => $request->message ?? "No puedes iniciar sesion con este usuario, contacta al administrador"
          ]);
          break;
      }
    };

    return Inertia::render('Recovery', [
      'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      'APP_DOMAIN' => env('APP_DOMAIN'),
      'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
      'message' => $message ?? null,
      'global' => [
        'APP_NAME' => env('APP_NAME'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https')
      ],
    ])->rootView('auth');
  }

  public function resetPasswordView(Request $request, string $token)
  {
    if (!$token) return redirect()->route('Login.jsx');

    $userJpa = User::query()
      ->where('recovery_token', $token)
      ->where('updated_at', '>', Trace::getDate('mysql', '-24 hours'))
      ->first();

    if (!$userJpa) return redirect()->route('Login.jsx');

    return Inertia::render('ResetPassword', [
      'name' => $userJpa->name,
      'email' => $userJpa->email,
      'recovery_token' => $token,
      'APP_PROTOCOL' => env('APP_PROTOCOL', 'https'),
      'APP_DOMAIN' => env('APP_DOMAIN'),
      'PUBLIC_RSA_KEY' => Controller::$PUBLIC_RSA_KEY,
      'global' => [
        'APP_NAME' => env('APP_NAME'),
        'APP_URL' => env('APP_URL'),
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_PROTOCOL' => env('APP_PROTOCOL', 'https')
      ],
    ])->rootView('auth');
  }

  public function confirmEmailView(Request $request, string $token)
  {
    if (Auth::check()) return redirect('/home');

    $preUserJpa = PreUser::where('token', $token)->first();
    if (!$preUserJpa) return redirect('/login');

    return Inertia::render('ConfirmEmail', [
      'email' => $preUserJpa->email
    ])->rootView('auth');
  }

  /**
   * Handle an incoming authentication request.
   */
  public function login(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = Response::simpleTryCatch(function (Response $response) use ($request) {
      $email = $request->email;
      $password = $request->password;

      if (!Auth::attempt([
        'email' => Controller::decode($email),
        'password' => Controller::decode($password)
      ])) {
        throw new Exception('Credenciales invalidas');
      }

      $request->session()->regenerate();

      $sessionJpa = User::find(Auth::id());

      if (!$sessionJpa->getRole()) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        throw new Exception('No puedes iniciar sesion con este usuario, contacta al administrador');
      }
    });
    return response($response->toArray(), $response->status);
  }

  public function signup(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = new Response();
    try {
      $request->validate([
        'name' => 'required|string|max:255',
        'lastname' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string',
        'confirmation' => 'required|string',
        'captcha' => 'required|string',
        'terms' => 'required|accepted',
        'specialties' => 'required|array'
      ]);

      $body = $request->all();

      if (!isset($request->password) || !isset($request->confirmation)) throw new Exception('Debes ingresar una contraseña para el nuevo usuario');
      if (Controller::decode($request->password) != Controller::decode($request->confirmation)) throw new Exception('Las contraseñas deben ser iguales');

      if (!ReCaptchaService::verify($request->captcha)) throw new Exception('Captcha invalido. Seguro que no eres un robot?');

      $roleExists = Role::where('relative_id', $body['role'])->exists();

      if (!$roleExists) throw new Exception('El rol que ingresaste no existe, que intentas hacer?');

      $preUserJpa = PreUser::updateOrCreate([
        'email' => $body['email']
      ], [
        'name' => $body['name'],
        'lastname' => $body['lastname'],
        'email' => $body['email'],
        'role' => $body['role'],
        'password' => Controller::decode($body['password']),
        'confirmation_token' => Crypto::randomUUID(),
        'token' => Crypto::randomUUID(),
        'specialties' => JSON::stringify($body['specialties'] ?? [])
      ]);

      $content = Constant::value('confirm-email');
      $content = str_replace('{URL_CONFIRM}', env('APP_URL') . '/confirmation/' . $preUserJpa->confirmation_token, $content);

      $mailer = EmailConfig::config();
      $mailer->Subject = 'Confirmacion - ' . env('APP_NAME');
      $mailer->Body = $content;
      $mailer->addAddress($preUserJpa->email);
      $mailer->isHTML(true);
      $mailer->send();

      $response->status = 200;
      $response->message = 'Operacion correcta';
      $response->data = $preUserJpa->token;
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }

  public function recovery(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = Response::simpleTryCatch(function () use ($request) {
      $request->validate([
        'email' => 'required|string|email|max:255'
      ]);

      $userJpa = User::where('email', $request->email)->first();
      if (!$userJpa) throw new Exception('El correo electronico ingresado no existe');

      $recoveryToken = Crypto::randomUUID();
      $userJpa->recovery_token = $recoveryToken;
      $userJpa->save();

      $content = Text::replaceData(Constant::value('recovery-email'), [
        'URL_RECOVERY' => env('APP_URL') . '/recovery/' . $userJpa->recovery_token,
        'APP_DOMAIN' => env('APP_DOMAIN'),
        'APP_NAME' => env('APP_NAME'),
      ]);

      $mailer = EmailConfig::config();
      $mailer->Subject = 'Recuperacion - ' . env('APP_NAME');
      $mailer->Body = $content;
      $mailer->addAddress($userJpa->email);
      $mailer->isHTML(true);
      $mailer->send();
    });
    return response($response->toArray(), $response->status);
  }

  public function resetPassword(Request $request): HttpResponse | ResponseFactory | RedirectResponse
  {
    $response = Response::simpleTryCatch(function () use ($request) {
      $request->validate([
        'password' => 'required|string',
        'confirmation' => 'required|string',
        'recovery_token' => 'required|string'
      ]);

      if (Controller::decode($request->password) != Controller::decode($request->confirmation)) throw new Exception('Las contraseñas deben ser iguales');

      $userJpa = User::query()
        ->where('recovery_token', $request->recovery_token)
        ->where('updated_at', '>', Trace::getDate('mysql', '-24 hours'))
        ->first();
      if (!$userJpa) throw new Exception('El correo electronico ingresado no existe');

      $password = Controller::decode($request->password);

      $userJpa->password = $password;
      $userJpa->real_password = $password;
      $userJpa->recovery_token = null;
      $userJpa->save();

      Auth::login($userJpa);
    });
    return response($response->toArray(), $response->status);
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request)
  {
    $response = new Response();
    try {
      Auth::guard('web')->logout();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      $response->status = 200;
      $response->message = 'Cierre de sesion exitoso';
    } catch (\Throwable $th) {
      $response->status = 400;
      $response->message = $th->getMessage();
    } finally {
      return response(
        $response->toArray(),
        $response->status
      );
    }
  }
}
