import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import * as schemaActions from '../../../reducers/schema'

import styles from './styles.css'
import { SchemaForm } from '../../../components'
import Modules from '../../Modules'

class SchemaContainer extends Component {
  componentWillMount() {
    const uuid = this.props.match.params.uuid
    if (uuid) {
      this.props.fetchSchema(uuid)
    }
  }

  componentWillUnmount() {
    this.props.schemaEmpty()
  }

  onChange = (fieldName) => (e) => {
    e && e.preventDefault()

    const payload = {
      name: fieldName,
      value: e.target.value
    }

    this.props.setSchemaValues(payload)
  }

  onSave = section => e => {
    e && e.preventDefault()
    this.props.saveSchema()
  }

  onUpdate = section => e => {
    e && e.preventDefault()
    this.props.updateSchema()
  }

  onHandleDelete = (uuid) => e => {
    e && e.preventDefault()
    this.props.deleteSchema(uuid)
  }

  render () {
    const { schema, loading, fail } = this.props

    return (
      <div className={styles.Container}>
        <div className={styles.FormContainer}>
          <SchemaForm
            data={schema}
            actions={{
              onChange: this.onChange,
              onSave: this.onSave,
              onUpdate: this.onUpdate,
              onDelete: this.onHandleDelete
            }}
            loading={loading}
            error={fail}
          />
          {schema.id && (<Modules id={schema.id}/>)}
        </div>
      </div>
    )
  }
}

const mapToStateProps = state => {
  const { schema, loading, fail } = state.schema.toJS()
  return {
    schema,
    loading,
    fail
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...schemaActions
  }, dispatch)
}

export default connect(
  mapToStateProps,
  mapDispatchToProps
)(SchemaContainer)
