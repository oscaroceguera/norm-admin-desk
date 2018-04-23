import React from 'react'
import PropTypes from 'prop-types'

import {
  Loading,
  ErrorMessage,
  Modal,
  TextField,
  ShowBtn
} from '../../components'

const ModuleForm = ({
  show,
  onClose,
  loadingModule,
  failModule,
  data,
  onChange,
  onSave,
  onUpdate,
  onDelete
}) => (
  <Modal show={show} onClose={onClose} title={'Agregar módulo'}>
    {loadingModule
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
          <ShowBtn
            data={data}
            actions={{ onSave, onUpdate, onDelete }}
          />
        </div>
      )
    }
  </Modal>
)

ModuleForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadingModule: PropTypes.bool.isRequired,
  failModule: PropTypes.string,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ModuleForm
