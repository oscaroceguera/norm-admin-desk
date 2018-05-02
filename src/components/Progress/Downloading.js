import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './downloading.css'

class Downloading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  componentDidMount () {
    const { text: textProps, speed } = this.props
    let stopper = textProps + '...'

    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({
          text: textProps
        })
      } else {
        this.setState(({ text }) => ({
          text: text + '.'
        }))
      }
    }, speed)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div className={styles.container}>
        <p className={styles.text}>{this.state.text}</p>
      </div>
    )
  }
}

Downloading.defaultProps = {
  text: 'Descargando pdf',
  speed: 300
}

Downloading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
}

export default Downloading
