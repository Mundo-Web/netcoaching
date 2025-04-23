import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import CreateReactScript from './Utils/CreateReactScript'
import { Link } from '@inertiajs/react'
import logo from './Svg/logo.svg'
import Global from './Utils/Global'
import AuthRest from './actions/AuthRest'
import Swal from 'sweetalert2'

const Recovery = ({ }) => {
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()

  document.title = `Recuperar contraseña | ${Global.APP_NAME}`

  const onRecoverySubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const request = {
      email: emailRef.current.value
    }

    const result = await AuthRest.recovery(request)
    console.log(result)
    if (!result) return setLoading(false)

    Swal.fire({
      icon: 'success',
      title: '¡Revisa tu correo!',
      html: `
        <p>Te hemos enviado un email con las instrucciones para recuperar tu contraseña.</p>
        <p class="text-muted mt-2">Asegúrate de revisar también tu carpeta de spam.</p>
      `,
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: 'Volver al login',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
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
                    <h4 className="text-uppercase mt-0 font-bold">Recupera tu contraseña</h4>
                  </div>
                  <form onSubmit={onRecoverySubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Correo electrónico
                        <b className='text-danger ms-1'>*</b>
                      </label>
                      <input
                        ref={emailRef}
                        className="form-control"
                        type="email"
                        id="email"
                        required
                        placeholder="Ingresa el email con el que te registraste"
                      />
                    </div>
                    <div className="d-grid text-center">
                      <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <i className='fa fa-spinner fa-spin'></i> Enviando...
                          </>
                        ) : 'Enviar'}
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
  createRoot(el).render(<Recovery {...properties} />)
})