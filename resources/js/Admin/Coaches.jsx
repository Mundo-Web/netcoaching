import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "@Adminto/Modal.jsx";
import Table from "@Adminto/Table";
import InputFormGroup from "@Adminto/form/InputFormGroup";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import SelectFormGroup from "@Adminto/form/SelectFormGroup";
import PasswordFormGroup from "@Adminto/Form/PasswordFormGroup";
import QuillFormGroup from '@Adminto/form/QuillFormGroup';
import CreateReactScript from "@Utils/CreateReactScript";
import BaseAdminto from "@Adminto/Base";
import JSEncrypt from "jsencrypt";
import Global from "@Utils/Global";
import AdminCoachesRest from "@Rest/Admin/CoachesRest";
import ReactAppend from "@Utils/ReactAppend";
import DxButton from "@Adminto/Dx/DxButton";
import Swal from "sweetalert2";
import Tippy from "@tippyjs/react";

const coachesRest = new AdminCoachesRest();

const Coaches = ({ countries = [] }) => {
  const gridRef = useRef()
  const modalRef = useRef()
  const pwdModalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const dniRef = useRef()
  const phonePrefixRef = useRef()
  const phoneRef = useRef()
  const videoRef = useRef()
  const titleRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const addressRef = useRef()
  const summaryRef = useRef()
  const descriptionRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  const priceRef = useRef()
  const experienceRef = useRef()

  const pwdIdRef = useRef()
  const pwdPasswordRef = useRef()

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(Global.PUBLIC_RSA_KEY)

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = async (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id || null
    nameRef.current.value = data?.name || null
    lastnameRef.current.value = data?.lastname || null
    dniRef.current.value = data?.dni || null
    emailRef.current.textContent = data?.email || null
    phonePrefixRef.current.value = data?.phone_prefix || null
    phoneRef.current.value = data?.phone || null
    videoRef.current.value = data?.video ? `https://youtu.be/${data?.video}` : ''
    titleRef.current.value = data?.title || null
    $(countryRef.current).val(data?.country || '89').trigger('change')
    cityRef.current.value = data?.city || null
    addressRef.current.value = data?.address || null
    summaryRef.current.value = data?.summary || null
    descriptionRef.current.value = data?.description || null
    descriptionRef.editor.setHTML(data?.description || 'Agrega una descripción')
    priceRef.current.value = data?.price || null
    experienceRef.current.value = data?.experience || null

    $(modalRef.current).modal('show')
  }

  const onPwdModalOpen = (data) => {
    pwdIdRef.current.value = data?.id || null
    pwdPasswordRef.current.value = null
    $(pwdModalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      dni: dniRef.current.value,
      phone_prefix: phonePrefixRef.current.value,
      phone: phoneRef.current.value,
      video: videoRef.current.value,
      title: titleRef.current.value,
      country: countryRef.current.value,
      city: cityRef.current.value,
      address: addressRef.current.value,
      summary: summaryRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      experience: experienceRef.current.value
    }

    const result = await coachesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onPwdModalSubmit = async (e) => {
    e.preventDefault()

    const password = pwdPasswordRef.current.value

    const request = {
      id: pwdIdRef.current.value,
      password
    }

    const result = await coachesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(pwdModalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, status }) => {
    const result = await coachesRest.status({ id, status })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const isConfirmed = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await coachesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const handleRatingClick = async (userId, newScore) => {
    const result = await coachesRest.save({
      id: userId,
      score: newScore
    });
    if (result) {
      $(gridRef.current).dxDataGrid('instance').refresh();
    }
  };

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
          caption: 'Correo'
        },
        {
          dataField: 'price',
          caption: 'Precio',
          dataType: 'number'
        },
        {
          dataField: 'experience',
          caption: 'Años de experiencia',
          dataType: 'number'
        },
        {
          dataField: 'score',
          caption: 'Calificacion',
          dataType: 'number',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <>
              {[1, 2, 3, 4, 5].map((star) => (<Tippy key={star} content={`${star} estrellas`}><i
                key={star}
                className={`mdi mdi-18px mdi-star${star <= data.score ? '' : '-outline'}`}
                style={{ color: star <= data.score ? '#05455A' : '#6c757d', cursor: 'pointer' }}
                onClick={() => handleRatingClick(data.id, star)}
              ></i></Tippy>))}
            </>)
          }
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
              className: 'btn btn-xs btn-soft-primary',
              title: 'Modificar datos',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Restablecer contraseña',
              icon: 'fa fa-key',
              onClick: () => onPwdModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-light',
              title: data.status === null ? 'Restaurar' : 'Cambiar estado',
              icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
              onClick: () => onStatusChange(data)
            }))
            data.status != null && container.append(DxButton({
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar coach' : 'Agregar coach'} onSubmit={onModalSubmit}>
      <div className='row' id='users-crud-container'>
        <input ref={idRef} type='hidden' />
        <div className="mb-2">
          Estás editando datos de: <b ref={emailRef}></b>
        </div>
        <InputFormGroup eRef={nameRef} label='Nombres' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellidos' col='col-md-6' required />
        <InputFormGroup eRef={dniRef} label='DNI' col='col-md-4' required />
        <SelectFormGroup eRef={phonePrefixRef} label='Prefijo' col='col-md-4' />
        <InputFormGroup eRef={phoneRef} label='Teléfono' col='col-md-4' />
        <InputFormGroup eRef={videoRef} label='Video de YouTube' col='col-md-12' />
        <InputFormGroup eRef={titleRef} label='Título' col='col-md-6' required />
        <SelectFormGroup eRef={countryRef} label='Pais' col='col-md-6 col-sm-12' dropdownParent='#users-crud-container' required>
          {countries.map((country, i) => <option key={`country-${i}`} value={country.id}>{country.name}</option>)}
        </SelectFormGroup>
        <InputFormGroup eRef={cityRef} label='Ciudad' col='col-md-6' required />
        <InputFormGroup eRef={addressRef} label='Dirección' col='col-md-6' />
        <InputFormGroup eRef={priceRef} label='Precio' col='col-md-6' type="number" required />
        <InputFormGroup eRef={experienceRef} label='Años de experiencia' col='col-md-6' type="number" required />
        
        <TextareaFormGroup eRef={summaryRef} label='Resumen' col='col-12' />
        <QuillFormGroup eRef={descriptionRef} label='Descripción' col='col-12' required />
      </div>
    </Modal>

    <Modal modalRef={pwdModalRef} title='Restablecer contraseña' onSubmit={onPwdModalSubmit} size='sm'>
      <input ref={pwdIdRef} type='hidden' />
      <PasswordFormGroup eRef={pwdPasswordRef} label='Ingrese nueva contraseña' />
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Coaches'>
    <Coaches {...properties} />
  </BaseAdminto>);
})