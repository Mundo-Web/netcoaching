import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import SchedulesRest from '../Actions/Coachee/SchedulesRest';
import DxButton from '@Adminto/Dx/DxButton';
import Modal from '@Adminto/Modal';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import SelectFormGroup from '@Adminto/form/SelectFormGroup';
import QuillFormGroup from '@Adminto/form/QuillFormGroup';
import TextareaFormGroup from '../Components/Adminto/form/TextareaFormGroup';
import FileFormGroup from '../Components/Adminto/form/FileFormGroup';

const schdulesRest = new SchedulesRest()

const Schedules = () => {
  const gridRef = useRef()
  const modalReportRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)
  const [modalLoaded, setModalLoaded] = useState(null)

  return (<>
    <Table gridRef={gridRef} title='Sesiones' rest={schdulesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          width: 400,
          cellTemplate: (container, { data }) => {
            container.addClass('text-start')
            ReactAppend(container, <>
              <h4 className='mt-0 mb-0'>Sesión #{String(data.id).padStart(3, '0')}</h4>
              <b>Acuerdo C{String(data.agreement.contract_number).padStart(3, '0')}</b>: {data.agreement.process_topic}
            </>)
          }
        },
        {
          dataField: 'name',
          caption: 'Título',
          width: 80
        },
        {
          dataField: 'session_date',
          caption: 'Fecha',
          dataType: 'date',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.session_date).format('LL'))
          }
        },
        {
          dataField: 'completed',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            if (data.completed == 1) {
              ReactAppend(container, <span className='badge bg-success rounded-pill'>Finalizado</span>)
            } else {
              ReactAppend(container, <span className='badge bg-dark rounded-pill'>Pendiente</span>)
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-warning',
              title: 'Reporte',
              icon: 'fa fa-clipboard-check',
              onClick: () => {
                setDataLoaded(data)
                setModalLoaded('report')
                $(modalReportRef.current).modal('show')
              }
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Bitácora',
              icon: 'fa fa-journal-whills',
              onClick: () => {
                setDataLoaded(data)
                setModalLoaded('logbook')
                $(modalReportRef.current).modal('show')
              }
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Notas',
              icon: 'fa fa-sticky-note',
              onClick: () => {
                setDataLoaded(data)
                setModalLoaded('notes')
                $(modalReportRef.current).modal('show')
              }
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />

    <Modal modalRef={modalReportRef} title={<div className='d-flex gap-2 flex-wrap align-items-center justify-content-between'>
      <span className='d-block'>
        {
          ({ report: 'REPORTE', logbook: 'BITACORA', notes: 'NOTAS' })[modalLoaded]
        }: Sesión #{String(dataLoaded?.id).padStart(3, '0')}
      </span>
      <div className="d-flex gap-1">
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
    </div>} size='lg' position='right' bodyClass='p-0' btnSubmitText='Guardar'>
      <div style={{
        padding: '1rem',
        minHeight: 'calc(100vh - 190px)',
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
        <button className='btn btn-sm btn-soft-primary rounded-pill'>
          <i className='fa fa-eye me-1'></i>
          Ver acuerdo
        </button>
        <hr className='my-2' />
        {
          modalLoaded == 'report' && <>
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
            <QuillFormGroup label='Comentarios' col='col-12' />
          </>
        }
        {
          modalLoaded == 'logbook' && <div id='logbook-modal' className='row'>
            <TextareaFormGroup label='1. Tema' />
            <TextareaFormGroup label='2. Lo que deseo es ...' />
            <TextareaFormGroup label='3. Me di cuenta de ...' />
            <TextareaFormGroup label='4. Acciones a las cuales me comprometo' />
            <TextareaFormGroup label='5. Avance o estatus' />
          </div>
        }
        {
          modalLoaded == 'notes' && <div id='notes-modal' className='row'>
            <TextareaFormGroup label='Comentario' rows={4} />
            <FileFormGroup label='Adjunto' multiple/>
          </div>
        }
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Sesiones'>
    <Schedules {...properties} />
  </BaseAdminto>);
})