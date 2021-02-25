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
    const rarityColor = artifact === null ? '' : (
      artifact.rarity === '1' ? 'common-color' : (
        artifact.rarity === '2' ? 'uncommon-color' : (
          artifact.rarity === '3' ? 'rare-color' : (
            artifact.rarity === '4' ? 'very-rare-color' : (
              artifact.rarity === '5' ? 'legendary-color' : (
                artifact.rarity === '6' ? 'artifact-color' : 'unknown-rarity-color'
              ))))))
    const createrDelete = artifact === null ? '' : (
      artifact.owner === this.props.user.id ? <Button onClick={this.deleteArtifact}>Delete</Button> : '')
    const createrUpdate = artifact === null ? '' : (
      artifact.owner === this.props.user.id
        ? <Button variant="outline-primary">
          <Link to={{
            pathname: `/update-artifact/${artifact.id}/`,
            state: {
              artifact: {
                attunement: artifact.attunement,
                category: artifact.category,
                description: artifact.description,
                id: artifact.id,
                name: artifact.name,
                rarity: artifact.rarity
              }
            } }}>Update
          </Link>
        </Button> : '')
    if (deleted) {
      return <Redirect to="/artifacts/"/>
    }
    if (artifact === null) {
      artifactJsx = <Spinner animation="border" variant="primary"/>
    } else {
      artifactJsx = (
        <Fragment>
          <span className={`artifact-name ${rarityColor}`}>
            <h2><b>{artifact.name}</b></h2>
          </span>
          <p><i>Category</i>: {artifact.category_display}</p>
          <p><i>Rarity</i>: {artifact.rarity_display}</p>
          <p><i>Requires Attunement</i>: {String(artifact.attunement)}</p>
          <p><i>Description</i>: {artifact.description}</p>
          {createrDelete}
          {createrUpdate}
        </Fragment>
      )
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 mx-auto mt-3">
            {artifactJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ShowArtifact
