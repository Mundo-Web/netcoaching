import React, { useEffect, useRef } from "react"

const ImageFormGroup = ({ id, col, label, eRef, required = false, onChange = () => { }, aspect = '21/9' }) => {

  if (!id) id = `ck-${crypto.randomUUID()}`
  if (!eRef) eRef = useRef()

  const imageRef = useRef()

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const max = 1000;
          let { width, height } = img;

          if (width > height) {
            if (width > max) {
              height *= max / width;
              width = max;
            }
          } else {
            if (height > max) {
              width *= max / height;
              height = max;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0]
    const resizedFile = await resizeImage(file);
    const url = await File.toURL(resizedFile)
    imageRef.current.src = url
    imageRef.files = [resizedFile]
    onChange(e)
  }

  useEffect(() => {
    eRef.image = imageRef.current
  }, [null])

  return <div className={`form-group ${col} mb-2`}>
    <label htmlFor={id} className="mb-1">
      {label} {required && <b className="text-danger">*</b>}
    </label>
    <label htmlFor={id} style={{ width: '100%' }}>
      <img ref={imageRef} className="d-block" src="" alt="aspect-video" onError={e => e.target.src = '/api/cover/thumbnail/null'} style={{
        width: '100%',
        borderRadius: '4px',
        cursor: 'pointer',
        aspectRatio: aspect,
        objectFit: 'cover',
        objectPosition: 'center'
      }} />
    </label>
    <input ref={eRef} id={id} type="file" src="" alt="" hidden accept="image/*" onChange={onImageChange} />
  </div>
}

export default ImageFormGroup