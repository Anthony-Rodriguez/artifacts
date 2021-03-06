import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import CreateArtifact from './components/Routes/CreateArtifact'
import ShowArtifact from './components/Routes/ShowArtifact'
import IndexArtifacts from './components/Routes/IndexArtifacts'
import UpdateArtifact from './components/Routes/UpdateArtifact'
import Home from './components/Routes/Home'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      artifacts: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <AuthenticatedRoute exact path='/home/' user={user} component={Home} render={() => (
            <Home msgAlert={this.msgAlert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path={['/sign-in', '/']} render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute path='/create-artifact' user={user} component={CreateArtifact} render={({ match }) => (
            <CreateArtifact msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute exact path='/artifacts/:id/' user={user} render={({ match }) => (
            <ShowArtifact msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute exact path='/artifacts/' user={user} component={IndexArtifacts} render={() => (
            <IndexArtifacts msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact path='/update-artifact/:id' user={user} component={ShowArtifact} render={({ match }) => (
            <UpdateArtifact msgAlert={this.msgAlert} user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
