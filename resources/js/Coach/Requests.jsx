import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import ReactAppend from '@Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import RequestsRest from '../Actions/Coach/RequestsRest';
import Swal from 'sweetalert2';
import { renderToString } from 'react-dom/server';
import Tippy from '@tippyjs/react';
import Modal from '../Components/Coach/Agreements/Modal';

const requestsRest = new RequestsRest

const Requests = () => {

  const gridRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)

  const onDeleteClicked = async (id) => {
    const { value: reason } = await Swal.fire({
      title: 'Rechazar solicitud',
      html: renderToString(<div style={{ fontSize: 'medium' }}>
        <div className="form-group mb-2">
          <label htmlFor="reason-select" style={{ marginBottom: '4px' }}>Razón</label>
          <select id="reason-select" className="form-select" style={{
            width: '100%'
          }}>
            <option value="">Seleccione una razón</option>
            <option value="sin-accion">Contacto sin acción</option>
            <option value="no-contacto">No se pudo contactar</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className='form-group' id="other-reason" style={{ display: 'none' }}>
          <label htmlFor="other-reason-input" style={{ marginBottom: '4px' }}>Especifique</label>
          <textarea id='other-reason-input' className="form-control" placeholder="Especifique la razón" style={{
            minHeight: '27px',
            fieldSizing: 'content'
          }}></textarea>
        </div>
      </div>),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        // Inicializar Select2
        $('#reason-select').select2({
          dropdownParent: $('.swal2-container'),
          width: '100%'
        });

        // Manejar el cambio en el select
        $('#reason-select').on('change', function () {
          const otherInput = $('#other-reason');
          if ($(this).val() === 'otro') {
            otherInput.show();
          } else {
            otherInput.hide();
          }
        });

        // Ajustar estilos de Select2 para que se vea bien dentro de SweetAlert2
        $('.select2-container').css('width', '100%');
      },
      preConfirm: () => {
        const selectedReason = $('#reason-select').val();
        const otherReason = $('#other-reason-input').val();

        if (!selectedReason) {
          Swal.showValidationMessage('Por favor, seleccione una razón');
          return false;
        }

        if (selectedReason === 'otro' && !otherReason.trim()) {
          Swal.showValidationMessage('Por favor, especifique la razón');
          return false;
        }

        return {
          selectedReason,
          otherReason: selectedReason === 'otro' ? otherReason : ''
        };
      }
    });

    if (!reason) return; // El usuario canceló

    let statusMessage;
    switch (reason.selectedReason) {
      case 'sin-accion':
        statusMessage = 'Contacto sin acción';
        break;
      case 'no-contacto':
        statusMessage = 'No se pudo contactar';
        break;
      case 'otro':
        statusMessage = reason.otherReason;
        break;
    }

    const result = await requestsRest.save({
      id: id,
      status: null,
      status_message: statusMessage
    });

    if (!result) return;
    $(gridRef.current).dxDataGrid('instance').refresh();
  }

  return (<>
    <Table gridRef={gridRef} title='Solicitudes' rest={requestsRest}
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
          caption: 'Nombres',
        },
        {
          dataField: 'coachee.lastname',
          caption: 'Apellidos',
        },
        {
          dataField: 'coachee.email',
          caption: 'Correo',
        },
        {
          dataField: 'coachee.phone',
          caption: 'Telefono',
          cellTemplate: (container, { data }) => {
            if (data?.coachee?.phone) {
              container.text(`${data?.coachee?.phone_prefix || '51'}${data?.coachee?.phone || ''}`)
            } else {
              ReactAppend(container, <i className='text-muted'>- Sin telefono -</i>)
            }
          }
        },
        {
          dataField: 'updated_at',
          caption: 'Fecha',
          dataType: 'date',
          cellTemplate: (container, { data }) => {
            container.text(moment(data.updated_at).format('LL'))
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
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
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            if (data.status == 0) {
              container.append(DxButton({
                className: 'btn btn-xs btn-soft-primary',
                title: 'Redactar acuerdo',
                icon: 'fa fas fa-file-signature',
                onClick: () => setDataLoaded({
                  request_id: data.id
                })
              }))
              container.append(DxButton({
                className: 'btn btn-xs btn-soft-danger',
                title: 'Rechazar',
                icon: 'fa fa-times',
                onClick: () => onDeleteClicked(data.id)
              }))
            }
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} onSave={() => $(gridRef.current).dxDataGrid('instance').refresh()} />
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Solicitudes'>
    <Requests {...properties} />
  </BaseAdminto>);
})