import { Fetch, Notify } from "sode-extend-react";
import BasicRest from "../BasicRest";

class AgreementsRest extends BasicRest {
  path = 'coach/agreements'

  code = async () => {
    try {
      const { status, result } = await Fetch(`/api/${this.path}/code`)
      if (!status) throw new Error(result?.message ?? 'Ocurrio un error inesperado')
      return result.data
    } catch (error) {
      Notify.add({
        icon: '/assets/img/logo-login.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })

      return null
    }
  }
}

export default AgreementsRest