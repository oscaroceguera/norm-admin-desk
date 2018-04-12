import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.css'

import { SchemaForm } from '../../../components'
import Modules from '../../Modules'

const HOST = 'http://localhost:5000/api'

const api = {
  post: (url, data) => {
    return axios
      .post(`${HOST}/${url}`, data)
      .then(res => res.data)
  },
  get: (url) => {
    return axios
      .get(`${HOST}/${url}`)
      .then(res => res.data)
  },
  put: (url, data) => {
    return axios
      .patch(`${HOST}/${url}`, data)
      .then(res => res.data)
  }
}

class SchemaContainer extends Component {
  state = {
    schema: {
      name: '',
      version: '',
      description: ''
    },
    loadingSchema: false,
    failSchema: null,
  }

  componentWillMount() {
    const uuid = this.props.match.params.uuid
    if (uuid) {
      this.loadSchema(uuid)
    }
  }

  async loadSchema(uuid) {
    this.setState({
      loadingSchema: true,
      failSchema: null
    })
    try {
      const body = await api.get(`/schemas/${uuid}`)

      this.setState({
        loadingSchema: false,
        schema: {
          id: body.schema.uuid,
          name: body.schema.name,
          version: body.schema.version,
          description: body.schema.description
        }
      })
      
    } catch (e) {
      this.setState({
        loadingSchema: false,
        failSchema: e.message
      })
    }
  }

  onChange = (section, field) => (e) => {
    e && e.preventDefault()
    
    this.setState({
      [section]: {
        ...this.state[section],
        [field]: e.target.value
      }
    })
  }

  onSave = section => e => {
    e && e.preventDefault()

    if (section === 'schema') {
      this.saveSchema()
    }
  }

  async saveSchema() {
    const {schema} = this.state
    this.setState({
      loadingSchema: true,
      failSchema: null
    })

    try {
      const body = await api.post('schemas', schema)

      this.setState({
        schema: {
          id: body.uuid,
          name: body.name,
          version: body.version,
          description: body.description
        },
        loadingSchema: false,
      })

      this.props.history.push('/schema/' + body.uuid)
    } catch (e) {
      this.setState({
        loadingSchema: false,
        failSchema: e.message
      })
    }
  }

  onUpdate = section => e => {
    e && e.preventDefault()

    if (section === 'schema') {
      this.updateSchema()
    }
  }

  async updateSchema() {
    const { schema } = this.state
    this.setState({
      loadingSchema: true,
      failSchema: null
    })

    try {
      const body = await api.put(`schemas/${schema.id}`, schema)
      this.setState({
        schema: {
          id: body.schema.uuid,
          name: body.schema.name,
          version: body.schema.version,
          description: body.schema.description
        },
        loadingSchema: false,
      })


    } catch (e) {
      this.setState({
        loadingSchema: false,
        failSchema: e.message
      })
    }
  }

  render () {
    const { schema, loadingSchema, failSchema } = this.state

    return (
      <div className={styles.Container}>
        <div className={styles.FormContainer}>
          <SchemaForm
            data={schema}
            onChange={this.onChange}
            onSave={this.onSave}
            onUpdate={this.onUpdate}
            loading={loadingSchema}
            error={failSchema}
          />
          {schema.id && (<Modules id={schema.id}/>)}
        </div>
      </div>
    )
  }
}

export default withRouter(SchemaContainer)
