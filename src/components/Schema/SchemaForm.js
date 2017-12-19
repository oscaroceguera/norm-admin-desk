import React from 'react'
import PropTypes from 'prop-types'
import { every } from 'lodash/collection'
import { TextField, Button } from '../index'
import styles from './styles.css'

const showButton = (fields) => !every(fields)

const IDItem = ({id}) => <p className={styles.IdItem}><strong>ID</strong>{id}</p>

const INPUTS = [
  { title: 'Nombre del esquema', placeholder: 'SENASICA, Global GAP', width: 'Large', section: 'schema', name: 'name', required: true },
  { title: 'Versión', placeholder: '2.0', width: 'Small', section: 'schema', name: 'version', required: true },
  { title: 'Descripcion', placeholder: 'Descripción...', width: 'Large', section: 'schema', name: 'description', required: true }
]

const SchemaForm = ({ data, onChange, onSave, onUpdate }) => (
  <div>
    <h1 className={styles.FormTitle}>Schema Form</h1>
    <div className={styles.Form}>
      {data.id && <IDItem id={data.id} />}
      {
        INPUTS.map(({title, placeholder, section, name, width, required}, key) => (
          <TextField
            key={key}
            title={title}
            placeholder={placeholder}
            width={width}
            onChange={onChange(section, name)}
            value={data[name]}
            required={required}
          />
        ))
      }
    </div>
    <div className={styles.BtnContainer}>
      <Button
        label={!data.id ? 'guardar' : 'actualizar'}
        primary
        disabled={showButton(data)}
        onClick={!data.id ? onSave('schema') : onUpdate('schema')}
      />
    </div>
  </div>
)

SchemaForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default SchemaForm
