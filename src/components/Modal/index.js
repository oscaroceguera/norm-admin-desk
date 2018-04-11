import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import CloseIcon from './close.svg'

function Modal (props) {
  if (!props.show) {
    return null
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {props.title}
          </h3>
          <div className={styles.close} onClick={props.onClose}>
            <img src={CloseIcon} width='14px' alt='close-icon' />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default Modal
