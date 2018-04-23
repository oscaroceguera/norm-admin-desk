import { takeLatest, call, put, select, all } from 'redux-saga/effects'
import * as SCHEMA from '../reducers/schema'
import {push} from 'react-router-redux'
import { api } from '../api'

function * fetching (action) {
  const { id } = action.payload

  yield put(SCHEMA.schemaLoading())
  try {
    const body = yield call(api.get, `schemas/${id}`)
    const schema = {
      id: body.schema.uuid,
      name: body.schema.name,
      version: body.schema.version,
      description: body.schema.description
    }
    yield put(SCHEMA.fetchSchemaSuccess(schema))
  } catch (e) {
    yield put(SCHEMA.schemaFail(e.message))
  }
}

function * saveSchema () {
  const schema = yield select(state => state.schema.toJS().schema)

  yield put(SCHEMA.schemaLoading())

  try {
    const data = yield call(api.post, 'schemas', schema)
    const action = { payload: { id: data.uuid } }

    yield put(SCHEMA.saveSchemaSuccess())
    yield put(push(`/schema/${data.uuid}`))
    yield * fetching(action)
  } catch (e) {
    yield put(SCHEMA.schemaFail(e.message))
  }
}

function * updateSchema () {
  const schema = yield select(state => state.schema.toJS().schema)

  yield put(SCHEMA.schemaLoading())

  try {
    yield call(api.put, `schemas/${schema.id}`, schema)
    yield put(SCHEMA.updateSchemaSuccess())
  } catch (e) {
    yield put(SCHEMA.schemaFail(e.message))
  }
}

function * deleteSchema (action) {
  const { uuid } = action.payload

  yield put(SCHEMA.schemaLoading())

  try {
    yield call(api.delete, `schemas/${uuid}`)
    yield put(SCHEMA.deleteSchemaSuccess())
    yield put(push('/'))
  } catch (e) {
    yield put(SCHEMA.schemaFail(e.message))
  }
}

function * defaultSaga () {
  yield all([
    takeLatest(SCHEMA.FETCH_SCHEMA, fetching),
    takeLatest(SCHEMA.SAVE_SCHEMA, saveSchema),
    takeLatest(SCHEMA.UPDATE_SCHEMA, updateSchema),
    takeLatest(SCHEMA.DELETE_SCHEMA, deleteSchema)
  ])
}

export const sagas = [
  defaultSaga
]
