import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '@Adminto/Table';
import Modal from '@Adminto/Modal';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '@Adminto/Dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import SlidersRest from '../Actions/Admin/SlidersRest';
import ImageFormGroup from '@Adminto/form/ImageFormGroup';
import Swal from 'sweetalert2';

const slidersRest = new SlidersRest()

const Sliders = () => {

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const imageRef = useRef()
  const primarybtnTextRef = useRef()
  const primarybtnUrlRef = useRef()
  const secondarybtnTextRef = useRef()
  const secondarybtnUrlRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    imageRef.image.src = `/api/sliders/media/${data?.image}`
    primarybtnTextRef.current.value = data?.primarybtn_text ?? ''
    primarybtnUrlRef.current.value = data?.primarybtn_url ?? ''
    secondarybtnTextRef.current.value = data?.secondarybtn_text
    secondarybtnUrlRef.current.value = data?.secondarybtn_url

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const file = imageRef.current.files[0]
    const { full, type } = await File.compress(file, { square: false })

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      primarybtn_text: primarybtnTextRef.current.value,
      primarybtn_url: primarybtnUrlRef.current.value,
      secondarybtn_text: secondarybtnTextRef.current.value,
      secondarybtn_url: secondarybtnUrlRef.current.value,
    }

    const formData = new FormData()
    for (const key in request) {
      formData.append(key, request[key])
    }
    formData.append('image', await File.fromURL(`data:${type};base64,${full}`))

    const result = await slidersRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await slidersRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await slidersRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar slider',
      text: '¿Estas seguro de eliminar este slider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await slidersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Sliders' rest={slidersRest}
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
            text: 'Nuevo slider',
            hint: 'Nuevo slider',
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
          dataField: 'name',
          caption: 'Titulo',
          width: '75%',
        },
        {
          dataField: 'image',
          caption: 'Imagen',
          width: '90px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <img src={`/api/sliders/media/${data.image}`} style={{ width: '80px', height: '48px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} onError={e => e.target.src = '/api/cover/thumbnail/null'} />)
          }
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.visible == 1} onChange={() => onVisibleChange({
              id: data.id,
              value: !data.visible
            })} />)
          }
        },
        // {
        //   dataField: 'status',
        //   caption: 'Estado',
        //   dataType: 'boolean',
        //   cellTemplate: (container, { data }) => {
        //     switch (data.status) {
        //       case 1:
        //         ReactAppend(container, <span className='badge bg-success rounded-pill'>Activo</span>)
        //         break
        //       case 0:
        //         ReactAppend(container, <span className='badge bg-danger rounded-pill'>Inactivo</span>)
        //         break
        //       default:
        //         ReactAppend(container, <span className='badge bg-dark rounded-pill'>Eliminado</span>)
        //         break
        //     }
        //   }
        // },
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar slider' : 'Agregar slider'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='sliders-container'>
        <input ref={idRef} type='hidden' />
        <ImageFormGroup eRef={imageRef} label='Imagen' col='col-12' />
        <TextareaFormGroup eRef={nameRef} label='Titulo' col='col-12' rows={2} required />
        <TextareaFormGroup eRef={descriptionRef} label='Descripción' rows={3} />
        <InputFormGroup eRef={primarybtnTextRef} label='Texto botón primario' col='col-sm-6' required />
        <InputFormGroup eRef={primarybtnUrlRef} label='URL botón primario' col='col-sm-6' required />
        <InputFormGroup eRef={secondarybtnTextRef} label='Texto botón secundario' col='col-sm-6' />
        <InputFormGroup eRef={secondarybtnUrlRef} label='URL botón secundario' col='col-sm-6' />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Sliders'>
    <Sliders {...properties} />
  </BaseAdminto>);
})