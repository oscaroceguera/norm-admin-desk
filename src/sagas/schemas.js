import { takeLatest, all } from 'redux-saga/effects'
import {
  FETCH_SCHEMA_LIST,
  fetchSchemaListLoading,
  fethSchemaListSuccess,
  fetchSchemaListFail
} from '../reducers/schemas'

import { fetchApiSaga } from './genericSagas'

function * fetching () {
  yield * fetchApiSaga(
    fetchSchemaListLoading,
    fethSchemaListSuccess,
    fetchSchemaListFail,
    'get',
    'schemas'
  )
}

function * defaultSaga () {
  yield all([
    takeLatest(FETCH_SCHEMA_LIST, fetching)
  ])
}

export const sagas = [
  defaultSaga
]
