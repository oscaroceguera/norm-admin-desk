import React from 'react'
import PropTypes from 'prop-types'
import styles, { InputHero, FieldContainer, TitleField, RequiredMsg } from './styles.css'
import cx from 'classnames'
import reqForText, { reqForType } from '../../utils/requiredTxtFields'

const MSG_FOR_TYPE = {
  email: 'Email invalido!',
  number: 'Valores númericos invalidos!'
}

const TextField = ({ width, placeholder, title, type, required, requiredTitle, value }) => {
  const ClassNames = cx(InputHero, styles[width])

  return (
    <div className={FieldContainer}>
      <label className={TitleField}>{title}</label>
      <input
        className={ClassNames}
        value={value}
        placeholder={placeholder}
      />
      {reqForText(required, value) && <span className={RequiredMsg}>{requiredTitle}</span>}
      {reqForType(type, value)
        ? null
        : <span className={RequiredMsg}> {MSG_FOR_TYPE[type]} </span>}
    </div>
  )
}

TextField.defaultProps = {
  width: 'Medium',
  placeholder: 'Placeholder',
  title: null,
  type: 'text',
  required: false,
  requiredTitle: 'Requerido',
  value: ''
}

TextField.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  requiredTitle: PropTypes.string
}

export default TextField
