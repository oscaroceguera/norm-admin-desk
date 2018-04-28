import axios from 'axios'

let apiHost = 'http://localhost:5000/api'

if (process.env.NODE_ENV === 'production') {
  apiHost = 'https://blooming-ravine-18324.herokuapp.com/api'
}

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
