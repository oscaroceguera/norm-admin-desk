import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import cx from 'classnames'

function TextField ({ width, placeholder, title }) {
  const ClassNames = cx(styles.InputHero, styles[width])
  return (
    <div class={styles.FieldContainer}>
      <label className={styles.TitleField}>{title}</label>
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

export {
  TextField
}
