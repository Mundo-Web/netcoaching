<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'agreement_id',
        'observer_id',
        'description',
        'status',
    ];

    public function observer() {
        return $this->hasOne(User::class, 'id', 'observer_id');
    }
}
