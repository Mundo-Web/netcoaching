<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'agreement_id',
        'coach_id',
        'coachee_id',
        'name',
        'session_date',
        'completed',
        'status',
    ];

    public function agreement() {
        return $this->hasOne(Agreement::class, 'id', 'agreement_id');
    }
    public function coach() {
        return $this->hasOne(User::class, 'id', 'coach_id');
    }
    public function coachee() {
        return $this->hasOne(User::class, 'id', 'coachee_id');
    }
}
