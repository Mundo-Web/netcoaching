import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import AgreementsRest from '../Actions/Coach/AgreementsRest';
import Modal from '../Components/Coach/Agreements/Modal';
import AdmintoModal from '@Adminto/Modal'
import Details from '../Components/Coach/Agreements/Details';

const agreementsRest = new AgreementsRest()

const Agreements = () => {
  const gridRef = useRef()
  const modalRef = useRef()
  const observationsModalRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)
  const [agreementLoaded, setAgreementLoaded] = useState(null)
  const [observations, setObservations] = useState([])

  const onModalOpen = (data) => {
    setAgreementLoaded(data)
    $(modalRef.current).modal('show');
  }

  const onObservationsClicked = (data) => {
    console.log(data)
    setObservations(data.observations)
    $(observationsModalRef.current).modal('show')
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await agreementsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Acuerdos' rest={agreementsRest}
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
          visible: false
        },
        {
          dataField: 'coachee.name',
          caption: 'Coachee',
          dataType: 'string',
          cellTemplate: (container, { data }) => {
            container.text(`${data.coachee.name} ${data.coachee.lastname}`)
          }
        },
        {
          dataField: 'contract_number',
          caption: 'Acuerdo',
          dataType: 'number',
          cellTemplate: (container, { data }) => {
            container.text('C' + String(data.contract_number).padStart(3, '0'))
          }
        },
        {
          dataField: 'process_topic',
          caption: 'Tema',
        },
        {
          dataField: 'created_at',
          caption: 'Fecha',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.created_at).format('LL'))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Aprobado</span>)
                break
              case 0:
                ReactAppend(container, <div>
                  <span className='badge bg-danger rounded-pill' onClick={() => onObservationsClicked(data)} style={{ cursor: 'pointer' }}>
                    Observado
                    <i className='ms-1 mdi mdi-arrow-top-right'></i>
                  </span>
                </div>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Pendiente</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Ver acuerdo',
              icon: 'fas fa-file-invoice',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => setDataLoaded(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} onSave={() => $(gridRef.current).dxDataGrid('instance').refresh()} />
    <AdmintoModal modalRef={modalRef} title={`Acuerdo C${String(agreementLoaded?.contract_number).padStart(3, '0')}`} hideFooter size='lg' >
      <Details {...agreementLoaded} />
    </AdmintoModal>
    <AdmintoModal modalRef={observationsModalRef} title='Observaciones' hideFooter>
      <ul className='conversation-list'>
        {
          observations.map(({ observer, description, created_at }, index) => {
            return <li key={index} className={index + 1 == observations.length ? 'mb-0' : ''}>
              <div class="message-list">
                <div class="chat-avatar">
                  <img src={`/api/profile/thumbnail/${observer.uuid}`} alt={observer.name} />
                </div>
                <div class="conversation-text">
                  <div class="ctext-wrap">
                    <span class="user-name">{observer.name.split(' ')[0]} {observer.lastname.split(' ')[0]}</span>
                    <p>{description}</p>
                  </div>
                  <span class="time">{moment(created_at).format('lll')}</span>
                </div>
              </div>
            </li>
          })
        }
      </ul>
    </AdmintoModal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Acuerdos'>
    <Agreements {...properties} />
  </BaseAdminto>);
})