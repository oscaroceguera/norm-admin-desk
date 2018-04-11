import React from 'react'
import PropTypes from 'prop-types'
import { every } from 'lodash/collection'

import {
  Loading,
  ErrorMessage,
  Modal,
  TextField,
  Button
} from '../../components'

const showButton = (fields) => !every(fields)

const ModuleForm = ({
  show,
  onClose,
  loadingdModule,
  failModule,
  data,
  onChange,
  onSave,
  onUpdate
}) => (
  <Modal show={show} onClose={onClose} title={'Agregar módulo'}>
    {loadingdModule
      ? <Loading />
      : (
        <div>
          <div style={{ display: 'flex' }}>
            <TextField
              title='Número'
              placeholder='1.1'
              value={data.number}
              onChange={onChange('number')}
              required
            />
            <TextField
              title='Orden'
              placeholder='1'
              type='number'
              value={data.order}
              onChange={onChange('order')}
              required
            />
          </div>
          <br />
          <TextField
            title='Nombre'
            placeholder='Nombre'
            value={data.name}
            onChange={onChange('name')}
            width='FullWidth'
            required
          />
          {failModule && <ErrorMessage msg={`Agregar módulo: ${failModule}`} />}
          <div style={{ margin: '.5em 0', padding: '.5em', textAlign: 'center' }}>
            <Button
              label={!data.uuid ? 'Guardar' : 'Actualizar'}
              disabled={showButton(data)}
              onClick={!data.uuid ? onSave : onUpdate}
              primary
            />
          </div>
        </div>
      )
    }
  </Modal>
)

ModuleForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadingdModule: PropTypes.bool.isRequired,
  failModule: PropTypes.string,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ModuleForm
