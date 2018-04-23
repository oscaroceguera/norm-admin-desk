import { fromJS } from 'immutable'

export const SCHEMA_LOADING = 'src/schema/SCHEMA_LOADING'
export const SCHEMA_FAIL = 'src/schema/SCHEMA_FAIL'
export const SCHEMA_EMPTY = 'src/schema/SCHEMA_EMPTY'

export const FETCH_SCHEMA = 'src/schema/FETCH_SCHEMA'
export const FETCH_SCHEMA_SUCCESS = 'src/schema/FETCH_SCHEMA_SUCCESS'

export const SET_SCHEMA_VALUES = 'src/schema/SET_SCHEMA_VALUES'

export const SAVE_SCHEMA = 'src/schema/SAVE_SCHEMA'
export const SAVE_SCHEMA_SUCCESS = 'src/schema/SAVE_SCHEMA_SUCCESS'

export const UPDATE_SCHEMA = 'src/schema/UPDATE_SCHEMA'
export const UPDATE_SCHEMA_SUCCESS = 'src/schema/UPDATE_SCHEMA_SUCCESS'

export const DELETE_SCHEMA = 'src/schema/DELETE_SCHEMA'
export const DELETE_SCHEMA_SUCCESS = 'src/schema/DELETE_SCHEMA_SUCCESS'

export function schemaEmpty () {
  return {
    type: SCHEMA_EMPTY
  }
}

export function fetchSchema (id) {
  return {
    type: FETCH_SCHEMA,
    payload: {
      id
    }
  }
}

export function schemaLoading () {
  return {
    type: SCHEMA_LOADING
  }
}

export function fetchSchemaSuccess (schema) {
  return {
    type: FETCH_SCHEMA_SUCCESS,
    payload: {
      schema
    }
  }
}

export function schemaFail (error) {
  return {
    type: SCHEMA_FAIL,
    error
  }
}

export function setSchemaValues ({name, value}) {
  return {
    type: SET_SCHEMA_VALUES,
    payload: {
      name,
      value
    }
  }
}

export function saveSchema () {
  return {
    type: SAVE_SCHEMA
  }
}
export function saveSchemaSuccess () {
  return {
    type: SAVE_SCHEMA_SUCCESS
  }
}

export function updateSchema () {
  return {
    type: UPDATE_SCHEMA
  }
}

export function updateSchemaSuccess () {
  return {
    type: UPDATE_SCHEMA_SUCCESS
  }
}

export function deleteSchema (uuid) {
  return {
    type: DELETE_SCHEMA,
    payload: {
      uuid
    }
  }
}

export function deleteSchemaSuccess () {
  return {
    type: DELETE_SCHEMA_SUCCESS
  }
}

const initialState = fromJS({
  schema: {
    name: '',
    version: '',
    description: ''
  },
  loading: false,
  fail: null
})

export default function schema (state = initialState, action) {
  switch (action.type) {
    case SCHEMA_EMPTY:
      return initialState
    case SCHEMA_LOADING:
      return state.merge({
        loading: true,
        fail: null
      })
    case FETCH_SCHEMA_SUCCESS:
      return state.merge({
        loading: false,
        schema: action.payload.schema
      })
    case SCHEMA_FAIL:
      return state.merge({
        loading: false,
        fail: action.error
      })
    case SET_SCHEMA_VALUES:
      const {name, value} = action.payload
      return state.setIn(['schema', name], value)
    case DELETE_SCHEMA_SUCCESS:
    case UPDATE_SCHEMA_SUCCESS:
    case SAVE_SCHEMA_SUCCESS:
      return state.merge({
        loading: false
      })
    default:
      return state
  }
}
