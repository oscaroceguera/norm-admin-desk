import React from 'react'
import PropTypes from 'prop-types'
import { every } from 'lodash/collection'

import Button from '../Button'
import { btnSave, btnUpdate } from './styles.css'

const showBtnAux = (fields) => !every(fields)

const ShowBtn = ({ data, actions: { onSave, onUpdate, onDelete } }) => (
  <div className={data.uuid ? btnUpdate : btnSave}>
    <Button
      label={!data.uuid ? 'Guardar' : 'Actualizar'}
      disabled={showBtnAux(data)}
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
)

ShowBtn.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    onSave: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
  })
}

export default ShowBtn
