import React, {Component} from 'react'
import Proptypes from 'prop-types'
import styles, {
  AutoCompleteContainer,
  AutoCompleteField,
  AutoCompleteListContainer,
  AutoCompleteListItem
} from './styles.css'
import cx from 'classnames'

import searchData from '../../utils/searchAutoComplete'

const baseState = {
  valueSelected: {
    id: '',
    value: undefined
  },
  dataSource: [],
}

class AutoComplete extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
      dataSource: baseState.dataSource,
<<<<<<< HEAD
      valueSelected: baseState.valueSelected
=======
      valueSelected: baseState.valueSelected,
      width: props.width
>>>>>>> f71b5f952f53ef76b392b93e1ab5dbdca53deb16
    }
  }

  onChange = (e) => {
    e && e.preventDefault()
    const { data, valueSelected } = this.state
    const {value} = e.target
    const dataSource = searchData(data, value)
    this.setState({
      dataSource,
      valueSelected: baseState.valueSelected
    })
  }

  onSelectedItem = (e) => {
    e && e.preventDefault()
    const {itemId, itemValue} = e.target.dataset
    this.setState({
      valueSelected: {
        id: itemId,
        value: itemValue
      },
      dataSource: baseState.dataSource
    })
  }

  componentWillUnmount () {
    this.setState({
      data: null,
      dataSource: baseState.dataSource,
      valueSelected: baseState.valueSelected
    })
  }
 
  render () {
    const { dataSource, valueSelected} = this.state
    const { width, placeholder} = this.props

    return (
      <div className={styles[width]}>
        <input
          className={AutoCompleteField}
          placeholder={placeholder}
          type='text'
          value={valueSelected.value}
          onChange={this.onChange}
        />
<<<<<<< HEAD
        {dataSource.length > 0 && (
=======
        {dataSource && (
>>>>>>> f71b5f952f53ef76b392b93e1ab5dbdca53deb16
          <ul className={AutoCompleteListContainer}>
            {dataSource.map(i => (
              <li
                className={AutoCompleteListItem}
                onClick={this.onSelectedItem}
                data-item-id={i.id}
                data-item-value={i.desc}
                key={i.id}
              >
                {i.desc}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

AutoComplete.defaultProps = {
  width: 'Medium',
  placeholder: 'placeholder'
}

AutoComplete.propTypes = {
  data: Proptypes.array.isRequired,
  width: Proptypes.string,
  placeholder: Proptypes.string
}

export default AutoComplete
<<<<<<< HEAD
=======

// TODO: ACENTO DE MEXICO
// TODO: Mostrar/ocuoltar list
// TODO: Ocultar list al seleccionar click afuera de la lista
>>>>>>> f71b5f952f53ef76b392b93e1ab5dbdca53deb16
