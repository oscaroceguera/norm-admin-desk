import axios from 'axios'

let API_HOST = 'http://localhost:5000/api'

if (process.env.NODE_ENV === 'production') {
  API_HOST = 'https://blooming-ravine-18324.herokuapp.com/api'
}

export const api = {
  get: (url) => {
    return axios
      .get(`${API_HOST}/${url}`)
      .then(res => res.data)
  },
  post: (url, data) => {
    return axios
      .post(`${API_HOST}/${url}`, data)
      .then(res => res.data)
  },
  put: (url, data) => {
    return axios
      .patch(`${API_HOST}/${url}`, data)
      .then(res => res.data)
  },
  delete: (url) => {
    return axios
      .delete(`${API_HOST}/${url}`)
      .then(res => res.data)
  }
}
