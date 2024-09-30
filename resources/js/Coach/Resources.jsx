import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import ResourcesRest from '../Actions/Coach/ResourcesRest';
import Table from '@Adminto/Table';
import Modal from '@Adminto/Modal';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import ReactAppend from '@Utils/ReactAppend';
import SelectFormGroup from '@Adminto/form/SelectFormGroup';
import QuillFormGroup from '@Adminto/form/QuillFormGroup';
import DxButton from '@Adminto/Dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';

const resourcesRest = new ResourcesRest()

const Resources = ({ specialties }) => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const tagsRef = useRef()
  const specialtyRef = useRef()
  const socialMediaRef = useRef()
  const mediaIdRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    tagsRef.current.value = data?.tags ?? ''
    $(specialtyRef).val(data?.specialty_id ?? '').trigger('change')
    $(socialMediaRef).val(data?.social_media ?? '').trigger('change')
    if (data?.social_media == 'youtube' && data?.media_id) {
      mediaIdRef.current.value = `https://youtu.be/${data?.media_id}`
    } else {
      mediaIdRef.current.value = data?.media_id ?? ''
    }
    descriptionRef.editor.root.innerHTML = data?.description ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      tags: tagsRef.current.value,
      specialty_id: specialtyRef.current.value,
      social_media: socialMediaRef.current.value,
      media_id: mediaIdRef.current.value,
      description: descriptionRef.current.value,
    }

    const result = await resourcesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await statusesRest.status({ id, status })
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
    const result = await resourcesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Recursos' rest={resourcesRest}
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
            text: 'Nuevo recurso',
            hint: 'Nuevo recurso',
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
        <InputFormGroup eRef={nameRef} label='Titulo' col='col-12' required />
        <InputFormGroup eRef={tagsRef} label='Tags (Separado por comas)' col='col-12' required />
        <SelectFormGroup eRef={specialtyRef} label="Especialidad" dropdownParent='#resources-container' required>
          {
            specialties.map((specialty, i) => {
              return <option key={`specialty-${i}`} value={specialty.id}>{specialty.name}</option>
            })
          }
        </SelectFormGroup>
        <SelectFormGroup eRef={socialMediaRef} label="Red social" dropdownParent='#resources-container' required>
          <option value="youtube">YouTube</option>
          <option value="facebook">Facebook</option>
        </SelectFormGroup>
        <TextareaFormGroup eRef={mediaIdRef} label='Link del recurso' col='col-12' rows={1} required />
        <QuillFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' height='240px' required />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Recursos'>
    <Resources {...properties} />
  </BaseAdminto>);
})