import Tippy from "@tippyjs/react"
import React, { useEffect, useRef, useState } from "react"
import NotesRest from "../../Actions/NotesRest"
import Modal from "../../Components/Adminto/Modal"
import FileFormGroup from "../../Components/Adminto/form/FileFormGroup"
import InputFormGroup from "../../Components/Adminto/form/InputFormGroup"
import QuillFormGroup from "../../Components/Adminto/form/QuillFormGroup"
import SelectFormGroup from "../../Components/Adminto/form/SelectFormGroup"
import TextareaFormGroup from "../../Components/Adminto/form/TextareaFormGroup"
import LaravelSession from "../../Utils/LaravelSession"
import CoachReportsRest from "../../Actions/Coach/ReportsRest"
import ReportsRest from "../../Actions/ReportsRest"
import LogbooksRest from "../../Actions/LogbooksRest"

const notesRest = new NotesRest()

const coachReportsRest = new CoachReportsRest()
const reportsRest = new ReportsRest()

const logbooksRest = new LogbooksRest()

const AnnotationModal = ({ modalRef, dataLoaded, setDataLoaded, modalLoaded, setModalLoaded, hasRole, onChange = () => { } }) => {

  // Report Refs
  const durationRef = useRef()
  const reprogrammedRef = useRef()
  const wasAttendedRef = useRef()
  const wasConfortableRef = useRef()
  const wasPerformedRef = useRef()
  const commentRef = useRef()

  // Logbook Refs
  const topicRef = useRef();
  const goalRef = useRef();
  const insightRef = useRef();
  const commitmentsRef = useRef();
  const statusRef = useRef();

  // Notes Refs
  const nameRef = useRef()
  const descriptionRef = useRef()
  const attachmentRef = useRef()

  const [report, setReport] = useState(null)
  const [logbook, setLogbook] = useState(null)
  const [notes, setNotes] = useState([])

  const onAnnotationSubmit = (e) => {
    e.preventDefault()

    console.log('Guardando en:', modalLoaded)

    switch (modalLoaded) {
      case 'report':
        if (!hasRole('Coach')) return
        onReportSave()
        break;
      case 'logbook':
        onLogbookSave()
        break;
      case 'notes':
        onNoteSave()
        break;
    }
  }

  const onReportSave = async () => {
    const request = {
      schedule_id: dataLoaded.id,
      duration: durationRef.current.value,
      reprogrammed: reprogrammedRef.current.value,
      was_attended: wasAttendedRef.current.value == 'true',
      was_comfortable: wasConfortableRef.current.value == 'true',
      was_performed: wasPerformedRef.current.value == 'true',
      comment: commentRef.current.value
    }

    const result = await coachReportsRest.save(request)
    if (!result) return
    setReport(result.data)
    setDataLoaded(old => ({ ...old, report: { id: result.data.id } }))
    onChange()
  }

  const onLogbookSave = async () => {
    const request = {
      schedule_id: dataLoaded.id,
      topic: topicRef.current.value,
      goal: goalRef.current.value,
      insight: insightRef.current.value,
      commitments: commitmentsRef.current.value,
      status: statusRef.current.value,
    }
    const result = await logbooksRest.save(request)
    if (!result) return
    setLogbook(result.data)
    setDataLoaded(old => ({ ...old, logbook: { id: result.data.id } }))
  }

  const onNoteSave = async () => {
    const formData = new FormData()
    formData.append('schedule_id', dataLoaded.id)
    formData.append('name', nameRef.current.value)
    formData.append('description', descriptionRef.current.value)
    if (attachmentRef.files?.[0]) {
      formData.append('attachment', attachmentRef.files?.[0])
    }

    console.log('saving note', formData);

    const result = await notesRest.save(formData)
    if (!result) return
    nameRef.current.value = ''
    descriptionRef.current.value = ''
    attachmentRef.setFiles([])
    getNotes()
  }

  const getReport = async () => {
    if (!dataLoaded?.report?.id) return
    const result = await reportsRest.get(dataLoaded?.report?.id)
    if (!result) return
    setReport(result)
  }
  const getLogbook = async () => {
    if (!dataLoaded?.logbook?.id) return
    const result = await logbooksRest.get(dataLoaded?.logbook?.id)
    if (!result) return
    setLogbook(result)
  }
  const getNotes = async () => {
    const result = await notesRest.bySchedule(dataLoaded.id)
    setNotes(result)
  }

  useEffect(() => {
    switch (modalLoaded) {
      case 'report':
        getReport()
        break;
      case 'logbook':
        getLogbook()
        break;
      case 'notes':
        getNotes()
        break;
    }
  }, [modalLoaded, dataLoaded])

  const onModalHide = () => {
    setLogbook(null)
    setReport(null)
    setNotes([])
    setDataLoaded(null)
    setModalLoaded(null)
  }

  useEffect(() => {
    const modalElement = modalRef.current;
    modalElement.addEventListener('hide.bs.modal', onModalHide);
    return () => {
      modalElement.removeEventListener('hide.bs.modal', onModalHide);
    };
  }, [null])

  useEffect(() => {
    durationRef.current.value = report?.duration ?? ''
    reprogrammedRef.current.value = report?.reprogrammed ?? ''
    $(wasAttendedRef.current).val((report?.was_attended ?? true) ? 'true' : 'false').trigger('change')
    $(wasConfortableRef.current).val((report?.was_comfortable ?? true) ? 'true' : 'false').trigger('change')
    $(wasPerformedRef.current).val((report?.was_performed ?? true) ? 'true' : 'false').trigger('change')
    commentRef.editor.setHTML(report?.comment ?? '')
  }, [report])

  useEffect(() => {
    console.log('Pintando logbook: ', JSON.stringify(logbook, null, 2))
    topicRef.current.value = logbook?.topic ?? ''
    goalRef.current.value = logbook?.goal ?? ''
    insightRef.current.value = logbook?.insight ?? ''
    commitmentsRef.current.value = logbook?.commitments ?? ''
    statusRef.current.value = logbook?.status ?? ''
  }, [logbook])

  return <Modal modalRef={modalRef} title={<>
    <div className='d-flex gap-2 flex-wrap align-items-center justify-content-between'>
      <span className='d-block'>
        {
          ({ report: 'REPORTE', logbook: 'BITACORA', notes: 'NOTAS' })[modalLoaded]
        }: Sesión #{String(dataLoaded?.id).padStart(3, '0')}
      </span>
      <div className="d-flex gap-1 pe-4">
        {
          modalLoaded != 'report' &&
          <button className="btn btn-xs btn-light" type='button' onClick={() => setModalLoaded('report')}>
            <i className='fa fa-clipboard-check me-1'></i>
            Reporte
          </button>
        }
        {
          modalLoaded != 'logbook' &&
          <button className="btn btn-xs btn-light" type='button' onClick={() => setModalLoaded('logbook')}>
            <i className='fa fa-journal-whills me-1'></i>
            Bitácora
          </button>
        }
        {
          modalLoaded != 'notes' &&
          <button className="btn btn-xs btn-light" type='button' onClick={() => setModalLoaded('notes')}>
            <i className='fa fa-sticky-note me-1'></i>
            Notas
          </button>
        }
      </div>
    </div>
  </>} size='lg' position='right' bodyClass='p-0' btnSubmitText='Guardar' onSubmit={onAnnotationSubmit} hideButtonSubmit={modalLoaded == 'notes' || (modalLoaded == 'report' && !hasRole('Coach'))} isStatic>
    <div style={{
      padding: '1rem',
      height: 'calc(100vh - 128px)',
      overflowY: 'auto',
      // minHeight: 'calc(100vh - 190px)',
      maxWidth: '480px',
      width: '100%'
    }}>
      <p className='mb-1'>
        <b>Título</b>: {dataLoaded?.name}
      </p>
      <p className='mb-1'>
        <b>Fecha</b>: {moment(dataLoaded?.session_date).format('LL')} {dataLoaded?.agreement?.time}
      </p>
      <hr className='my-2' />
      <div className='mb-2'>
        <h4 className='mb-1'>Acuerdo C{String(dataLoaded?.agreement?.contract_number).padStart(3, '0')}</h4>
        <b>{dataLoaded?.agreement?.process_topic}</b>
        <p>
          <b>Lugar:</b> {dataLoaded?.agreement?.location}
        </p>
      </div>
      <button className='btn btn-sm btn-soft-primary rounded-pill' type="button">
        <i className='fa fa-eye me-1'></i>
        Ver acuerdo
      </button>
      <hr className='my-2' />
      <div hidden={modalLoaded != 'report'}>
        <div id='report-modal' className="row">
          <InputFormGroup eRef={durationRef} label='Duración (horas)' col='col-md-6' required={modalLoaded == 'report'} disabled={!hasRole('Coach')} />
          <InputFormGroup eRef={reprogrammedRef} label='Reprogramó (Nº veces)' col='col-md-6' required={modalLoaded == 'report'} disabled={!hasRole('Coach')} />
          <SelectFormGroup eRef={wasAttendedRef} label='Puntualidad' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1} required={modalLoaded == 'report'} disabled={!hasRole('Coach')}>
            <option value={true}>SI</option>
            <option value={false}>No</option>
          </SelectFormGroup>
          <SelectFormGroup eRef={wasConfortableRef} label='Espacio' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1} required={modalLoaded == 'report'} disabled={!hasRole('Coach')}>
            <option value={true}>Adecuado</option>
            <option value={false}>Inadecuado</option>
          </SelectFormGroup>
          <SelectFormGroup eRef={wasPerformedRef} label='Actividades (realizó)' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1} required={modalLoaded == 'report'} disabled={!hasRole('Coach')} >
            <option value={true}>SI</option>
            <option value={false}>No</option>
          </SelectFormGroup>
        </div>
        <QuillFormGroup eRef={commentRef} label='Comentarios' col='col-12' required={modalLoaded == 'report'} disabled={!hasRole('Coach')} />
      </div>
      <div>

      </div>
      <div id='logbook-modal' className='row' hidden={modalLoaded != 'logbook'}>
        <TextareaFormGroup eRef={topicRef} label='1. Tema' required={modalLoaded == 'logbook'} />
        <TextareaFormGroup eRef={goalRef} label='2. Lo que deseo es ...' required={modalLoaded == 'logbook'} />
        <TextareaFormGroup eRef={insightRef} label='3. Me di cuenta de ...' required={modalLoaded == 'logbook'} />
        <TextareaFormGroup eRef={commitmentsRef} label='4. Acciones a las cuales me comprometo' required={modalLoaded == 'logbook'} />
        <TextareaFormGroup eRef={statusRef} label='5. Avance o estatus' required={modalLoaded == 'logbook'} />
      </div>
      <div id='notes-modal' className='row' hidden={modalLoaded != 'notes'}>
        <InputFormGroup eRef={nameRef} label='Titulo' required={modalLoaded == 'notes'} />
        <TextareaFormGroup eRef={descriptionRef} label='Comentario' rows={2} required={modalLoaded == 'notes'} />
        <FileFormGroup eRef={attachmentRef} label='Adjunto' />
        <div className="d-flex justify-content-end w-100">
          <button className='btn btn-sm btn-success' type="submit">Guardar</button>
        </div>
        {
          notes.length > 0 && <>
            <hr className="my-2" />
            <div className="inbox-widget d-flex flex-column gap-1">
              {
                notes.map((note, index) => {
                  const itsMe = LaravelSession.uuid == note.user.uuid
                  const shortName = `${note.user.name?.split(' ')?.[0]} ${note.user.lastname?.split(' ')?.[0]}`
                  return <div key={index} className="d-flex border p-2 gap-2">
                    <img src={`/api/profile/thumbnail/${note.user.uuid}`} className="avatar-sm rounded-circle" alt={`${note.user.name} ${note.user.lastname}`} />
                    <div className="w-100">
                      <h5 className="inbox-item-author mt-0 mb-1 d-flex align-items-center justify-content-between">
                        <span>{itsMe ? `Tú (${shortName})` : shortName}</span>
                        <Tippy content={moment(note.created_at).format('LLL')}>
                          <small className="text-muted">{moment(note.created_at).fromNow()}</small>
                        </Tippy>
                      </h5>
                      <b className="d-block">{note.name}</b>
                      {note.description}
                      {
                        note.attachment && <div className="btn-group w-100 mt-1">
                          <a href={`/api/notes/media/${note.attachment}`} className="btn btn-xs btn-dark text-start text-truncate w-100" target="_blank">
                            <i className="mdi mdi-paperclip me-1"></i>
                            Archivo adjunto
                          </a>
                          <Tippy content='Descargar archivo'>
                            <a href={`/api/notes/media/${note.attachment}`} download={`Archivo adjunto ${note.attachment}`} className="btn btn-xs btn-dark">
                              <i className="mdi mdi-download"></i>
                            </a>
                          </Tippy>
                        </div>
                      }
                    </div>
                  </div>
                })
              }
            </div>
          </>
        }
      </div>
    </div>
  </Modal>
}

export default AnnotationModal