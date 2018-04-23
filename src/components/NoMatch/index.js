import React from 'react'
import styles from './styles.css'
import Icon from '../Icon'

const NoMatch = () => (
  <div className={styles.container}>
    <div><Icon name='noMatch' width='100px' /></div>
    <h3>¡Ups, esta ruta no existe!</h3>
  </div>
)

export default NoMatch
