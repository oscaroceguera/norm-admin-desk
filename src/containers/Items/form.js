import React from 'react'
import PropTypes from 'prop-types'
import { every } from 'lodash/collection'
import { btnSave, btnUpdate } from './styles.css'

import {
  Modal,
  TextField,
  Button
} from '../../components'

const showButton = (fields) => !every(fields)

const ItemForm = ({
  show,
  onClose,
  title,
  data,
  onChange,
  onSave,
  onUpdate,
  onDelete
}) => (
  <Modal show={show} onClose={onClose} title={title}>
    <div>
      <TextField
        title='Pregunta'
        placeholder='¿Pregunta ...?'
        value={data.question}
        onChange={onChange('question')}
        required
        width='FullWidth'
      />
      <br />
      <TextField
        title='Comentario'
        placeholder='Comentario'
        value={data.comment}
        onChange={onChange('comment')}
        required
        width='FullWidth'
      />
      <br />
      <div style={{ display: 'flex' }}>
        <TextField
          title='Valor'
          placeholder='10'
          value={data.value}
          onChange={onChange('value')}
          width='Small'
          required
        />
        <TextField
          title='Número'
          placeholder='1.2'
          value={data.number}
          onChange={onChange('number')}
          width='Small'
          required
        />
        <TextField
          title='Orden'
          placeholder='1'
          value={data.order}
          onChange={onChange('order')}
          width='Small'
          required
        />
      </div>
      <div className={data.uuid ? btnUpdate : btnSave}>
        <Button
          label={!data.uuid ? 'Guardar' : 'Actualizar'}
          disabled={showButton(data)}
          onClick={!data.uuid ? onSave : onUpdate}
          primary
        />
        {data.uuid && (
          <Button
            label={'Eliminar'}
            onClick={onDelete(data.uuid)}
            secondary
          />
        )}
      </div>
    </div>
  </Modal>
)

ItemForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ItemForm
