import React, { Component } from 'react'
import { sortBy } from 'lodash/collection'

import styles from './styles.css'
import ArrowDown from './arrow-down.svg'
import ArrowUp from './arrow-up.svg'

import { Button } from '../../components'
import ItemForm from './form'

import {api} from '../../api'

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
          <div><img src={show ? ArrowUp : ArrowDown} width='16px' alt='arrow-icon' /></div>
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

const itemEmpty = {
  question: '',
  comment: '',
  value: '',
  number: '',
  order: 0
}

class ItemsContainer extends Component {
  state = {
    loadingItem: false,
    failItem: null,
    moduleId: '',
    modalIsOpen: false,
    item: itemEmpty
  }

  showForm = (uuid) =>  (e) => {
    e && e.preventDefault()

    this.setState({
      moduleId: uuid,
      modalIsOpen: true
    })
  }

  toggleModal = (e) => {
    e && e.preventDefault()

    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
      moduleId: '',
      item: itemEmpty
    }))
  }

  onChange = (field) => e => {
    this.setState({
      item: {
        ...this.state.item,
        [field]: e.target.value
      }
    })
  }

  onSave = async (e) => {
    this.setState({
      loadingItem: true,
      failItem: null
    })

    try {
      await api.post(`/modules/${this.state.moduleId}/items`, this.state.item)

      this.setState({
        loadingItem: false,
        failItem: null,
        modalIsOpen: false,
        item: itemEmpty
      })

      this.props.load()
    } catch (e) {
      this.setState({
        loadingItem: false,
        failItem: e.message
      })
    }
  }

  onUpdate = async () => {
    const { item } = this.state

    this.setState({
      loadingItem: true,
      failItem: null
    })

    try {
      await api.put(`/items/${item.uuid}`, item)

      this.setState({
        loadingItem: false,
        failItem: null,
        modalIsOpen: false,
        item: itemEmpty
      })

      this.props.load()
    } catch (e) {
      this.setState({
        loadingItem: false,
        failItem: e.message
      })
    }
  }

  onHandleDelete = (uuid) => e => {
    this.onDelete(uuid)
  }
  
  async onDelete(uuid) {
    this.setState({
      loadingItem: true,
      failItem: null
    })

    try {
      await api.delete(`/items/${uuid}`)

      this.setState({
        loadingItem: false,
        failItem: null,
        modalIsOpen: false,
        item: itemEmpty
      })

      this.props.load()
    } catch (e) {
      this.setState({
        loadingItem: false,
        failItem: e.message
      })
    }
  }

  onClickItem = item => e => {
    e && e.preventDefault()

    this.setState({
      item: {
        uuid: item.uuid,
        question: item.question,
        comment: item.comment,
        value: item.value,
        number: item.number,
        order: item.order
      },
      modalIsOpen: true
    })
  }

  render() {
    const { modalIsOpen, item } = this.state

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

export default ItemsContainer
