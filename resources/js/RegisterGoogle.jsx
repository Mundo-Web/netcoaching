import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import JSEncrypt from 'jsencrypt'
import CreateReactScript from './Utils/CreateReactScript'
import SelectFormGroup from '@Adminto/form/SelectFormGroup'
import Modal from '@Adminto/Modal'
import HtmlContent from './Utils/HtmlContent'
import logo from './Svg/logo.svg'
import { GET } from 'sode-extend-react'
import GoogleRest from './actions/GoogleRest'

const googleRest = new GoogleRest()

const Register = ({ PUBLIC_RSA_KEY, terms = 'Terminos y condiciones', roles = [], specialties, session }) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  const [loading, setLoading] = useState(true)

  const roleRef = useRef()
  const specialtyRef = useRef()
  const passwordRef = useRef()
  const confirmationRef = useRef()
  const termsRef = useRef()

  const termsModalRef = useRef();

  const [isCoach, setIsCoach] = useState(true)

  const onRegisterSubmit = async (e) => {
    e.preventDefault()

    const password = passwordRef.current.value
    const confirmation = confirmationRef.current.value

    const request = {
      google_id: GET.google_id,
      role: $(roleRef.current).val(),
      password: jsEncrypt.encrypt(password),
      confirmation: jsEncrypt.encrypt(confirmation),
      terms: termsRef.current.checked,
      specialties: $(specialtyRef.current).val()
    }
    setLoading(true)
    const result = await googleRest.save(request)
    if (!result) return setLoading(false)

    location.href = `/login`;
  }

  useEffect(() => {
    const handleRoleChange = () => {
      const selectedRole = $(roleRef.current).val()
      const roleData = roles.find(role => role.relative_id === selectedRole)
      setIsCoach(roleData?.name === 'Coach')
    }

    $(roleRef.current).on('change', handleRoleChange)
    handleRoleChange()

    return () => {
      $(roleRef.current).off('change', handleRoleChange)
    }
  }, [roles])

  useEffect(() => {
    setLoading(false)
  }, [null])

  return (<>
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="text-center">
              <a href="/">
                <img src={logo} alt="" className="mx-auto" style={{ height: '40px' }} />
              </a>
              <p className="text-muted mt-2 mb-4">Bienvenido a Net Coaching</p>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="text-uppercase mt-0 mb-2 font-bold">¡Perfecto {session.name}!</h4>
                  <p className="">
                    <b>Ya casi terminamos</b>.
                    Solo necesitamos algunos detalles adicionales para personalizar tu experiencia</p>
                </div>
                <form onSubmit={onRegisterSubmit} className='row'>
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-sm-8 mb-2">
                        <label htmlFor="role" className="form-label">¿Qué tipo de usuario eres? <b className="text-danger">*</b></label>
                        <SelectFormGroup eRef={roleRef} required>
                          {
                            roles.map((role, index) => {
                              return <option key={index} value={role.relative_id}>{role.name}</option>
                            })
                          }
                        </SelectFormGroup>
                      </div>
                    </div>
                  </div>

                  <SelectFormGroup
                    label={isCoach ? '¿Cuál es tu especialidad?' : '¿Qué aspectos quieres mejorar en tu vida?'}
                    eRef={specialtyRef}
                    required
                    multiple
                  >
                    {
                      specialties.map((specialty, i) => {
                        return <option key={`specialty-${i}`} value={specialty.id}>{specialty.name}</option>
                      })
                    }
                  </SelectFormGroup>

                  <div className="col-sm-6 mb-2">
                    <label htmlFor="password" className="form-label">Contraseña <b className="text-danger">*</b></label>
                    <input ref={passwordRef} className="form-control" type="password" required id="password"
                      placeholder="Ingrese su contraseña" />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="confirmation" className="form-label">Confirmacion <b className="text-danger">*</b></label>
                    <input ref={confirmationRef} className="form-control" type="password" required id="confirmation"
                      placeholder="Confirme su contraseña" />
                  </div>

                  <div className="col-12 mb-3">
                    <div className="form-check mx-auto" style={{ width: 'max-content' }}>
                      <input ref={termsRef} type="checkbox" className="form-check-input" id="checkbox-signup" required />
                      <label className="form-check-label" htmlFor="checkbox-signup">
                        Acepto los
                        <a
                          href="#terms" className="ms-1 text-blue" onClick={() => $(termsModalRef.current).modal('show')}>
                          términos y condiciones
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="mb-0 text-center d-grid">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? <>
                        <i className='fa fa-spinner fa-spin'></i> Completando registro
                      </> : 'Completar registro'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal modalRef={termsModalRef} title='Términos y condiciones' size='lg' hideFooter>
      <HtmlContent html={terms} />
    </Modal>
  </>)
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Register {...properties} />);
})