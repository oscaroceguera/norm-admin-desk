import axios from 'axios'

const HOST = 'http://localhost:5000/api'

export const api = {
  get: (url) => {
    return axios
      .get(`${HOST}/${url}`)
      .then(res => res.data)
  },
  post: (url, data) => {
    return axios
      .post(`${HOST}/${url}`, data)
      .then(res => res.data)
  },
  put: (url, data) => {
    return axios
      .patch(`${HOST}/${url}`, data)
      .then(res => res.data)
  },
  delete: (url) => {
    return axios
      .delete(`${HOST}/${url}`)
      .then(res => res.data)
  }
}
