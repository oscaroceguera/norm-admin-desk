import { fromJS, List } from 'immutable'

export const FETCH_SCHEMA_LIST = 'src/schema/FETCH_SCHEMA_LIST'
export const FETCH_SCHEMA_LIST_LOADING = 'src/schema/FETCH_SCHEMA_LIST_LOADING'
export const FETCH_SCHEMA_LIST_SUCCESS = 'src/schema/FETCH_SCHEMA_LIST_SUCCESS'
export const FETCH_SCHEMA_LIST_FAIL = 'src/schema/FETCH_SCHEMA_LIST_FAIL'

export function fetchSchemaList () {
  return {
    type: FETCH_SCHEMA_LIST
  }
}

export function fetchSchemaListLoading () {
  return {
    type: FETCH_SCHEMA_LIST_LOADING
  }
}

export function fethSchemaListSuccess (schemas) {
  return {
    type: FETCH_SCHEMA_LIST_SUCCESS,
    schemas
  }
}

export function fetchSchemaListFail (error) {
  return {
    type: FETCH_SCHEMA_LIST_FAIL,
    error
  }
}

const initialState = fromJS({
  schemas: [],
  loading: false,
  fail: null
})

export default function schemas (state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEMA_LIST_LOADING:
      return state.merge({
        loading: true,
        fail: null
      })
    case FETCH_SCHEMA_LIST_SUCCESS:
      return state.merge({
        schemas: List.of(...action.schemas),
        loading: false
      })
    case FETCH_SCHEMA_LIST_FAIL:
      return state.merge({
        fail: action.error,
        loading: false
      })
    default:
      return state
  }
}
