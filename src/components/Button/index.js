import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './styles.css'
import classNames from 'classnames'

function Button ({ primary, disabled, label, onClick }) {
  const classStyle = classNames(styles.btnClase, {
    [styles.default]: !primary,
    [styles.primary]: primary,
    [styles.disabled]: disabled
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
  label: 'Button',
  onClick: f => f
}

Button.propTypes = {
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
