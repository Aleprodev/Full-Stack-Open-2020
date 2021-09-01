import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl);

const create = newObject => {
  return axios.post(baseUrl, newObject)
};

const delNum = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const numberServices = { getAll, create, delNum, update }

export default numberServices;