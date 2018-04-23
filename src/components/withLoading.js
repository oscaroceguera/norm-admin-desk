import React from 'react'

import Loading from './Progress'
import ErrorMessage from './Warnings'

const withLoading = Component => ({ isLoading, error, ...props }) => {
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage msg={`Schema List: ${error}`} />
  }

  return <Component {...props} />
}

export default withLoading
