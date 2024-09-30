import React, { useEffect, useRef, useState } from "react"
import InputFormGroup from '@Adminto/form/InputFormGroup';
import SelectFormGroup from '@Adminto/form/SelectFormGroup';
import AdmintoModal from '@Adminto/Modal';
import Swal from "sweetalert2";
import AgreementsRest from "@Rest/Coach/AgreementsRest";

const agreementsRest = new AgreementsRest()

const Modal = ({ dataLoaded, setDataLoaded, onSave = () => { } }) => {

  const modalRef = useRef()

  const idRef = useRef()
  const requestIdRef = useRef()
  const contractNumberRef = useRef()
  const sessionsRef = useRef()
  const processTypeRef = useRef()
  const processTopicRef = useRef()
  const sessionDurationRef = useRef()
  const sessionFrequencyRef = useRef()
  const dayRef = useRef()
  const timeRef = useRef()
  const locationRef = useRef()
  const startDateRef = useRef()
  const paymentFrequencyRef = useRef()
  const totalAmountRef = useRef()
  const installmentsRef = useRef()
  const paymentStartDateRef = useRef()
  const scheduleChangeNoticeRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    $(modalRef.current).on('hidden.bs.modal', () => setDataLoaded(null))
  }, [null])

  useEffect(() => {
    if (!dataLoaded) return

    onModalOpen(dataLoaded)
  }, [dataLoaded])

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    requestIdRef.current.value = data?.request_id || null;
    if (data?.contract_number) {
      contractNumberRef.current.value = 'C' + String(data?.contract_number).padStart(3, '0')
    } else {
      agreementsRest.code()
        .then(code => {
          contractNumberRef.current.value = 'C' + String(code).padStart(3, '0')
        })
    }
    sessionsRef.current.value = data?.sessions || null;
    $(processTypeRef.current).val(data?.process_type || 'coaching').trigger('change');
    processTopicRef.current.value = data?.process_topic || null;
    sessionDurationRef.current.value = data?.session_duration || null;
    $(sessionFrequencyRef.current).val(data?.session_frequency || 'weekly').trigger('change');
    $(dayRef.current).val(data?.day || 'L').trigger('change');
    timeRef.current.value = data?.time || null;
    locationRef.current.value = data?.location || null;
    startDateRef.current.value = data?.start_date || null;
    $(paymentFrequencyRef.current).val(data?.payment_frequency || 'weekly').trigger('change');
    totalAmountRef.current.value = data?.total_amount || null;
    $(installmentsRef.current).val(data?.installments || 1).trigger('change');
    paymentStartDateRef.current.value = data?.payment_start_date || null;
    scheduleChangeNoticeRef.current.value = data?.schedule_change_notice || null;

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const { isConfirmed } = await Swal.fire({
      title: 'Confirmar',
      text: '¿Está seguro de guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    if (!isConfirmed) return

    const request = {
      id: idRef.current.value || undefined,
      request_id: requestIdRef.current.value,
      sessions: sessionsRef.current.value,
      process_type: processTypeRef.current.value,
      process_topic: processTopicRef.current.value,
      session_duration: sessionDurationRef.current.value,
      session_frequency: sessionFrequencyRef.current.value,
      day: dayRef.current.value,
      time: timeRef.current.value,
      location: locationRef.current.value,
      start_date: startDateRef.current.value,
      payment_frequency: paymentFrequencyRef.current.value,
      total_amount: totalAmountRef.current.value,
      installments: installmentsRef.current.value,
      payment_start_date: paymentStartDateRef.current.value,
      schedule_change_notice: scheduleChangeNoticeRef.current.value,
    }

    const result = await agreementsRest.save(request)
    if (!result) return

    onSave()

    $(modalRef.current).modal('hide')
  }

  return <AdmintoModal modalRef={modalRef} title={isEditing ? `Modificar acuerdo - C${String(dataLoaded?.contract_number).padStart(3, '0')}` : 'Redactar acuerdo'} onSubmit={onModalSubmit} size='full-width' isStatic>
    <input ref={idRef} type="hidden" />
    <input ref={requestIdRef} type="hidden" />
    <div className="row">
      <h5 className="text-info">Datos del acuerdo</h5>
      <InputFormGroup
        eRef={contractNumberRef}
        label='N° Contrato'
        col='col-md-4 col-sm-6 col-xs-12'
        type='text'
        id='contrato'
        value='C097'
        readOnly
      />
      <InputFormGroup
        eRef={sessionsRef}
        label='Número de sesiones'
        col='col-md-4 col-sm-6 col-xs-12'
        type='number'
        id='sesiones'
        required
        min={1}
      />
    </div>

    <div className="row mt-2" id='conditions-container'>
      <h5 className="text-info">Condiciones para el proceso de coaching</h5>
      <p>Hemos acordado para este proceso sujetarnos a las condiciones que se mencionan a continuación:</p>

      <SelectFormGroup eRef={processTypeRef} label='Tipo de proceso' col='col-md-4 col-sm-6 col-xs-12' dropdownParent='#conditions-container' id='tipoProceso' required>
        <option value='coaching'>Coaching</option>
        <option value='mentoring'>Mentoring</option>
      </SelectFormGroup>
      <InputFormGroup eRef={processTopicRef} label='Tema del proceso' col='col-md-8 col-sm-6 col-xs-12' type='text' id='temaProceso' required />
    </div>

    <div className="row" id='duration-container'>
      <InputFormGroup
        eRef={sessionDurationRef}
        label='Duración de sesiones (solo Nro horas)'
        col='col-md-4 col-sm-6 col-xs-12'
        type='number'
        id='duracionSesiones'
        required
        min={1}
      />
      <SelectFormGroup eRef={sessionFrequencyRef} label='Frecuencia de sesión' col='col-md-4 col-sm-6 col-xs-12' id='frecuenciaSesion' dropdownParent='#duration-container' required>
        <option value='weekly'>Semanal</option>
        <option value='biweekly'>Quincenal</option>
        <option value='monthly'>Mensual</option>
      </SelectFormGroup>
      <SelectFormGroup eRef={dayRef} label='Día' col='col-md-4 col-sm-6 col-xs-12' id='dia' dropdownParent='#duration-container' required>
        <option value='D'>Domingo</option>
        <option value='L'>Lunes</option>
        <option value='M'>Martes</option>
        <option value='X'>Miércoles</option>
        <option value='J'>Jueves</option>
        <option value='V'>Viernes</option>
        <option value='S'>Sábado</option>
      </SelectFormGroup>
    </div>

    <div className="row">
      <InputFormGroup
        eRef={timeRef}
        label='Horario'
        col='col-md-4 col-sm-6 col-xs-12'
        type='time'
        id='horario'
        required
      />
      <InputFormGroup
        eRef={locationRef}
        label='Lugar'
        col='col-md-4 col-sm-6 col-xs-12'
        type='text'
        id='lugar'
        placeholder='Espacio físico o link de reunión remota'
        required
      />
      <InputFormGroup
        eRef={startDateRef}
        label='Fecha de Inicio'
        col='col-md-4 col-sm-6 col-xs-12'
        type='date'
        id='fechaInicio'
        required
      />
    </div>

    <div className="row mt-2" id='billing-container'>
      <h5 className="text-info">Datos de facturacion</h5>
      <SelectFormGroup eRef={paymentFrequencyRef} label='Frecuencia de pago' col='col-md-4 col-sm-6 col-xs-12' id='frecuenciaPago' dropdownParent='#billing-container' required>
        <option value='weekly'>Semanal</option>
        <option value='biweekly'>Quincenal</option>
        <option value='monthly'>Mensual</option>
      </SelectFormGroup>
      <InputFormGroup
        eRef={totalAmountRef}
        label='Monto total de servicio'
        col='col-md-4 col-sm-6 col-xs-12'
        type='number'
        id='montoTotal'
        required
      />
      <SelectFormGroup eRef={installmentsRef} label='Cantidad de cuotas' col='col-md-4 col-sm-6 col-xs-12' id='cantidadCuotas' defaultValue='1' dropdownParent='#billing-container' required>
        {
          (new Array(10))
            .fill(null)
            .map((item, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))
        }
      </SelectFormGroup>
      <InputFormGroup
        eRef={paymentStartDateRef}
        label='Fecha de inicio de pago de cuota'
        col='col-md-4 col-sm-6 col-xs-12'
        type='date'
        id='fechaInicioPago'
        required
      />
    </div>
    <div className="row mt-2">
      <h5 className="text-info">Otros aspectos importantes</h5>
      <div className="col-12">
        <h6>Modificaciones de Horarios</h6>
        <p>
          Si surgiera algún cambio o impedimento del último momento, por favor avisarme con
          <input
            ref={scheduleChangeNoticeRef}
            type='text'
            id='anticipacionAviso'
            placeholder='ej. 24 horas'
            className='d-inline-block form-control form-control-sm mx-2'
            style={{ width: '150px' }}
            required
          />
          de anticipación por lo menos y coordinaremos una nueva cita, yo por mi parte haré lo mismo.
        </p>
      </div>
    </div>
  </AdmintoModal>
}

export default Modal