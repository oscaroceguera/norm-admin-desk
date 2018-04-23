import { fromJS } from 'immutable'

export const LOADING = 'src/item/LOADING'
export const FAIL = 'src/item/FAIL'

export const SHOW_FORM = 'src/item/SHOW_FORM'
export const TOGGLE_MODAL = 'src/item/TOGGLE_MODAL'
export const SET_VALUE = 'src/item/SET_VALUE'

export const SAVE_ITEM = 'src/item/SAVE_ITEM'
export const SAVE_ITEM_SUCCESS = 'src/item/SAVE_ITEM_SUCCESS'

export const ITEM_DETAIL = 'src/item/ITEM_DETAIL'

export const ITEM_UPDATE = 'src/item/ITEM_UPDATE'
export const ITEM_UPDATE_SUCCESS = 'src/item/ITEM_UPDATE_SUCCESS'

export const ITEM_DELETE = 'src/item/ITEM_DELETE'
export const ITEM_DELETE_SUCCESS = 'src/item/ITEM_DELETE_SUCCESS'

export function loading () {
  return {
    type: LOADING
  }
}

export function fail (error) {
  return {
    type: FAIL,
    payload: {
      error
    }
  }
}

export function showForm (uuid) {
  return {
    type: SHOW_FORM,
    payload: {
      uuid
    }
  }
}

export function toggleModal () {
  return {
    type: TOGGLE_MODAL
  }
}

export function setValue (data) {
  return {
    type: SET_VALUE,
    payload: {
      name: data.name,
      value: data.value
    }
  }
}

export function saveItem () {
  return {
    type: SAVE_ITEM
  }
}

export function saveItemSuccess () {
  return {
    type: SAVE_ITEM_SUCCESS
  }
}

export function itemDetail (item) {
  return {
    type: ITEM_DETAIL,
    payload: {
      item
    }
  }
}

export function itemUpdate () {
  return {
    type: ITEM_UPDATE
  }
}

export function itemUpdateSuccess () {
  return {
    type: ITEM_UPDATE_SUCCESS
  }
}

export function itemDelete (uuid) {
  return {
    type: ITEM_DELETE,
    payload: {
      uuid
    }
  }
}

export function itemDeleteSuccess () {
  return {
    type: ITEM_DELETE_SUCCESS
  }
}

const initialState = fromJS({
  loading: false,
  fail: null,
  moduleId: '',
  modalIsOpen: false,
  item: {
    question: '',
    comment: '',
    value: '',
    number: '',
    order: 0
  }
})

export default function item (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return state.merge({
        loading: true,
        fail: false
      })
    case FAIL:
      return state.merge({
        loading: false,
        fail: action.payload.error
      })
    case SHOW_FORM:
      return state.merge({
        moduleId: action.payload.uuid,
        modalIsOpen: true
      })
    case TOGGLE_MODAL:
      return state.merge({
        modalIsOpen: !state.get('modalIsOpen'),
        moduleId: '',
        item: {
          question: '',
          comment: '',
          value: '',
          number: '',
          order: 0
        }
      })
    case SET_VALUE:
      const {name, value} = action.payload
      return state.setIn(['item', name], value)
    case ITEM_DELETE_SUCCESS:
    case ITEM_UPDATE_SUCCESS:
    case SAVE_ITEM_SUCCESS:
      return state.merge({
        loading: false,
        fail: null,
        modalIsOpen: false,
        item: {
          question: '',
          comment: '',
          value: '',
          number: '',
          order: 0
        }
      })
    case ITEM_DETAIL:
      const {item} = action.payload
      return state.merge({
        item: {
          uuid: item.uuid,
          question: item.question,
          comment: item.comment,
          value: item.value,
          number: item.number,
          order: item.order
        },
        modalIsOpen: true
      })
    default:
      return state
  }
}
