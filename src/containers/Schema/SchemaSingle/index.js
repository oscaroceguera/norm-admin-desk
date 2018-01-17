import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../reducers/Schema'
import { SchemaForm } from '../../../components'
import styles from './styles.css'
import uuidv4 from 'uuid/v4'

class SchemaContainer extends Component {
  state = {
    schema: {
      name: '',
      version: '',
      description: ''
    },
    modules: [],
    module: {
      id: '',
      name: '',
      order: '',
      number: ''
    }
  }

  onChange = (section, field) => (e) => {
    e && e.preventDefault()
    console.log('section', section)
    console.log('field', field)
    console.log('Value', e.target.value)
 
    this.setState({
      [section]: {
        ...this.state[section],
        [field]: e.target.value
      }
    })
  }

  onSave = section => e => {
    e && e.preventDefault()
    console.log('onSave section', section)
    if (section === 'schema') {
      return this.setState({
        schema: {
          ...this.state.schema,
          id: uuidv4()
        }
      })
    }
  }

  onUpdate = section => e => {
    e && e.preventDefault()
    console.log('onUpdate section', section)
  }

  render () {
    console.log('STATE', this.state)
    const {schema} = this.state
    return (
      <div className={styles.Container}>
        <div className={styles.FormContainer}>
        <SchemaForm
          data={schema}
          onChange={this.onChange}
          onSave={this.onSave}
          onUpdate={this.onUpdate}
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

const mapStateToProps = (state) => {
  console.log('STATE',state.Schema.toJS())
  return {
    props: state
  }
}

export default connect(mapStateToProps, actions)(SchemaContainer)
