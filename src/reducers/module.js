import { fromJS } from 'immutable'

export const SHOW_MODAL = 'src/module/SHOW_MODAL'
export const SET_MODULE_VALUES = 'src/module/SET_MODULE_VALUES'

export const MODULE_LOADING = 'src/module/MODULE_LOADING'
export const MODULE_FAIL = 'src/module/MODULE_FAIL'
export const MODULE_EMPTY = 'src/module/MODULE_EMPTY'

export const SAVE_MODULE = 'src/module/SAVE_MODULE'
export const SAVE_MODULE_SUCCESS = 'src/module/SAVE_MODULE_SUCCESS'

export const SELECT_MODULE = 'src/module/SELECT_MODULE'
export const GET_MODULE_DETAIL = 'src/module/GET_MODULE_DETAIL'

export const UPDATE_MODULE = 'src/module/UPDATE_MODULE'
export const UPDATE_MODULE_SUCCESS = 'src/module/UPDATE_MODULE_SUCCESS'

export const DELETE_MODULE = 'src/module/DELETE_MODULE'
export const DELETE_MODULE_SUCCESS = 'src/module/DELETE_MODULE_SUCCESS'

export function showModal () {
  return {
    type: SHOW_MODAL
  }
}

export function moduleLoading () {
  return {
    type: MODULE_LOADING
  }
}

export function moduleEmpty () {
  return {
    type: MODULE_EMPTY
  }
}

export function moduleFail (error) {
  return {
    type: MODULE_FAIL,
    payload: {
      error
    }
  }
}

export function setModuleValues ({ name, value }) {
  return {
    type: SET_MODULE_VALUES,
    payload: {
      name,
      value
    }
  }
}

export function saveModule (id) {
  return {
    type: SAVE_MODULE,
    payload: {
      id
    }
  }
}

export function saveModuleSuccess () {
  return {
    type: SAVE_MODULE_SUCCESS
  }
}

export function selectModule (uuid) {
  return {
    type: SELECT_MODULE,
    payload: {
      uuid
    }
  }
}

export function getModuleDetail (module) {
  return {
    type: GET_MODULE_DETAIL,
    payload: {
      module
    }
  }
}

export function updateModule () {
  return {
    type: UPDATE_MODULE
  }
}

export function updateModuleSuccess () {
  return {
    type: UPDATE_MODULE_SUCCESS
  }
}

export function deleteModule (uuid) {
  return {
    type: DELETE_MODULE,
    payload: {
      uuid
    }
  }
}

export function deleteModuleSuccess () {
  return {
    type: DELETE_MODULE_SUCCESS
  }
}

const initalState = fromJS({
  module: {
    name: '',
    number: '',
    order: ''
  },
  loadingModule: false,
  failModule: null,
  modalIsOpen: false
})

export default function module (state = initalState, action) {
  switch (action.type) {
    case MODULE_EMPTY:
      return initalState
    case SET_MODULE_VALUES:
      const {name, value} = action.payload
      return state.setIn(['module', name], value)
    case MODULE_LOADING:
      return state.merge({
        loadingModule: true,
        failModule: null
      })
    case MODULE_FAIL:
      return state.merge({
        loadingModule: false,
        fail: action.payload.error
      })
    case SHOW_MODAL:
      return state.set('modalIsOpen', !state.get('modalIsOpen'))
    case DELETE_MODULE_SUCCESS:
    case UPDATE_MODULE_SUCCESS:
    case SAVE_MODULE_SUCCESS:
      return state.merge({
        loadingModule: false,
        modalIsOpen: false,
        module: {
          name: '',
          number: '',
          order: ''
        }
      })
    case GET_MODULE_DETAIL:
      return state.merge({
        module: action.payload.module,
        modalIsOpen: true
      })
    default:
      return state
  }
}
