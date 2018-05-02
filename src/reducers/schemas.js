import { fromJS, List } from 'immutable'

export const FETCH_SCHEMA_LIST = 'src/schema/FETCH_SCHEMA_LIST'
export const FETCH_SCHEMA_LIST_LOADING = 'src/schema/FETCH_SCHEMA_LIST_LOADING'
export const FETCH_SCHEMA_LIST_SUCCESS = 'src/schema/FETCH_SCHEMA_LIST_SUCCESS'
export const FETCH_SCHEMA_LIST_FAIL = 'src/schema/FETCH_SCHEMA_LIST_FAIL'

export const DOWNLOAD_PDF = 'src/schema/DOWNLOAD_PDF'
export const DOWNLOAD_PDF_DOWNLOADING = 'src/schema/DOWNLOAD_PDF_DOWNLOADING'
export const DOWNLOAD_PDF_SUCCESS = 'src/schema/DOWNLOAD_PDF_SUCCESS'
export const DOWNLOAD_PDF_FAIL = 'src/schema/DOWNLOAD_PDF_FAIL'

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

export function downloadPdf (name, uuid) {
  return {
    type: DOWNLOAD_PDF,
    payload: {
      name,
      uuid
    }
  }
}

export function downloadPdfDownloading () {
  return {
    type: DOWNLOAD_PDF_DOWNLOADING
  }
}

export function downloadPdfSuccess () {
  return {
    type: DOWNLOAD_PDF_SUCCESS
  }
}

export function downloadPdfFail (error) {
  return {
    type: DOWNLOAD_PDF_FAIL,
    payload: {
      error
    }
  }
}

const initialState = fromJS({
  schemas: [],
  loading: false,
  fail: null,
  downloading: false,
  downloadingFail: null
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
    case DOWNLOAD_PDF_DOWNLOADING:
      return state.merge({
        downloading: true,
        downloadingFail: null
      })
    case DOWNLOAD_PDF_SUCCESS:
      return state.merge({
        downloading: false
      })
    case DOWNLOAD_PDF_FAIL:
      return state.merge({
        downloading: false,
        downloadingFail: action.payload.error
      })
    default:
      return state
  }
}
