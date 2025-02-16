import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "@Adminto/Modal.jsx";
import Table from "@Adminto/Table";
import InputFormGroup from "@Adminto/form/InputFormGroup";
import SelectFormGroup from "@Adminto/form/SelectFormGroup";
import QuillFormGroup from "@Adminto/form/QuillFormGroup";
import CreateReactScript from "@Utils/CreateReactScript";
import BaseAdminto from "@Adminto/Base";
import ReactAppend from "@Utils/ReactAppend";
import DxButton from "@Adminto/Dx/DxButton";
import AdminResourcesRest from "@Rest/Admin/ResourcesRest";
import Swal from "sweetalert2";

const resourcesRest = new AdminResourcesRest()

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

  const onStatusChange = async ({ id, status }) => {
    const result = await resourcesRest.status({ id, status })
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
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'specialty.name',
          caption: 'Recurso',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <>
              <b>{data.specialty.name}</b>
              <span className="d-block text-muted">{data.name}</span>
            </>)
          }
        },
        {
          dataField: 'owner.name',
          caption: 'Coach',
          cellTemplate: (container, { data }) => {
            container.text(`${data.owner.name?.split(' ')?.[0]} ${data.owner.lastname?.split(' ')?.[0]}`)
          }
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
              className: 'btn btn-xs btn-light',
              title: data.status === null ? 'Restaurar' : 'Cambiar estado',
              icon: data.status === 1 ? 'fa fa-toggle-on text-success' : data.status === 0 ? 'fa fa-toggle-off text-danger' : 'fas fa-trash-restore',
              onClick: () => onStatusChange(data)
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
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Recursos'>
    <Resources {...properties} />
  </BaseAdminto>);
})