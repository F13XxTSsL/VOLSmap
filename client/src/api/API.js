import axios from "axios";
export default  {
  getResponsibleFio (id) {
    axios.get(`http://localhost:3000/contracts/${id}`).then(response => {
      return response.data
    })
  }
}
