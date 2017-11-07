import React, {Component} from 'react'
import Proptypes from 'prop-types'
import styles from './styles.css'

import searchData from '../../utils/searchAutoComplete'

class AutoComplete extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
      dataSource: []
    }
  }

  onChange = (e) => {
    e && e.preventDefault()
    const [{data}, {value}] = [this.state, e.target]
    const dataSource = searchData(data, value) 
    this.setState({dataSource})
  }
 
  render () {
    const [{dataSource},{value}] = [this.state, this.props]
    return (
      <div>
        <input value={value} onChange={this.onChange} />
        {dataSource && (
          <div>
            {dataSource.map(i => i.desc)}
          </div>
        )}
      </div>
    )
  }
}

export default AutoComplete
