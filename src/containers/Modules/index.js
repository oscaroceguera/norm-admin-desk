import React, { Component } from 'react'
import axios from 'axios'
import {pick} from 'lodash/object'

import styles from './styles.css'
import AddIcon from './add.svg'

import { Loading, ErrorMessage } from '../../components'
import ModuleForm from './form'
import ItemsContainer from '../Items'

const HOST = 'http://localhost:5000/api'

const api = {
  get: (url) => {
    return axios
      .get(`${HOST}/${url}`)
      .then(res => res.data)
  },
  post: (url, data) => {
    return axios
      .post(`${HOST}/${url}`, data)
      .then(res => res.data)
  },
  put: (url, data) => {
    return axios
      .patch(`${HOST}/${url}`, data)
      .then(res => res.data)
  }
}

const ModuleList = ({ modules, onClick }) => (
  modules.map(({uuid, number, name, order}) => (
    <div key={uuid} className={styles.listItem} onClick={onClick(uuid)}>
      <p className={styles.listItemDesc}>{number} - {name}</p>
    </div>
  ))
)

const moduleEmpty = {
  name: '',
  number: '',
  order: '',
}
class ModulesContainer extends Component {
  state = {
    modules: [],
    module: moduleEmpty,
    loadingModules: false,
    failModules: null,
    modalIsOpen: false,
    loadingdModule: false,
    failModule: null
  }

  componentWillMount() {
    this.load()
  }

  async load () {
    this.setState({
      loadingModules: true,
      failModules: null
    })

    try {
      const body = await api.get(`schemas/${this.props.id}/modules`)
      console.log({body})
      this.setState({
        loadingModules: false,
        modules: body
      })
    } catch (e) {
      this.setState({
        loadingModules: false,
        failModules: e.message
      })
    }
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }

  onChange = field => e => {
    e && e.preventDefault()

    this.setState({
      module: {
        ...this.state.module,
        [field]: e.target.value
      }
    })
  }

  onSave = async () => {
    this.setState({
      loadingdModule: true,
      failModule: null
    })

    try {
      await api.post(`/schemas/${this.props.id}/modules`, this.state.module)
      this.setState({
        loadingdModule: false,
        modalIsOpen: false,
        module: moduleEmpty
      })
      this.load()
    } catch (e) {
      this.setState({
        loadingdModule: false,
        failModule: e.message
      })
    }
  }
  
  onUpdate = async () => {
    const { module } = this.state
    
    const data = pick(module, ['name', 'order', 'number'])

    this.setState({
      loadingdModule: true,
      failModule: null
    })

    try {
      await api.put(`/modules/${module.uuid}`, data)
      this.setState({
        loadingdModule: false,
        modalIsOpen: false,
        module: moduleEmpty
      })
      this.load()
    } catch (e) {
      this.setState({
        loadingdModule: false,
        failModule: e.message
      })
    }
  }
  
  onClickModule = uuid => e => {
    e && e.preventDefault()
  
    this.setState((currentState) => ({
      modalIsOpen: true,
      module: currentState.modules.find(item => item.uuid === uuid)
    }))
  }

  render () {
    const {
      loadingModules,
      failModules,
      modules,
      modalIsOpen,
      module,
      loadingdModule,
      failModule
    } = this.state

    let noModules

    if (loadingModules) {
      return <Loading />
    }

    if (failModules) {
      return <ErrorMessage msg={`Modules: ${failModules}`} />
    }

    if (modules.length === 0) {
      noModules = (
        <p className={styles.noModules}>
          ¡Aún no hay módulos registrados!
        </p>
      )
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Módulos</h3>
          <div className={styles.addBtn} onClick={this.toggleModal}>
            <img src={AddIcon} width='16px' alt='add-icon' />
          </div>
        </div>
        <div className={styles.list}>
          {noModules}
          <ModuleList
            modules={modules}
            onClick={this.onClickModule}
          />
        </div>
        <ModuleForm
          show={modalIsOpen}
          onClose={this.toggleModal}
          title={'Agregar módulo'}
          loadingdModule={loadingdModule}
          failModule={failModule}
          data={module}
          onChange={this.onChange}
          onSave={this.onSave}
          onUpdate={this.onUpdate}
        />
        {modules.length > 0 && (
          <ItemsContainer modules={modules} load={() => this.load()}/>
        )}
      </div>
    )
  }
}

export default ModulesContainer
