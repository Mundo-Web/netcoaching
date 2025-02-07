import { Fetch } from "sode-extend-react";
import BasicRest from "./BasicRest";

class NotesRest extends BasicRest {
  path = 'notes'
  hasFiles = true

  bySchedule = async (id) => {
    const { result } = await Fetch(`/api/${this.path}/schedule/${id}`)
    return result.data ?? []
  }
}

export default NotesRest