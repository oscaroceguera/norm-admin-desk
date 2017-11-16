import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const Checkbox = ({value, title}) => (
  <div className={styles.CheckContainer}>
    <input
      className={styles.CheckItem}
      type='checkbox'
      value={value}
    />
    <label
      className={styles.CheckTitle}
    >
      {title}
    </label>
  </div>
)

Checkbox.defaultProps = {
  title: ''
}

Checkbox.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired
}

export default Checkbox
