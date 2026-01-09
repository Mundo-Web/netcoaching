import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '../Components/Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import RequestsRest from '../Actions/Admin/RequestsRest';
import Tippy from '@tippyjs/react';

const requestsRest = new RequestsRest

const Requests = ({ coachId }) => {
  const gridRef = useRef()
  return (<>
    <Table gridRef={gridRef} title='Solicitudes de Coaching/Mentoring' rest={requestsRest}
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
      filterValue={coachId !== null ? ['coach_id', '=', coachId] : undefined}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'coach_id',
          visible: false,
        },
        {
          dataField: 'coach.name',
          caption: 'Coach',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <a href={`/profile/${data.coach.uuid}`} className='d-flex gap-2 align-items-center' target='_blank'>
              <div className="inbox-item-img">
                <img src={`/api/profile/thumbnail/${data.coach.relative_id}`} className="rounded-circle avatar-sm" alt="" />
              </div>
              <div>
                <h5 className="inbox-item-author mt-0 mb-0">{data.coach.name} {data.coach.lastname}</h5>
                <p className="inbox-item-text mb-0">{data.coach.email}</p>
              </div>
            </a>)
          }
        },
        {
          dataField: 'coachee.name',
          caption: 'Coachee',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <div className='d-flex gap-2 align-items-center' target='_blank'>
              <div className="inbox-item-img">
                <img src={`/api/profile/thumbnail/${data.coachee.relative_id}`} className="rounded-circle avatar-sm" alt="" />
              </div>
              <div>
                <h5 className="inbox-item-author mt-0 mb-0">{data.coachee.name} {data.coachee.lastname}</h5>
                <p className="inbox-item-text mb-0 text-primary">{data.coachee.email}</p>
              </div>
            </div>)
          }
        },
        {
          dataField: 'updated_at',
          caption: 'Fecha',
          dataType: 'date',
          width: 180,
          cellTemplate: (container, { data }) => {
            container.text(moment(data.updated_at).format('LL'))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          width: 120,
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Atendido</span>)
                break
              case 0:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Pendiente</span>)
                break
              default:
                ReactAppend(container, <span className='badge bg-danger rounded-pill'>Rechazado</span>)
                break
            }
            if (data.status == null) ReactAppend(container, <Tippy content={data.status_message}>
              <p className='mb-0 text-truncate text-muted'>{data.status_message}</p>
            </Tippy>)
          }
        },
      ]} />
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Solicitudes'>
    <Requests {...properties} />
  </BaseAdminto>);
})