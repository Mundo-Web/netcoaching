import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "@Adminto/Modal.jsx";
import Table from "@Adminto/Table";
import InputFormGroup from "@Adminto/form/InputFormGroup";
import SelectAPIFormGroup from "@Adminto/Form/SelectAPIFormGroup";
import PasswordFormGroup from "@Adminto/Form/PasswordFormGroup";
import CreateReactScript from "@Utils/CreateReactScript";
import SetSelectValue from "@Utils/SetSelectValue";
import BaseAdminto from "@Adminto/Base";
import JSEncrypt from "jsencrypt";
import Global from "@Utils/Global";
import AdminCoachesRest from "@Rest/Admin/CoachesRest";
import ReactAppend from "@Utils/ReactAppend";
import DxButton from "@Adminto/Dx/DxButton";

const coachesRest = new AdminCoachesRest();

const Coaches = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const rolesRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(Global.PUBLIC_RSA_KEY)

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = async (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    const roles = await RolesRest.byUser(data?.id)

    idRef.current.value = data?.id || null
    nameRef.current.value = data?.name || null
    lastnameRef.current.value = data?.lastname || null
    emailRef.current.value = data?.email || null
    SetSelectValue(rolesRef.current, roles, 'id', 'name')
    passwordRef.current.value = null
    confirmRef.current.value = null

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const password = passwordRef.current.value
    const confirm = confirmRef.current.value

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      roles: $(rolesRef.current).val(),
      password: password ? jsEncrypt.encrypt(password) : undefined,
      confirm: confirm ? jsEncrypt.encrypt(confirm) : undefined
    }

    const result = await coachesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await coachesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const result = await coachesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Coaches' rest={coachesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        // container.unshift({
        //   widget: 'dxButton', location: 'after',
        //   options: {
        //     icon: 'plus',
        //     hint: 'Nuevo registro',
        //     onClick: () => onModalOpen()
        //   }
        // });
      }}
      pageSize={20}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          dataType: 'number',
          sortOrder: 'asc',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Nombres'
        },
        {
          dataField: 'lastname',
          caption: 'Apellidos'
        },
        {
          dataField: 'email',
          caption: 'Correo',
          dataType: 'email'
        },
        {
          dataField: 'resources_count',
          caption: 'Recursos',
          dataType: 'number',
          allowFiltering: false,
          cellTemplate: (container, { data, value }) => {
            container.text(value == 1 ? '1 recurso' : `${value} recursos`)
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
              className: 'btn btn-xs btn-light',
              title: data.status === null ? 'Restaurar' : 'Cambiar estado',
              icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
              onClick: () => onStatusChange(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash-alt',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit}>
      <div className='row' id='users-crud-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombres' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellidos' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Correo' col='col-12' type='email' required />
        <SelectAPIFormGroup eRef={rolesRef} label='Asignar roles' col='col-12' dropdownParent='#users-crud-container' searchAPI='/api/roles/paginate' searchBy='name' required multiple />
        <PasswordFormGroup eRef={passwordRef} label='Contraseña' col='col-md-6' required={!isEditing} />
        <PasswordFormGroup eRef={confirmRef} label='Repetir contraseña' col='col-md-6' required={!isEditing} />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Coaches'>
    <Coaches {...properties} />
  </BaseAdminto>);
})