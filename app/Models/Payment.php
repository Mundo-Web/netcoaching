<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'agreement_id',
        'coach_id',
        'coachee_id',
        'name',
        'amount',
        'payment_date',
        'due_date',
        'payment_code',
        'status_message',
        'status',
    ];
}
