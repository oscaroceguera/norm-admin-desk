import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Icon from '../Icon'

const Loading = ({ width = '50px' }) => (
  <div className={styles.container}>
    <Icon
      className={styles.loader}
      width={width}
      name='loading'
    />
  </div>
)

Loading.propTypes = {
  width: PropTypes.string
}

export default Loading
