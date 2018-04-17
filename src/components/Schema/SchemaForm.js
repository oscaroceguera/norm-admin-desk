import React from 'react'
import PropTypes from 'prop-types'
import { every } from 'lodash/collection'
import styles from './styles.css'
import { TextField, Button } from '../index'
import Loading from '../Progress'
import ErrorMessage from '../Warnings'
import DeleteIcon from './delete.svg'

const showButton = (fields) => !every(fields)

const INPUTS = [
  { title: 'Nombre del esquema', placeholder: 'SENASICA, Global GAP', width: 'Large', section: 'schema', name: 'name', required: true },
  { title: 'Versión', placeholder: '2.0', width: 'Small', section: 'schema', name: 'version', required: true },
  { title: 'Descripcion', placeholder: 'Descripción...', width: 'Large', section: 'schema', name: 'description', required: true }
]

const SchemaForm = ({ data, actions: { onChange, onSave, onUpdate, onDelete }, loading, error }) => {
  return (
    <div>
      <div className={styles.FormTitle}>
        <h1>Schema Form</h1>
        {data.id && (
          <div>
            <img
              src={DeleteIcon}
              alt='delete-icon'
              width='20px'
              onClick={onDelete(data.id)}
            />
          </div>
        )}
      </div>
      {loading
        ? <Loading />
        : (
          <div className={styles.Form}>
            {
              INPUTS.map(({ title, placeholder, section, name, width, required }, key) => (
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
        )
      }
      {error && <ErrorMessage msg={error} />}
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
}

SchemaForm.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default SchemaForm
