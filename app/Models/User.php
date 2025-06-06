<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasRoles;
    use HasPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uuid',
        'google_id',
        'name',
        'lastname',
        'dni',
        'email',
        'email_verified_at',
        'password',
        'real_password',
        'dni',
        'phone_prefix',
        'recovery_token',
        'phone',
        'video',
        'title',
        'country',
        'city',
        'address',
        'summary',
        'description',
        'price',
        'max_price',
        'experience',
        'score',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'real_password',
        'google_id',
        'recovery_token',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function isRoot()
    {
        return $this->hasRole('Root');
    }

    public function isAdmin()
    {
        return $this->hasRole('Admin');
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id');
    }

    public function getRole()
    {
        $roleJpa = ModelHasRoles::where('model_id', $this->id)->first();
        return $this->getRoleNames()[0] ?? null;
    }

    public function specialties()
    {
        return $this->hasManyThrough(Specialty::class, SpecialtiesByUser::class, 'user_id', 'id', 'id', 'specialty_id');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'owner_id', 'id');
    }
}
