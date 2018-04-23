import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as moduleActions from '../../reducers/module'
import * as modulesActions from '../../reducers/modules'

import styles from './styles.css'

import { Loading, ErrorMessage, Icon } from '../../components'
import ModuleForm from './form'
import ItemsContainer from '../Items'


const ModuleList = ({ modules, onClick }) => (
  modules.map(({uuid, number, name, order}) => (
    <div key={uuid} className={styles.listItem} onClick={onClick(uuid)}>
      <p className={styles.listItemDesc}>{number} - {name}</p>
    </div>
  ))
)

class ModulesContainer extends Component {
  componentWillMount() {
    this.props.fetchModules(this.props.id)
  }

  toggleModal = () => {
    this.props.showModal()
  }

  onChange = field => e => {
    e && e.preventDefault()

    const payload = {
      name: field,
      value: e.target.value
    }
    this.props.setModuleValues(payload)
  }

  onSave = (e) => {
    e && e.preventDefault()
    this.props.saveModule(this.props.id)
  }
  
  onUpdate = (e) => {
    e && e.preventDefault()
    this.props.updateModule()
  }

  onHandleDelete = (uuid) => e => {
    this.props.deleteModule(uuid)
  }

  onClickModule = uuid => e => {
    e && e.preventDefault()
    this.props.selectModule(uuid)
  }

  render () {
    const {
      modalIsOpen,
      module,
      loadingModule,
      failModule,
      loadingModules,
      failModules,
      modules
    } = this.props

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
            <Icon name='add' width='16px' />
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
          loadingModule={loadingModule}
          failModule={failModule}
          data={module}
          onChange={this.onChange}
          onSave={this.onSave}
          onUpdate={this.onUpdate}
          onDelete={this.onHandleDelete}
        />
        {modules.length > 0 && (
          <ItemsContainer
            modules={modules}
          />
        )}
      </div>
    )
  }
}

const mapToStateProps = state => {
  const { modalIsOpen, module, loadingModule, failModule } = state.module.toJS()
  const { loadingModules, failModules, modules } = state.modules.toJS()
  return {
    modalIsOpen,
    module,
    loadingModule,
    failModule,
    loadingModules,
    failModules,
    modules
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...moduleActions,
    ...modulesActions
  }, dispatch)
}

export default connect(mapToStateProps, mapDispatchToProps)(ModulesContainer)
