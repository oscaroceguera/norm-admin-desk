import { takeLatest, call, put, select, all } from 'redux-saga/effects'
import * as ITEM from '../reducers/item'
import { fetchModules } from '../reducers/modules'

import { cudApiSaga } from './genericSagas'

function * saveItem () {
  const {item, moduleId} = yield select(state => state.item.toJS())
  const {id} = yield select(state => state.schema.toJS().schema)

  yield * cudApiSaga(
    ITEM.loading,
    ITEM.saveItemSuccess,
    fetchModules(id),
    ITEM.fail,
    'post',
    `/modules/${moduleId}/items`,
    item
  )
}

function * itemUpdate () {
  const { item } = yield select(state => state.item.toJS())
  const { id } = yield select(state => state.schema.toJS().schema)

  yield * cudApiSaga(
    ITEM.loading,
    ITEM.itemUpdateSuccess,
    fetchModules(id),
    ITEM.fail,
    'put',
    `/items/${item.uuid}`,
    item
  )
}

function * itemDelete ({ payload: { uuid } }) {
  const { id } = yield select(state => state.schema.toJS().schema)

  yield * cudApiSaga(
    ITEM.loading,
    ITEM.itemDeleteSuccess,
    fetchModules(id),
    ITEM.fail,
    'delete',
    `/items/${uuid}`
  )
}

function * defaultSaga () {
  yield all([
    takeLatest(ITEM.SAVE_ITEM, saveItem),
    takeLatest(ITEM.ITEM_UPDATE, itemUpdate),
    takeLatest(ITEM.ITEM_DELETE, itemDelete)
  ])
}

export const sagas = [
  defaultSaga
]
