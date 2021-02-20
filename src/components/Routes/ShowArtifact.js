import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class ShowArtifact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artifact: null,
      deleted: false
    }
  }
  componentDidMount (artifact) {
    const { user, msgAlert, match } = this.props
    axios({
      url: `${apiUrl}/artifacts/${match.params.id}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => {
        this.setState({ artifact: res.data.artifact })
        return res
      })
      .catch(error => {
        msgAlert({
          heading: 'I thought it would be here...',
          message: 'This doesn\'t look right: ' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteArtifact = () => {
    const { user, msgAlert } = this.props
    axios({
      url: `${apiUrl}/artifacts/${this.state.artifact.id}/`,
      method: 'delete',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Banished!',
        message: `${this.state.artifact.name} has been permanently erased`,
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
    let artifactJsx
    const { artifact, deleted } = this.state
    if (deleted) {
      return <Redirect to="/artifacts/"/>
    }
    if (artifact === null) {
      artifactJsx = <Spinner animation="border" variant="primary"/>
    } else {
      artifactJsx = (
        <Fragment>
          <h2>{artifact.name}</h2>
          <p>Category: {artifact.category}</p>
          <p>Rarity: {artifact.rarity}</p>
          <p>Requires Attunement: {artifact.attunement}</p>
          <br></br>
          <p>Description: {artifact.description}</p>
          <Button onClick={this.deleteArtifact}>Delete</Button>
          <Button variant="outline-primary"><Link to={`/update-artifact/${artifact.id}/`}>Update</Link></Button>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            {artifactJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ShowArtifact
