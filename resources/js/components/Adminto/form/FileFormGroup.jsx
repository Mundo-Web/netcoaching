import React, { useEffect, useRef, useState } from "react";
import { Clipboard } from "sode-extend-react";

const FileFormGroup = ({ id, col, label, eRef, required = false, onChange = () => { }, multiple }) => {
  const [files, setFiles] = useState([]); // Estado local para manejar archivos

  const uuid = crypto.randomUUID()
  if (!id) id = `ff-${uuid}`
  const labelId = `lbl-${uuid}`
  if (!eRef) eRef = useRef()

  const imageRef = useRef()

  const onDropFiles = async (files) => {
    setFiles(files); // Actualiza el estado local con los archivos
    onChange(files); // Llama a la función onChange con los archivos
  }

  useEffect(() => {
    eRef.image = imageRef.current
    const element = document.getElementById(labelId)
    Clipboard.paste(element, (files) => {
      console.log(files)
    })
  }, [null])

  return <div className={`form-group ${col} mb-2`}>
    <label htmlFor={id} className="mb-1 form-label d-block">
      {label} {required && <b className="text-danger">*</b>}
    </label>
    <label id={labelId} htmlFor={id} style={{
      width: '100%',
      height: '80px',
      border: '1px dashed #ced4da',
      borderRadius: '0.2rem',
      cursor: 'pointer'
    }} className="d-flex align-items-center justify-content-center" onDropCapture={e => {
      e.preventDefault();
      if (e.dataTransfer.items) {
        var items = [...e.dataTransfer.items];
        if (items.length == 0) {
          onDropFiles([]);
          return;
        }
        items = items.filter((item) => item.kind === "file");
        if (items.length == 0) {
          onDropFiles([]);
          return;
        }
        onDropFiles(items.map((item) => item.getAsFile()));
      }
    }}>
      <span className="d-block text-muted">- Arrastra o sube tus archivos aqui -</span>
    </label>
    <input ref={eRef} id={id} type="file" hidden onChange={e => onDropFiles([...e.target.files])} multiple={multiple} />
    <div className="d-flex flex-column gap-1 mt-2">
      {
        files.map(file => {
          return <button className="btn btn-block btn-sm btn-dark text-start text-truncate">
            <i className={`mdi ${file.type.startsWith('image') ? 'mdi-image' : 'mdi-file'} me-1`}></i>
            {file.name}
          </button>
        })
      }
    </div>
  </div>
}

export default FileFormGroup