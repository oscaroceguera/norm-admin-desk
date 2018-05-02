import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as schemasActions from '../../../reducers/schemas'

import { Schemas } from '../../../components'

import {api} from '../../../api'
import axios from 'axios'
class SchemaListContainer extends Component {
  componentWillMount() {
    this.props.fetchSchemaList()
  }

  schemaDetail = uuid => e => {
    e && e.preventDefault()
    this.props.history.push('/schema/' + uuid)
  }

  addSchema = e => {
    e && e.preventDefault()
    this.props.history.push('/schema')
  }

  getPdf = (name, uuid) => e => {
    e && e.preventDefault()
    this.props.downloadPdf(name, uuid)
  }

  render () {
    const { loading, fail, schemas, downloading, downloadingFail } = this.props

    return (
      <Schemas
        schemas={schemas}
        addSchema={this.addSchema}
        schemaDetail={this.schemaDetail}
        getPdf={this.getPdf}
        isLoading={loading}
        error={fail}
        downloading={downloading}
        downloadingFail={downloadingFail}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    schemas: state.schemas.toJS().schemas,
    loading: state.schemas.toJS().loading,
    fail: state.schemas.toJS().fail,
    downloading: state.schemas.toJS().downloading,
    downloadingFail: state.schemas.toJS().downloadingFail
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...schemasActions
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemaListContainer)