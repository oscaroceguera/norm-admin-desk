import { takeLatest, put, select, all } from 'redux-saga/effects'
import * as MDL from '../reducers/module'
import { fetchModules } from '../reducers/modules'
import { pick } from 'lodash/object'

import { cudApiSaga } from './genericSagas'

function * saveModule ({ payload: { id } }) {
  const _module = yield select(state => state.module.toJS().module)

  yield * cudApiSaga(
    MDL.moduleLoading,
    MDL.saveModuleSuccess,
    fetchModules(id),
    MDL.moduleFail,
    'post',
    `schemas/${id}/modules`,
    _module
  )
}

function * moduleDetail (action) {
  const { uuid } = action.payload
  const modules = yield select(state => state.modules.toJS().modules)

  const moduleDetail = modules.find(module => module.uuid === uuid)

  yield put(MDL.getModuleDetail(moduleDetail))
}

function * updateModule () {
  const _module = yield select(state => state.module.toJS().module)

  yield * cudApiSaga(
    MDL.moduleLoading,
    MDL.updateModuleSuccess,
    fetchModules(_module.norm.uuid),
    MDL.moduleFail,
    'put',
    `modules/${_module.uuid}`,
    pick(_module, ['name', 'order', 'number'])
  )
}

function * deleteModule ({ payload: { uuid } }) {
  const { id } = yield select(state => state.schema.toJS().schema)

  yield * cudApiSaga(
    MDL.moduleLoading,
    MDL.deleteModuleSuccess,
    fetchModules(id),
    MDL.moduleFail,
    'delete',
    `modules/${uuid}`
  )
}

function * defaultSaga () {
  yield all([
    takeLatest(MDL.SAVE_MODULE, saveModule),
    takeLatest(MDL.SELECT_MODULE, moduleDetail),
    takeLatest(MDL.UPDATE_MODULE, updateModule),
    takeLatest(MDL.DELETE_MODULE, deleteModule)
  ])
}

export const sagas = [
  defaultSaga
]
