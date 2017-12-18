import React, {Component} from 'react'
import {TextField} from '../../../components'
import styles from './styles.css'

class SchemaContainer extends Component {
  render () {
    return (
      <div className={styles.Container}>
        <div className={styles.FormContainer}>
          <h1 className={styles.FormTitle}>Schema Form</h1>
          <div className={styles.Form}>
            <TextField
              title={'Nombre del esquema'}
              placeholder={'SENASICA, Global GAP'}
              required
            />
            <TextField
              title={'Versión'}
              placeholder={'2.0'}
              required
            />
            <TextField
              title={'Descripcion'}
              placeholder={'Descripción ...'}
              required
            />
          </div>
        </div>
        {/* <div style={{border: '1px solid black'}}>
          <h2>Modules</h2>
          <h2>Items</h2>
        </div> */}
      </div>
    )
  }
}

export default SchemaContainer
