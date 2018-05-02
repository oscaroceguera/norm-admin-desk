import { takeLatest, all, put, call } from 'redux-saga/effects'
import {
  FETCH_SCHEMA_LIST,
  DOWNLOAD_PDF,
  fetchSchemaListLoading,
  fethSchemaListSuccess,
  fetchSchemaListFail,
  downloadPdfDownloading,
  downloadPdfFail,
  downloadPdfSuccess
} from '../reducers/schemas'

import { fetchApiSaga } from './genericSagas'

import {api} from '../api'

function * fetching () {
  yield * fetchApiSaga(
    fetchSchemaListLoading,
    fethSchemaListSuccess,
    fetchSchemaListFail,
    'get',
    'schemas'
  )
}

function * getPDF ({payload: {name, uuid}}) {
  yield put(downloadPdfDownloading())
  try {
    yield call(api.download, `/schemas/${uuid}/download`, name)
    yield put(downloadPdfSuccess())
  } catch (e) {
    yield put(downloadPdfFail(e.message))
  }
}

function * defaultSaga () {
  yield all([
    takeLatest(FETCH_SCHEMA_LIST, fetching),
    takeLatest(DOWNLOAD_PDF, getPDF)
  ])
}

export const sagas = [
  defaultSaga
]
