import { fromJS, List } from 'immutable'

export const FETCH_MODULES = 'src/module/FETCH_MODULES'
export const FETCH_MODULES_LOADING = 'src/module/FETCH_MODULES_LOADING'
export const FETCH_MODULES_FAIL = 'src/module/FETCH_MODULES_FAIL'
export const FETCH_MODULES_SUCCESS = 'src/module/FETCH_MODULES_SUCCESS'

export function fetchModules (id) {
  return {
    type: FETCH_MODULES,
    payload: {
      id
    }
  }
}

export function fetchModulesLoading () {
  return {
    type: FETCH_MODULES_LOADING
  }
}

export function fetchModulesSuccess (modules) {
  return {
    type: FETCH_MODULES_SUCCESS,
    payload: {
      modules
    }
  }
}

export function fetchModulesFail (error) {
  return {
    type: FETCH_MODULES_FAIL,
    payload: {
      error
    }
  }
}

const initialState = fromJS({
  modules: [],
  loadingModules: false,
  failModules: null
})

export default function modules (state = initialState, action) {
  switch (action.type) {
    case FETCH_MODULES_LOADING:
      return state.merge({
        loadingModules: true,
        failModules: null
      })
    case FETCH_MODULES_FAIL:
      return state.merge({
        loadingModules: false,
        failModules: action.payload.error
      })
    case FETCH_MODULES_SUCCESS:
      return state.merge({
        loadingModules: false,
        modules: List.of(...action.payload.modules)
      })
    default:
      return state
  }
}
