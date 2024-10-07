import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import SchedulesRest from '../Actions/Coachee/SchedulesRest';
import DxButton from '@Adminto/Dx/DxButton';
import Modal from '@Adminto/Modal';

const schdulesRest = new SchedulesRest()

const Schedules = () => {
  const gridRef = useRef()
  const modalReportRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)

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
                $(modalReportRef.current).modal('show')
              }
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Bitácora',
              icon: 'fa fa-journal-whills',
              onClick: () => location.href = `/coachee/payments?agreement=${data.id}`
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Notas',
              icon: 'fa fa-sticky-note',
              onClick: () => location.href = `/coachee/sessions?agreement=${data.id}`
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />

    <Modal modalRef={modalReportRef} title={`REPORTE: Sesión #${String(dataLoaded?.id).padStart(3, '0')}`} size='md' position='right'>
      <p className='mb-1'>
        <b>Título</b>: {dataLoaded?.name}
      </p>
      <p className='mb-1'>
        <b>Fecha</b>: {moment(dataLoaded?.session_date).format('LL')} {dataLoaded?.agreement?.time}
      </p>
      <hr className='my-2'/>
      <div className='mb-2'>
        <h4 className='mb-1'>Acuerdo C{String(dataLoaded?.agreement?.contract_number).padStart(3, '0')}</h4>
        <b>{dataLoaded?.agreement?.process_topic}</b>
      </div>
      <button className='btn btn-sm btn-soft-primary rounded-pill'>
        <i className='fa fa-eye me-1'></i>
        Ver acuerdo
      </button>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='sesiones'>
    <Schedules {...properties} />
  </BaseAdminto>);
})