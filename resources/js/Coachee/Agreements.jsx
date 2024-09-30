import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import DxButton from '@Adminto/Dx/DxButton';
import AgreementsRest from '../Actions/Coachee/AgreementsRest';
import Modal from '../Components/Coach/Agreements/Modal';
import AdmintoModal from '@Adminto/Modal'
import Details from '../Components/Coach/Agreements/Details';
import Swal from 'sweetalert2';
import ObservationsRest from '../Actions/Coachee/ObservationsRest';
import { renderToString } from 'react-dom/server';
import Number2Currency from '../Utils/Number2Currency';

const agreementsRest = new AgreementsRest()
const observationsRest = new ObservationsRest()

const Agreements = () => {
  const gridRef = useRef()
  const modalRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)
  const [agreementLoaded, setAgreementLoaded] = useState(null);

  const onModalOpen = (data) => {
    setAgreementLoaded(data)
    $(modalRef.current).modal('show');
  }

  const handleObserveContract = async () => {
    $(modalRef.current).modal('hide')
    const { value: reason } = await Swal.fire({
      title: 'Observar contrato',
      html: renderToString(<div style={{ fontSize: 'medium' }}>
        <div className='form-group'>
          <label htmlFor="observation-reason" style={{ marginBottom: '4px' }}>Motivo de la observación</label>
          <textarea id='observation-reason' className="form-control" placeholder="Ingrese el motivo de la observación aquí..." style={{
            minHeight: '27px',
            fieldSizing: 'content'
          }}></textarea>
        </div>
      </div>),
      showCancelButton: true,
      confirmButtonText: 'Observar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const otherReason = $('#observation-reason').val();
        if (!otherReason.trim()) {
          Swal.showValidationMessage('Por favor, ingrese el motivo de la observación');
          return false;
        }
        return otherReason;
      }
    });

    if (!reason) return $(modalRef.current).modal('show');

    const result = await observationsRest.save({
      agreement_id: agreementLoaded?.id,
      description: reason
    });

    if (!result) return

    $(modalRef.current).modal('hide')
    $(gridRef.current).dxDataGrid('instance').refresh()
  };

  const handleAcceptContract = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Aceptar contrato',
      text: '¿Estas seguro de aceptar este contrato?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, aceptar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await agreementsRest.save({
      id: agreementLoaded.id,
      status: true,
    })
    if (!result) return
    $(modalRef.current).modal('hide')
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
          dataField: 'coach.name',
          caption: 'Coach',
          width: '250px',
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
          dataField: 'process_topic',
          caption: 'Tema',
        },
        {
          dataField: 'start_date',
          caption: 'Fecha inicio',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.start_date).format('LL'))
          }
        },
        {
          dataField: 'payment_start_date',
          caption: 'Fecha primera cuota',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.payment_start_date).format('LL'))
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
                  <span className='badge bg-danger rounded-pill'>
                    Observado
                    <i className='mdi mdi-arrow-top-right ms-1'></i>
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
              className: 'btn btn-xs btn-soft-success',
              title: 'Ver pagos',
              icon: ' fas fa-money-check-alt',
              onClick: () => location.href = `/coachee/payments?agreement=${data.id}`
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Ver sesiones',
              icon: 'fas fa-th-list',
              onClick: () => location.href = `/coachee/sessions?agreement=${data.id}`
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} onSave={() => $(gridRef.current).dxDataGrid('instance').refresh()} />
    <AdmintoModal modalRef={modalRef} title={`Acuerdo C${String(agreementLoaded?.contract_number).padStart(3, '0')}`} size='lg' hideButtonSubmit isStatic>
      <Details {...agreementLoaded} />
      <hr />
      {
        agreementLoaded?.status == 1
          ? <>
            <h4>Pagos del contrato:</h4>
            <p>Para poder pagar las cuotas debes dirigirte a <a href="/coachee/payments">Pagos <span className='mdi mdi-arrow-top-right'></span></a> en el menú.</p>
            <table className='table table-sm table-striped'>
              <thead>
                <tr>
                  <td>Monto</td>
                  <td>Fecha pago</td>
                  <td>Pagar antes de</td>
                  <td>Cargo</td>
                  <td>Estado</td>
                </tr>
              </thead>
              <tbody>
                {
                  agreementLoaded?.payments?.map((payment, index) => (<tr key={index}>
                    <td>USD {Number2Currency(payment.amount)}</td>
                    <td>{payment.payment_date}</td>
                    <td>{moment(payment.due_date).format('LL')}</td>
                    <td></td>
                    <td>{
                      payment.status
                        ? <span className='badge bg-success'>Pagado</span>
                        : <span className='badge bg-warning'>Pendiente</span>}</td>
                  </tr>))
                }
              </tbody>
            </table>
          </>
          : agreementLoaded?.status == 0
            ? <p className='text-center text-danger'>Has observado el contrato, espere a que el coach lo corrija y se ponga en contacto contigo</p>
            : <div className='d-flex justify-content-center gap-2'>
              <button className='btn btn-sm btn-warning' type='button' onClick={handleObserveContract}>Observar contrato</button>
              <button className='btn btn-sm btn-primary' type='button' onClick={handleAcceptContract}>Aceptar contrato</button>
            </div>
      }
    </AdmintoModal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Acuerdos' >
    <Agreements {...properties} />
  </BaseAdminto>);
})