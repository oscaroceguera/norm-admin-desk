import React, {Component} from 'react'
import { SchemaForm } from '../../../components'
import styles from './styles.css'
import { withRouter } from 'react-router-dom'

import axios from 'axios'

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
    modules: [],
    module: {
      id: '',
      name: '',
      order: '',
      number: ''
    }
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
    // console.log('section', section)
    // console.log('field', field)
    // console.log('Value', e.target.value)
 
    this.setState({
      [section]: {
        ...this.state[section],
        [field]: e.target.value
      }
    })
  }

  onSave = section => e => {
    e && e.preventDefault()
    // console.log('onSave section', section)
    if (section === 'schema') {
      this.saveSchema()
      // const id = uuidv4()

      // return this.setState({
      //   schema: {
      //     ...this.state.schema,
      //     id
      //   }
      // }, () => {
      //   this.props.history.push('/schema/' + id)
      // })
    }
  }

  async saveSchema() {
    this.setState({
      loadingSchema: true,
      failSchema: null
    })

    try {
      const body = await api.post('schemas', this.state.schema)

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
    // console.log('onUpdate section', section)
  }

  render () {
    const { schema, loadingSchema, failSchema } = this.state
    console.log('SCHEMA', schema)
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
        {schema.id && (
          <div style={{border: '1px solid black'}}>
            <h3>Modules</h3>
          </div>
        )}
        </div>
      </div>
    )
  }
}

export default withRouter(SchemaContainer)
