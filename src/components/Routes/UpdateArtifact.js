import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ArtifactForm from '../Form/ArtifactForm'

class UpdateArtifact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artifact: this.props.location.state.artifact,
      updated: false
    }
  }

  handleInputChange = event => {
    event.persist()
    const target = event.target
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const updatedField = {
      [target.name]: value
    }
    this.setState(() => {
      const newArtifact = Object.assign({}, this.state.artifact, updatedField)
      return { artifact: newArtifact }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = this.props
    const { artifact } = this.state
    axios({
      method: 'patch',
      url: `${apiUrl}/artifacts/${match.params.id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { artifact }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Well Done!',
        message: 'You\'ve modified your artifact!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Inconceivable!',
          message: error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    if (this.state.updated) {
      return <Redirect to ={`/artifacts/${this.props.match.params.id}`}/>
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 mx-auto mt-3">
            <h2>Work your magic!</h2>
            <ArtifactForm
              artifact={this.state.artifact}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(UpdateArtifact)
