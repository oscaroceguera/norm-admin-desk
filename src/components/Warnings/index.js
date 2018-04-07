import React from 'react'
import styles from './style.css'
import PropTypes from 'prop-types'

const ErrorMessage = ({ msg }) => (
  <p className={styles.errorMessage}>
    {msg}
  </p>
)

ErrorMessage.propTypes = {
  msg: PropTypes.string.isRequired
}

export default ErrorMessage
