import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import SchedulesRest from '../Actions/Coach/SchedulesRest';
import DxButton from '@Adminto/Dx/DxButton';
import AnnotationModal from '../Reutilizables/Annotations/AnnotationModal';

const schdulesRest = new SchedulesRest()

const Schedules = ({ hasRole }) => {
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
              badgeClass: 'bg-danger',
              badge: data.notes_count,
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

    <AnnotationModal modalRef={modalReportRef} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} setModalLoaded={setModalLoaded} modalLoaded={modalLoaded} hasRole={hasRole} onChange={() => $(gridRef.current).dxDataGrid('instance').refresh()} />
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Sesiones'>
    <Schedules {...properties} />
  </BaseAdminto>);
})