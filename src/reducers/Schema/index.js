import { fromJS } from 'immutable'

export const SET_SCHEMA = 'src/schema/SET_SCHEMA'
export const SET_SCHEMA_SUCCESS = 'src/schema/SET_SCHEMA_SUCCESS'
export const SET_SCHEMA_FAIL = 'src/schema/SET_SCHEMA_FAIL'

export const setSchema = () => ({type: SET_SCHEMA})

export function setSchemaSuccess (schema) {
  return {
    type: SET_SCHEMA_SUCCESS,
    schema
  }
}

export function setSchemaFail (error) {
  return {
    type: SET_SCHEMA_FAIL,
    error
  }
}

const initalState = fromJS({
  item: {
    id: '',
    name: '',
    version: '',
    description: ''
  },
  itemLoading: false,
  itemFail: null
})

const Schema = (state = initalState, action) => {
  switch (action.type) {
    case SET_SCHEMA:
      return state.set('itemLoading', true)
    case SET_SCHEMA_SUCCESS:
      return state.merge({
        item: action.schema,
        itemLoading: false
      })
    case SET_SCHEMA_FAIL:
      return state.merge({
        'itemFail': action.error,
        itemLoading: false
      })
    default:
      return state
  }
}

export default Schema
