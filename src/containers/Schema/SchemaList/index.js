import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as schemasActions from '../../../reducers/schemas'

import { Schemas } from '../../../components'

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

  render () {
    const { loading, fail, schemas } = this.props

    return (
      <Schemas
        schemas={schemas}
        addSchema={this.addSchema}
        schemaDetail={this.schemaDetail}
        isLoading={loading}
        error={fail}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    schemas: state.schemas.toJS().schemas,
    loading: state.schemas.toJS().loading,
    fail: state.schemas.toJS().fail
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