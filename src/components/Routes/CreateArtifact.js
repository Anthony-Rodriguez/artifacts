import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ArtifactForm from '../Form/ArtifactForm'

class CreateArtifact extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artifact: {
        name: '',
        category: '1',
        rarity: '1',
        attunement: false,
        description: ''
      },
      createdId: null
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
  handleSubmit = (event, UpdatedField) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { artifact } = this.state
    axios({
      method: 'post',
      url: apiUrl + '/artifacts/',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { artifact }
    })
      .then((res, msgAlert) => {
        this.setState({ createdId: res.data.artifact.id })
        return res
      })
      .then(() => msgAlert({
        heading: 'Artifact Created Successfully',
        message: `${artifact.name} has been added!`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Unfortunately, your powers have failed you.',
          message: 'Here\'s why' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    if (this.state.createdId) {
      return <Redirect to ={`/artifacts/${this.state.createdId}/`}/>
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h2>Create an Artifact</h2>
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

export default CreateArtifact
