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

const notesRest = new NotesRest()

const AnnotationModal = ({ modalRef, dataLoaded, setDataLoaded, modalLoaded, setModalLoaded }) => {

  const quillRef = useRef()

  const durationRef = useRef()

  // Notes Refs
  const nameRef = useRef()
  const descriptionRef = useRef()
  const attachmentRef = useRef()

  const [report, setReport] = useState(null)
  const [logbook, setLogbook] = useState(null)
  const [notes, setNotes] = useState([])

  const onAnnotationSubmit = (e) => {
    e.preventDefault()

    switch (modalLoaded) {
      case 'report':
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

  }

  const onLogbookSave = async () => {

  }

  const onNoteSave = async () => {
    const formData = new FormData()
    formData.append('schedule_id', dataLoaded.id)
    formData.append('name', nameRef.current.value)
    formData.append('description', descriptionRef.current.value)
    if (attachmentRef.files?.[0]) {
      formData.append('attachment', attachmentRef.files?.[0])
    }

    const result = await notesRest.save(formData)
    if (!result) return
    nameRef.current.value = ''
    descriptionRef.current.value = ''
    attachmentRef.setFiles([])
    getNotes()
  }

  const getReport = async () => {

  }
  const getLogbook = async () => {

  }
  const getNotes = async () => {
    const result = await notesRest.bySchedule(dataLoaded.id)
    setNotes(result)
  }

  useEffect(() => {
    switch (modalLoaded) {
      case 'report':
        setReport(null)
        getReport()
        break;
      case 'logbook':
        setLogbook(null)
        getLogbook()
        break;
      case 'notes':
        getNotes()
        break;
    }
  }, [modalLoaded, dataLoaded])

  const onModalHide = () => {
    console.log('El modal se ha cerado')
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
  </>} size='lg' position='right' bodyClass='p-0' btnSubmitText='Guardar' onSubmit={onAnnotationSubmit} hideButtonSubmit={modalLoaded == 'notes'}>
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
          <InputFormGroup label='Duración (horas)' col='col-md-6' />
          <InputFormGroup label='Reprogramó (Nº veces)' col='col-md-6' />
          <SelectFormGroup label='Puntualidad' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1}>
            <option value="SI">SI</option>
            <option value="NO">No</option>
          </SelectFormGroup>
          <SelectFormGroup label='Espacio' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1}>
            <option>Adecuado</option>
            <option>Inadecuado</option>
          </SelectFormGroup>
          <SelectFormGroup label='Actividades (realizó)' col='col-md-6' dropdownParent='#report-modal' minimumResultsForSearch={-1} >
            <option value="SI">SI</option>
            <option value="NO">No</option>
          </SelectFormGroup>
        </div>
        <QuillFormGroup eRef={quillRef} label='Comentarios' col='col-12' />
      </div>
      <div>

      </div>
      <div id='logbook-modal' className='row' hidden={modalLoaded != 'logbook'}>
        <TextareaFormGroup label='1. Tema' />
        <TextareaFormGroup label='2. Lo que deseo es ...' />
        <TextareaFormGroup label='3. Me di cuenta de ...' />
        <TextareaFormGroup label='4. Acciones a las cuales me comprometo' />
        <TextareaFormGroup label='5. Avance o estatus' />
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