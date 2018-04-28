import axios from 'axios'

const apiHost = process.env.API_HOST || 'http://localhost:5000/api'
console.log('apiHost', apiHost)
export const api = {
  get: (url) => {
    return axios
      .get(`${apiHost}/${url}`)
      .then(res => res.data)
  },
  post: (url, data) => {
    return axios
      .post(`${apiHost}/${url}`, data)
      .then(res => res.data)
  },
  put: (url, data) => {
    return axios
      .patch(`${apiHost}/${url}`, data)
      .then(res => res.data)
  },
  delete: (url) => {
    return axios
      .delete(`${apiHost}/${url}`)
      .then(res => res.data)
  }
}
