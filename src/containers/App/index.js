import React from 'react'
import styles from './styles.css'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import {
  SchemaListContainer,
  SchemaContainer
} from '../'

import { NoMatch } from '../../components'

const App = props => {
  const { history } = props

  return (
    <div className={styles.App}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path='/' component={SchemaListContainer} />
          <Route exact path='/schema' component={SchemaContainer} />
          <Route exact path='/schema/:uuid' component={SchemaContainer} />
          <Route component={NoMatch} />
        </Switch>
      </ConnectedRouter>
    </div>
  )
}

export default App
