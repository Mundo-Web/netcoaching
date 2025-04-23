import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import CreateReactScript from './Utils/CreateReactScript'
import { Link } from '@inertiajs/react'
import logo from './Svg/logo.svg'
import Global from './Utils/Global'
import AuthRest from './actions/AuthRest'
import Swal from 'sweetalert2'
import JSEncrypt from 'jsencrypt'

const ResetPassword = ({ name, email, recovery_token, PUBLIC_RSA_KEY }) => {
  const [loading, setLoading] = useState(false)
  const passwordRef = useRef()
  const confirmationRef = useRef()

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  document.title = `Restablecer contraseña | ${Global.APP_NAME}`

  const onResetSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const password = passwordRef.current.value
    const confirmation = confirmationRef.current.value

    if (password !== confirmation) {
      setLoading(false)
      return Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
    }

    const request = {
      recovery_token,
      password: jsEncrypt.encrypt(password),
      confirmation: jsEncrypt.encrypt(confirmation)
    }

    const result = await AuthRest.reset(request)
    if (!result) return setLoading(false)

    Swal.fire({
      icon: 'success',
      title: '¡Contraseña actualizada!',
      text: 'Tu contraseña ha sido actualizada correctamente.',
      showConfirmButton: true,
      confirmButtonText: 'Iniciar sesión',
      allowOutsideClick: false,
      willClose: () => {
        location.href = '/login'
      }
    })
  }

  return (
    <>
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="text-center">
                <Link href="/">
                  <img src={logo} alt="" className="mx-auto" style={{ height: '40px' }} />
                </Link>
                <p className="text-muted mt-2 mb-4">Bienvenido a {Global.APP_NAME}</p>
              </div>
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0 mb-2 font-bold">¡Perfecto {name}!</h4>
                    <p>Ahora ingresa una nueva contraseña para restablecerla.</p>
                  </div>
                  <form onSubmit={onResetSubmit}>
                    <div className="mb-2">
                      <label htmlFor="password" className="form-label">
                        Correo electrónico
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="password"
                        disabled
                        readOnly
                        defaultValue={email}
                        placeholder="Ingresa tu nueva contraseña"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="password" className="form-label">
                        Nueva contraseña
                        <b className='text-danger ms-1'>*</b>
                      </label>
                      <input
                        ref={passwordRef}
                        className="form-control"
                        type="password"
                        id="password"
                        required
                        placeholder="Ingresa tu nueva contraseña"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="confirmation" className="form-label">
                        Confirmar contraseña
                        <b className='text-danger ms-1'>*</b>
                      </label>
                      <input
                        ref={confirmationRef}
                        className="form-control"
                        type="password"
                        id="confirmation"
                        required
                        placeholder="Confirma tu nueva contraseña"
                      />
                    </div>
                    <div className="d-grid text-center">
                      <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <i className='fa fa-spinner fa-spin'></i> Actualizando...
                          </>
                        ) : 'Actualizar contraseña'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Recordaste tu contraseña?
                    <Link href="/login" className="text-white ms-1">
                      <b>Iniciar sesión</b>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<ResetPassword {...properties} />)
})