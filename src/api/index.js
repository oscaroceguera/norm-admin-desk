import axios from 'axios'

let apiHost = process.env.API_HOST

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
