import axios from 'axios'

const apiHost = process.env.API_HOST

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
  },
  download: (uri, name) => {
    return axios({
      url: `${apiHost}/${uri}`,
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', `${name}.pdf`)

      document.body.appendChild(link)
      link.click()
    })
  }
}
