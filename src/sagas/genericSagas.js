import { call, put } from 'redux-saga/effects'
import { api } from '../api'

export function * fetchApiSaga (loading, success, fail, method, ...args) {
  yield put(loading())
  try {
    const data = yield call(api[method], ...args)
    yield put(success(data))
  } catch (e) {
    yield put(fail(e.message))
  }
}

export function * cudApiSaga (loading, success, refresh, fail, method, ...args) {
  yield put(loading())
  try {
    yield call(api[method], ...args)
    yield put(success())
    yield put(refresh)
  } catch (e) {
    yield put(fail(e.message))
  }
}
