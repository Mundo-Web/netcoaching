import Tippy from "@tippyjs/react";
import React, { useEffect, useRef, useState } from "react";
import { Clipboard } from "sode-extend-react";

const FileFormGroup = ({ id, col, label, eRef, required = false, onChange = () => { }, multiple }) => {
  const [files, setFiles] = useState([]); // Estado local para manejar archivos

  const uuid = crypto.randomUUID()
  if (!id) id = `ff-${uuid}`
  const labelId = `lbl-${uuid}`
  if (!eRef) eRef = useRef()

  eRef.setFiles = (files) => setFiles(files)

  const fileRef = useRef()

  const onDropFiles = async (newFiles) => {
    if (multiple) {
      setFiles(old => [
        ...old.filter(a => !newFiles.find(b => a.name == b.name)),
        ...newFiles
      ]);
    } else {
      setFiles(newFiles)
    }
  }

  useEffect(() => {
    eRef.image = fileRef.current
    const element = document.getElementById(labelId)
    Clipboard.paste(element, (files) => {
      if (!files || files?.length == 0) return
      onDropFiles(multiple ? files : [files[0]])
    })
  }, [null])

  useEffect(() => {
    onChange(files);
    eRef.files = files
  }, [files]);

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
    }} className="d-flex align-items-center justify-content-center">
      <span className="d-block text-muted">- Arrastra o sube tus archivos aqui -</span>
    </label>
    <input ref={eRef} id={id} type="file" hidden onChange={e => onDropFiles([...e.target.files])} multiple={multiple} />
    <div className="d-flex flex-column gap-1 mt-2">
      {
        files.map((file, index) => {
          return <div key={index} className="btn-group">
            <button className="btn btn-sm btn-dark text-start text-truncate w-100" type="button">
              <i className={`mdi ${file.type.startsWith('image') ? 'mdi-image' : 'mdi-file'} me-1`}></i>
              {file.name}
            </button>
            <Tippy content='Quitar adjunto'>
              <button className="btn btn-sm btn-danger" type="button" onClick={() => setFiles(old => old.filter(x => x.name != file.name))}>
                <i className="mdi mdi-delete"></i>
              </button>
            </Tippy>
          </div>
        })
      }
    </div>
  </div>
}

export default FileFormGroup