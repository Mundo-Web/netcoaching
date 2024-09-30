
import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript'
import ReactAppend from './Utils/ReactAppend'
import SetQuillValue from './Utils/SetQuillValue'
import SettingsRest from './actions/SettingsRest'
import BaseAdminto from '@Adminto/Base'
import Modal from '@Adminto/Modal'
import Table from '@Adminto/Table'
import InputFormGroup from '@Adminto/form/InputFormGroup'
import QuillFormGroup from '@Adminto/form/QuillFormGroup'
import TippyButton from '@Adminto/form/TippyButton'

const Settings = ({ can }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  // const typeRef = useRef()
  const nameRef = useRef()
  const valueRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    // SetSelectValue(typeRef.current, data?.table?.id, data?.table?.name)
    nameRef.current.value = data?.name || null
    SetQuillValue(valueRef.editor, data?.value || null)
    descriptionRef.current.value = data?.description || null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      // type: typeRef.current.value,
      name: nameRef.current.value,
      value: valueRef.current.value,
      description: descriptionRef.current.value,
    }

    const result = await SettingsRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await SettingsRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await SettingsRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Configuracion' rest={SettingsRest}
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
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc'
        },
        {
          dataField: 'name',
          caption: 'Estado de tabla'
        },
        {
          dataField: 'description',
          caption: 'Descripcion',
          cellTemplate: (container, { value }) => {
            if (!value) ReactAppend(container, <i className='text-muted'>- Sin descripcion -</i>)
            else ReactAppend(container, value)
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            can('settings', 'root', 'all', 'update') && ReactAppend(container, <TippyButton className='btn btn-xs btn-soft-primary' title='Editar' onClick={() => onModalOpen(data)}>
              <i className='fa fa-pen'></i>
            </TippyButton>)
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar configuracion' : 'Agregar configuracion'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='settings-crud-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Alias' col='col-12' required />
        <InputFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' />
        <QuillFormGroup eRef={valueRef} label='Valor' col='col-12' theme='bubble' required />
      </div>
    </Modal>
  </>
  )
};

CreateReactScript((el, properties) => {
  if (!properties.can('settings', 'root', 'all', 'list')) return location.href = '/';
  createRoot(el).render(
    <BaseAdminto {...properties} title='Constantes de configuracion'>
      <Settings {...properties} />
    </BaseAdminto>
  );
})