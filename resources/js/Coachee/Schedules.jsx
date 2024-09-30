import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import Tippy from '@tippyjs/react';
import SchedulesRest from '../Actions/Coachee/SchedulesRest';
import DxButton from '../Components/dx/DxButton';
import Modal from '../Components/Adminto/Modal';

const schdulesRest = new SchedulesRest()

const Schedules = () => {
  const gridRef = useRef()

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
              onClick: () => onModalOpen(data)
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

      <Modal/>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='sesiones'>
    <Schedules {...properties} />
  </BaseAdminto>);
})