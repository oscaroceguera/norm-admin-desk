import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import LoadingIcon from './loading.svg'

const Loading = ({ width = '50px' }) => (
  <div className={styles.container}>
    <img
      className={styles.loader}
      width={width}
      src={LoadingIcon}
      alt='loading'
    />
  </div>
)

Loading.propTypes = {
  width: PropTypes.string
}

export default Loading
