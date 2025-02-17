<?php

namespace Database\Seeders;

use App\Models\Agreement;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;

class AgreementsBKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agreementsBK = JSON::parse(Storage::get('seeds/agreements.json'));

        foreach ($agreementsBK as $key => $agreementBK) {
            $request_hash = md5('request_' . $agreementBK['idsolicitud']);
            $request_uuid = sprintf(
                '%s-%s-%s-%s-%s',
                substr($request_hash, 0, 8),
                substr($request_hash, 8, 4),
                substr($request_hash, 12, 4),
                substr($request_hash, 16, 4),
                substr($request_hash, 20, 12)
            );

            $agreement_hash = md5('agreement_' . $agreementBK['id']);
            $agreement_uuid = sprintf(
                '%s-%s-%s-%s-%s',
                substr($agreement_hash, 0, 8),
                substr($agreement_hash, 8, 4),
                substr($agreement_hash, 12, 4),
                substr($agreement_hash, 16, 4),
                substr($agreement_hash, 20, 12)
            );

            $contract_number = intval(Text::keep($agreementBK['num_contrato'], '0123456789'));

            $day = $agreementBK['dia'] == 'miercoles' ? 'X' : strtoupper($agreementBK['dia'][0]);

            $coachJpa = User::where('email', $agreementBK['coach_email'])->first() ?? null;
            $coacheeJpa = User::where('email', $agreementBK['coachee_email'])->first() ?? null;

            if ($key == 0) dump('ping ' . $key);
            if ($coachJpa || !$coacheeJpa) dump($agreementBK);

            $agreement_status = null;
            if ($agreementBK['estado'] == 'aprobado' || $agreementBK['estado'] == 'terminado') {
                $agreement_status = 1;
            } elseif ($agreementBK['estado'] == 'cancelado') {
                $agreement_status = 0;
            }

            $agreementJpa = Agreement::updateOrCreate(
                [
                    'id' => $agreement_uuid
                ],
                [
                    'request_id' => $request_uuid,
                    'contract_number' => $contract_number,
                    'sessions' => $agreementBK['cant_sesiones'],
                    'process_type' => $agreementBK['tipo'] == 'coach' ? 'coaching' : 'mentoring',
                    'process_topic' => $agreementBK['tema_proceso'],
                    'session_duration' => $agreementBK['duracion'],
                    'session_frequency' => $agreementBK['frecuencia'],
                    'day' => $day,
                    'time' => $agreementBK['horario'] . ':00',
                    'location' => $agreementBK['lugar'],
                    'start_date' => $agreementBK['fecha_inicio'],
                    'payment_frequency' => $agreementBK['frecuencia_pago'],
                    'total_amount' => $agreementBK['monto'],
                    'installments' => $agreementBK['cuotas'],
                    'payment_start_date' => $agreementBK['fecha_inicio_pago_cuota'],
                    'schedule_change_notice' => $agreementBK['tiempo_cambio'],
                    'coach_id' => $coachJpa->id,
                    'coachee_id' => $coacheeJpa->id,
                    'status' => $agreement_status,
                ]
            );
        }
    }
}
