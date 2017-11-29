import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classNames from 'classnames'

function Button ({ primary, disabled, label, onClick }) {
  let buttonBackground = [styles.default]

  if (primary) buttonBackground = [styles.primary]

  const classStyle = classNames(styles.btnClase, buttonBackground, {
    [styles.disabled]: disabled === true
  })

  return (
    <button
      className={classStyle}
      onClick={disabled ? null : onClick}
    >
      {label.toUpperCase()}
    </button>
  )
}

Button.defaultProps = {
  primary: false,
  disabled: false,
  label: 'Button'
}

Button.propTypes = {
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Button
