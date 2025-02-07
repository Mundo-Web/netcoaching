<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'attachment',
        'user_id',
        'schedule_id',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function schedule()
    {
        return $this->hasOne(Schedule::class, 'id', 'schedule_id');
    }
}
