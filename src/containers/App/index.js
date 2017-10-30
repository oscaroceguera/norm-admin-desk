import React, { Component } from 'react'
import styles from './styles.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  SchemaListContainer,
  SchemaContainer,
  NoMatch
} from '../'

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
        <Router>
          <Switch>
            <Route exact path='/' component={SchemaListContainer} />
            <Route exact path='/schema' component={SchemaContainer} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
