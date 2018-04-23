import { takeLatest, all } from 'redux-saga/effects'
import * as MDLS from '../reducers/modules'
import { fetchApiSaga } from './genericSagas'

function * fetching (action) {
  const { id } = action.payload
  yield * fetchApiSaga(
    MDLS.fetchModulesLoading,
    MDLS.fetchModulesSuccess,
    MDLS.fetchModulesFail,
    'get',
    `schemas/${id}/modules`
  )
}

function * defaultSaga () {
  yield all([
    takeLatest(MDLS.FETCH_MODULES, fetching)
  ])
}

export const sagas = [
  defaultSaga
]
