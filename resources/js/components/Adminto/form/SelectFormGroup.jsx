import React, { useEffect, useRef } from "react"

const SelectFormGroup = ({ id, col, label, eRef, required = false, children, dropdownParent, multiple = false, disabled = false, onChange = () => { },
  templateResult,
  templateSelection,
  minimumResultsForSearch
}) => {

  if (!eRef) eRef = useRef()
  if (!id) id = `select-${crypto.randomUUID()}`

  useEffect(() => {
    $(eRef.current).select2({
      dropdownParent,
      templateResult,
      templateSelection,
      minimumResultsForSearch
    })
    $(eRef.current).on('change', onChange)
  }, [dropdownParent])

  return <div className={`form-group ${col} mb-2`}>
    <label htmlFor={id} className="mb-1 form-label">
      {label} {(label && required) && <b className="text-danger">*</b>}
    </label>
    <select ref={eRef} id={id} required={required} className='form-control' style={{ width: '100%' }} disabled={disabled} multiple={multiple}>
      {children}
    </select>
  </div>
}

export default SelectFormGroup