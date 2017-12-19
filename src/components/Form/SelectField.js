import React from 'react'
import PropTypes from 'prop-types'
import styles, {
  SlcContainer,
  SlcTitle,
  SlcHero,
  SlcItem
} from './styles.css'
import ArrowDown from './arrow-down.svg'
import cx from 'classnames'


const ItemHeader = ({ title, valueDesc }) =>
  valueDesc
    ? <label style={{ color: 'black' }}>{valueDesc.toUpperCase()}</label>
    : <label>{title}</label>

ItemHeader.propTypes = {
  title: PropTypes.string,
  valueDesc: PropTypes.string
}

function Options ({ showItems, items, handleItem }) {
  return showItems ? (
    <ul className={SlcHero}>
      {
        items.map(({ id, desc }) => (
          <li
            key={id}
            data-desc={desc}
            data-value={id}
            onClick={handleItem}
            className={SlcItem}
          >
            {desc.toUpperCase()}
          </li>
        ))
      }
    </ul>
  ) : null
}

Options.PropTypes = {
  showItems: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  handleItem: PropTypes.func.isRequired
} 


class SelectField extends React.Component {
  state = {
    showItems: false,
    item: {
      desc: '',
      value: ''
    }
  }
  
  handleShowItems = () => {
    // attach/remove event handler
    if (!this.state.showItems) {
      document.addEventListener('click', this.OutsideClick, false)
    } else {
      document.removeEventListener('click', this.OutsideClick, false)
    }

    this.setState(({showItems}) => ({
      showItems: !showItems
    }))
  }

  OutsideClick = (e) => {
    e && e.preventDefault()
    // ignore clicks on the component itself
    if (this.slcSection.contains(e.target)) {
      return
    }

    this.handleShowItems()
  }

  handleItem = (e) => {
    e && e.preventDefault()
    // e.currentTarget || e.target/.value/.id/.dataset.name
    // aca el que click padre que optiene el valor
    this.setState({
      item: {
        desc: e.target.dataset.desc,
        value: e.target.dataset.value
      }
    })

    this.handleShowItems()
  }

  render () {
    const { item, showItems } = this.state
    const { items, title, width, required } = this.props

    const Container = cx(SlcContainer, styles[width],{
      [styles.borderBtnSlc]: !this.state.showItems,
      [styles.borderBtnSlcRequired]: !this.state.showItems && required && !item.desc
    })

    return (
      <div className={Container} ref={i => this.slcSection = i}>
        <div className={SlcTitle} onClick={this.handleShowItems}>
          <ItemHeader title={title} valueDesc={item.desc} />
          <img src={ArrowDown} alt='arrow'/>
        </div>
        <Options
          showItems={showItems}
          items={items}
          handleItem={this.handleItem}
        />
      </div>
    )
  }
}



SelectField.defaultProps = {
  title: 'Select',
  width: 'Medium',
  required: false
}

SelectField.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  required: PropTypes.bool
}


export default SelectField
