<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'request_id',
        'contract_number',
        'sessions',
        'process_type',
        'process_topic',
        'session_duration',
        'session_frequency',
        'day',
        'time',
        'location',
        'start_date',
        'payment_frequency',
        'total_amount',
        'installments',
        'payment_start_date',
        'schedule_change_notice',
        'coach_id',
        'coachee_id',
        'status',
    ];

    public function coach()
    {
        return $this->hasOne(User::class, 'id', 'coach_id');
    }
    public function coachee()
    {
        return $this->hasOne(User::class, 'id', 'coachee_id');
    }
    public function observations()
    {
        return $this->hasMany(Observation::class, 'agreement_id', 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'agreement_id', 'id');
    }
}
