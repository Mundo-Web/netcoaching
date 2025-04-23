import { Fetch, Notify } from "sode-extend-react"

class AuthRest {
  static login = async (request) => {
    try {

      const { status, result } = await Fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al iniciar sesion')

      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Operacion correcta',
        body: 'Se inicio sesion correctamente'
      })

      return result
    } catch (error) {
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Error',
        body: error.message,
        type: 'danger',
        timeout: 99999999999999999
      })
      return false
    }
  }

  static signup = async (request) => {
    try {

      const { status, result } = await Fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al registrar el usuario')

      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Operacion correcta',
        body: 'Se registro el usuario correctamente'
      })

      return result.data
    } catch (error) {
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return null
    }
  }

  static recovery = async (request) => {
    try {
      const { status, result } = await Fetch('/api/recovery', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al recuperar la contraseña')
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Operacion correcta',
        body: 'Se envio el correo de recuperacion correctamente'
      })
      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return false
    }
  }

  static reset = async (request) => {
    try {
      const { status, result } = await Fetch('/api/reset', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al recuperar la contraseña')
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Operacion correcta',
        body: 'Se cambio la contraseña correctamente'
      })
      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/icon.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return false
    }
  }
}

export default AuthRest