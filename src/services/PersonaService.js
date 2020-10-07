import axios from "axios";

export class PersonaService {
  baseUrl = "http://localhost:8080/persona/";
  getAll() {
    return axios.get(this.baseUrl + "allPerson").then((res) => res.data);
  }

  savePerson(persona) {
    return axios
      .post(this.baseUrl + "savePerson", persona)
      .then((res) => res.data);
  }

  deletePer(idPersona) {
    return axios
      .delete(this.baseUrl + "deletePerson/" + idPersona)
      .then((res) => res.data);
  }
}
