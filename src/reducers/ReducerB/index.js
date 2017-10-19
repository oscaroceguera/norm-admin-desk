import { fromJS } from 'immutable'

const SET_DEFAULT = 'reducerB/SET_DEFAULT'

export function setDefault () {
  return {
    type: SET_DEFAULT
  }
}

const initialState = fromJS({
  defaulValue: ''
})

export default function reducerB (state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT:
      return state.set('defaultValue', 'hola')
    default:
      return state
  }
}