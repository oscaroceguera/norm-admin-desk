import React from 'react'
import PropTypes from 'prop-types'
import styles, { InputHero, FieldContainer, TitleField } from './styles.css'
import cx from 'classnames'

const TextField = ({ width, placeholder, title }) => {
  const ClassNames = cx(InputHero, styles[width])
  return (
    <div className={FieldContainer}>
      <label className={TitleField}>{title}</label>
      <input className={ClassNames} placeholder={placeholder} />
    </div>
  )
}

TextField.defaultProps = {
  width: 'Medium',
  placeholder: 'Placeholder',
  title: null
}

TextField.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string
}

export default TextField
