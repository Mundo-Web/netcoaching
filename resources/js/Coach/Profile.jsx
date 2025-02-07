import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ProfileRest from '../Actions/ProfileRest';
import SelectFormGroup from '../Components/Adminto/form/SelectFormGroup';
import TextareaFormGroup from '../Components/Adminto/form/TextareaFormGroup';
import QuillFormGroup from '../Components/Adminto/form/QuillFormGroup';
import CoverRest from '../Actions/CoverRest';
import Base from '../Components/Adminto/Base';

const coverRest = new CoverRest()

const Profile = (props) => {

  const { countries } = props

  const nameRef = useRef()
  const lastnameRef = useRef()
  const dniRef = useRef()
  const phoneRef = useRef()
  const videoRef = useRef()
  const titleRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const addressRef = useRef()
  const summaryRef = useRef()
  const descriptionRef = useRef()

  const [session, setSession] = useState(props.session)

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const request = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      dni: dniRef.current.value,
      phone: phoneRef.current.value,
      video: videoRef.current.value,
      title: titleRef.current.value,
      country: countryRef.current.value,
      city: cityRef.current.value,
      address: addressRef.current.value,
      summary: summaryRef.current.value,
      description: descriptionRef.current.value
    }

    const result = await ProfileRest.save(request)

    if (!result) return

    const newSession = structuredClone(session)
    newSession.name = request.name
    newSession.lastname = request.lastname
    newSession.birthdate = request.birthdate
    setSession(newSession)
  }

  const onProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await ProfileRest.saveProfile(file, false)
    if (!result) return

    const newSession = structuredClone(session)
    newSession.uuid = result.uuid
    setSession(newSession)
  }

  const onCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await coverRest.saveCover(file)
    if (!result) return

    const newSession = structuredClone(session)
    newSession.uuid = result.uuid
    setSession(newSession)
  }

  return <>
    <div className='row justify-content-center align-items-center' style={{ minHeight: 'calc(100vh - 135px)' }}>
      <div className='col-xl-8 col-lg-9 col-md-10 col-sm-11 col-xs-12'>
        <form className='card' onSubmit={onFormSubmit}>
          <div className='card-header'>
            <h4 className='card-title mb-0'>Perfil</h4>
          </div>
          <div className='card-body'>
            <div className="row">
              <div className="col-sm-4 col-xs-12 position-relative">
                <Tippy content='Cambiar portada' arrow={true}>
                  <label htmlFor='cover' className='ratio ratio-21x9' style={{ cursor: 'pointer' }}>
                    <input className='d-none' type='file' name='cover' id='cover' accept='image/*' onChange={onCoverChange} />
                    <img src={`/api/cover/${session.uuid}?v=${crypto.randomUUID()}`} alt={`Perfil de ${session.name} ${session.lastname}`} style={{ width: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px' }} />
                  </label>
                </Tippy>
                <Tippy content='Cambiar foto de perfil' arrow={true}>
                  <label htmlFor='avatar' className='rounded-circle mx-auto d-block position-relative' style={{ cursor: 'pointer', width: 'max-content', marginTop: '-48px' }}>
                    <input className='d-none' type='file' name='avatar' id='avatar' accept='image/*' onChange={onProfileChange} />
                    <img className='avatar-xl rounded-circle bg-white' src={`/api/profile/${session.uuid}?v=${crypto.randomUUID()}`} alt={`Perfil de ${session.name} ${session.lastname}`} style={{ objectFit: 'cover', objectPosition: 'center' }} />
                  </label>
                </Tippy>
                <ul className="social-list list-inline mt-3 mb-0">
                  <li className="list-inline-item">
                    <a href="#" className="social-list-item border-purple text-purple"><i className="fab fa-facebook-f"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-8 col-xs-12">
                <div className='row'>
                  <InputFormGroup eRef={nameRef} label='Nombres' value={session.name} required col='col-md-6 col-sm-12' />
                  <InputFormGroup eRef={lastnameRef} label='Apellidos' value={session.lastname} required col='col-md-6 col-sm-12' />
                  <InputFormGroup eRef={dniRef} label='DNI' value={session.dni} required col='col-md-6 col-sm-12' />
                  <InputFormGroup eRef={phoneRef} label='Telefono' value={session.phone} col='col-md-6 col-sm-12' />
                  <InputFormGroup eRef={videoRef} label='Video de YouTube' value={`https://youtu.be/${session.video}`} />
                  <InputFormGroup eRef={titleRef} label='Titulo' value={session.title} col='col-md-6 col-sm-12' required />
                  <SelectFormGroup eRef={countryRef} label='Pais' value={session.country} col='col-md-6 col-sm-12' required>
                    {countries.map((country, i) => <option key={`country-${i}`} value={country.id} selected={country.id == session.country}>{country.name}</option>)}
                  </SelectFormGroup>
                  <InputFormGroup eRef={cityRef} label='Ciudad' value={session.city} col='col-md-6 col-sm-12' required />
                  <InputFormGroup eRef={addressRef} label='Direccion' value={session.address} col='col-md-6 col-sm-12' />
                  <TextareaFormGroup eRef={summaryRef} label='Resumen' col='col-12' value={session.summary} />
                  <QuillFormGroup eRef={descriptionRef} label='Descripcion' col='col-12' value={session.description} height='240px' required />
                </div>
                <div className='text-center'>
                  <button className='btn btn-primary btn-block' type='submit'>
                    <i className='fa fa-save'></i> Actualizar
                  </button>
                </div>
                <hr className='mt-3 mb-2' />
                <p className='card-text text-center'>
                  <small className='text-muted'>Ultima actualizacion {moment(session.updated_at).fromNow()}</small>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties} title='Perfil de usuario'>
    <Profile {...properties} />
  </Base>);
})