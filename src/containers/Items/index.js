import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortBy } from 'lodash/collection'

import * as itemActions from '../../reducers/item'

import styles from './styles.css'

import { Button, Icon } from '../../components'
import ItemForm from './form'

class QuestionItem extends Component {
  state = {
    show: false
  }

  handleShow = () => {
    this.setState((currentState) => ({
      show: !currentState.show
    }))
  }

  render () {
    const { module, showForm, questions, onClickItem } = this.props
    const { show } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.header} onClick={this.handleShow}>
          <div>{`Módulo ${module.number} - ${module.name}`}</div>
          <div>
            <Icon name={show ? 'arrowUp' : 'arrowDown'} width='16px' />
          </div>
        </div>
        {show && (
          <div className={styles.items}>
            {questions.map(i => (
              <div key={i.uuid} className={styles.item} onClick={onClickItem(i)}>
                <p className={styles.askAndValue}>{i.number} - {i.question}</p>
                <p className={styles.comment}>{i.comment} </p>
                <p className={styles.askAndValue}><b>Valor:</b> {i.value}</p>
              </div>
            ))}
            <div style={{ textAlign: 'right' }}>
              <Button
                label='agregar item'
                secondary
                onClick={showForm(module.uuid)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const ModulesList = (props) => {
  return props.modules.map((item) => {
    const questions = sortBy(item.items, ['order', 'asc'])
    return (
      <QuestionItem
        key={item.uuid}
        module={item}
        questions={questions}
        showForm={props.showForm}
        onClickItem={props.onClickItem}
      />
    )
  })
}


class ItemsContainer extends Component {
  showForm = (uuid) =>  (e) => {
    e && e.preventDefault()
    this.props.showForm(uuid)
  }

  toggleModal = (e) => {
    e && e.preventDefault()
    this.props.toggleModal()
  }

  onChange = (field) => e => {
    const data = {
      name: field,
      value: e.target.value
    }
    this.props.setValue(data)
  }

  onSave = (e) => {
    this.props.saveItem()
  }

  onUpdate = () => {
    this.props.itemUpdate()
  }

  onHandleDelete = (uuid) => e => {
    this.props.itemDelete(uuid)
  }

  onClickItem = item => e => {
    e && e.preventDefault()
    this.props.itemDetail(item)
  }

  render() {
    const { modalIsOpen, item } = this.props

    return (
      <div>
        <ModulesList
          modules={this.props.modules}
          showForm={this.showForm}
          onClickItem={this.onClickItem}
        />
        <ItemForm
          show={modalIsOpen}
          onClose={this.toggleModal}
          title={'Agregar reactivo'}
          data={item}
          onChange={this.onChange}
          onSave={this.onSave}
          onUpdate={this.onUpdate}
          onDelete={this.onHandleDelete}
        />
      </div>
    )
  }
}

const mapToStateProps = (state, props) => {
  const { modalIsOpen, item } = state.item.toJS()
  return {
    modalIsOpen,
    item,
    modules: props.modules
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...itemActions
  }, dispatch)
}

export default connect(mapToStateProps, mapDispatchToProps)(ItemsContainer)
