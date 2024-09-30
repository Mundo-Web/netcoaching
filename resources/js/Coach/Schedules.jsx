import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '@Adminto/Table';
import Modal from '@Adminto/Modal';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import ReactAppend from '@Utils/ReactAppend';
import SelectFormGroup from '@Adminto/form/SelectFormGroup';
import QuillFormGroup from '@Adminto/form/QuillFormGroup';
import DxButton from '@Adminto/Dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SchedulesRest from '../Actions/Coach/SchedulesRest';

const schedulesRest = new SchedulesRest()

const Resources = ({ specialties }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const sessionDateRef = useRef()
  // const tagsRef = useRef()
  // const specialtyRef = useRef()
  // const socialMediaRef = useRef()
  // const mediaIdRef = useRef()
  // const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    sessionDateRef.current.value = data?.session_date ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      session_date: sessionDateRef.current.value,
    }

    const result = await schedulesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await schedulesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar recurso',
      text: '¿Estas seguro de eliminar este recurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await schedulesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Horarios' rest={schedulesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            text: 'Nuevo registro',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
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
          dataField: 'specialty.name',
          caption: 'Especialidad',
        },
        {
          dataField: 'name',
          caption: 'Titulo'
        },
        {
          dataField: 'id',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            if (data.social_media == 'youtube') {
              ReactAppend(container, <img src={`https://i.ytimg.com/vi/${data.media_id}/hqdefault.jpg`} style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />)
            } else {
              ReactAppend(container, <img src='/api/cover/thumbnail/null' style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />)
            }
          }
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            switch (data.status) {
              case 1:
                ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
                break
              case 0:
                ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
                break
              default:
                ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
                break
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar recurso' : 'Agregar recurso'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='resources-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={sessionDateRef} label='Fecha sesión' col='col-12' type='date' required />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Horarios'>
    <Resources {...properties} />
  </BaseAdminto>);
})