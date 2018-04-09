import React, { Component } from 'react'
import axios from 'axios'
import styles from './styles.css'
import { withRouter } from 'react-router-dom'

import { Loading, ErrorMessage } from '../../../components'
import AddIcon from './plus.svg'

const HOST = 'http://localhost:5000/api'

const SchemaItem = ({ schema, onClick }) => (
  <div className={styles.item} onClick={onClick(schema.uuid)}>
    <p>{schema.name}</p>
    <div>
      <b>Versión: </b> <label>{schema.version}</label> <br />
      <b>Descripción: </b> <br />
      <label>{schema.description}</label>
    </div>
  </div>
)

const api = {
  get: (url) => {
    return axios
      .get(`${HOST}/${url}`)
      .then(res => res.data)
  }
}

class SchemaListContainer extends Component {
  state = {
    loading: false,
    fail: null,
    schemas: []
  }

  componentWillMount() {
    this.load()
  }

  async load() {
    this.setState({
      loading: true,
      fail: false
    })

    try {
      const body = await api.get('schemas')
      this.setState({
        loading: false,
        schemas: body
      })
    } catch (e) {
      this.setState({
        loading: false,
        fail: e.message
      })
    }
  }

  schemaDetail = uuid => e => {
    e && e.preventDefault()
    this.props.history.push('/schema/' + uuid)
  }

  addSchema = e => {
    e && e.preventDefault()
    this.props.history.push('/schema')
  }

  render () {
    const { loading, fail, schemas } = this.state
    let noItems

    if (loading) {
      return <Loading />
    }

    if (fail) {
      return <ErrorMessage msg={fail} />
    }

    if (schemas.length === 0) {
      noItems = (
        <p className={styles.zeroItemsMsg}>
          ¡Aún no hay esquemas registrados!
        </p>
      )
    }

    const ITEMS = schemas.map(schema => (
      <SchemaItem
        key={schema.uuid}
        schema={schema}
        onClick={this.schemaDetail}
      />
    ))

    return (
      <div className={styles.container}>
        {noItems}
        <div className={styles.items}>{ITEMS}</div>
        <div className={styles.addSchema} onClick={this.addSchema}>
          <img src={AddIcon} alt='add-icon' />
        </div>
      </div>
    )
  }
}

export default withRouter(SchemaListContainer)